import express from 'express';
import { apiLimiter, authenticateToken } from '../middleware/auth';
import { query } from '../db';

const router = express.Router();

// Webhook endpoint for ERP (SAP/Salesforce) transactions
// POST /api/webhooks/erp
// Example Payload: { "transactionId": "TX123", "amount": 5000, "category": "Materials", "supplier": "SteelCo" }
router.post('/', apiLimiter, async (req, res) => {
  try {
    const { transactionId, amount, category, supplier } = req.body;

    if (!transactionId || !amount) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Process scope 3 emissions based on ERP data
    // Here we use a mock factor based on amount
    const estimatedScope3Co2e = amount * 0.15;

    // Save to database
    // await query('INSERT INTO erp_transactions (tx_id, amount, category, supplier, co2e) VALUES ($1, $2, $3, $4, $5)', 
    //   [transactionId, amount, category, supplier, estimatedScope3Co2e]);

    console.log(`Received ERP Webhook: TX ${transactionId} - Estimated CO2e: ${estimatedScope3Co2e}`);

    // Push real-time event
    if (global.io) {
      global.io.emit('erp_event', {
        transactionId,
        amount,
        category,
        supplier,
        co2e: estimatedScope3Co2e,
        timestamp: new Date().toISOString()
      });
    }

    res.status(200).json({ success: true, message: 'ERP Transaction processed' });
  } catch (error) {
    console.error('Error handling ERP webhook:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
