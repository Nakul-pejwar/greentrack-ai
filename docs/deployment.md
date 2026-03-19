# GreenTrack AI - Deployment Instructions

The GreenTrack AI MVP is built on the Next.js 14 App Router, making it natively compatible for zero-config deployments on Vercel.

## One-Click Vercel Setup

1. Push your code to a GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Init MVP"
   git branch -M main
   git remote add origin https://github.com/yourusername/greentrack-ai.git
   git push -u origin main
   ```

2. Go to [Vercel.com](https://vercel.com/) and log in with your GitHub account.
3. Click **Add New** -> **Project**.
4. Import the `greentrack-ai` repository.
5. Vercel will automatically detect `Next.js` as the framework.
6. Click **Deploy**.

*Vercel automatically sets up the build command (`npm run build`) and output directory (`.next`).*

## Manual Deployment on Render / Custom VPS

If you choose to use Render or an AWS EC2 instance:
1. Ensure Node.js v20+ is installed.
2. Run `npm install`
3. Run `npm run build`
4. Run `npm start`

*For Render, use the Web Service option, set Build Command to `npm install && npm run build`, and Start Command to `npm start`.*
