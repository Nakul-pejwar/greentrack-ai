import { createServer } from 'http';
import { parse } from 'url';
import next from 'next';
import express from 'express';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import { initializeCronJobs } from './src/server/services/energyCron';
import { initializeIotMqtt } from './src/server/services/iotMqtt';
import erpWebhooksRouter from './src/server/routes/erpWebhooks';

dotenv.config();

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = parseInt(process.env.PORT || '3000', 10);
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const expressApp = express();
  const httpServer = createServer(expressApp);
  
  // Initialize Socket.io
  const io = new Server(httpServer, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
  });

  // Attach io to global scope or pass to services if needed
  global.io = io;

  io.on('connection', (socket) => {
    console.log(`Client connected: ${socket.id}`);
    
    socket.on('disconnect', () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });

  // Middleware
  expressApp.use(cors());
  expressApp.use(express.json());

  // API Routes
  expressApp.use('/api/webhooks/erp', erpWebhooksRouter);
  
  // Initialization of Background Services
  initializeCronJobs();
  initializeIotMqtt();

  // Handle all other Next.js logic
  expressApp.use((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  httpServer.listen(port, () => {
    console.log(`> Ready on http://${hostname}:${port}`);
  });
}).catch(err => {
  console.error('Error starting server:', err);
  process.exit(1);
});
