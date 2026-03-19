# 🤝 Buyer Handover & 1-Click Setup Guide

Congratulations on acquiring GreenTrack AI! This document outlines the 5-minute setup to completely transfer ownership, swap out API keys, and launch your own production instance.

## 1. Domain & DNS Transfer
- Update the Vercel project to point to your custom domain.
- Update the `LIVE_URL` in your GitHub repository secrets.

## 2. Environment Variables (`.env.production`)
Create your `.env.production` file on your Vercel/Docker server. See the `.env.production` template included in the repository for all required keys.
🔑 **Key Swaps Required:**
- `DATABASE_URL` (Supabase or AWS RDS)
- `JWT_SECRET` (Generate a new 64-char string)
- `STRIPE_SECRET_KEY` (Your Stripe account secret)
- `SLACK_WEBHOOK_URL` (Your Slack channel webhook for alerts)

## 3. Deployment: 1-Click Vercel / GitHub Actions
The repository is fully rigged with CI/CD.

### Strategy A: Vercel (Recommended)
1. Fork / Clone the repository.
2. Add `VERCEL_TOKEN`, `VERCEL_ORG_ID`, and `VERCEL_PROJECT_ID` to your GitHub Settings > Secrets.
3. Every time you run `git push origin main`, it automatically runs tests, deploys to Vercel, and checks uptime!

### Strategy B: Self-Hosted Docker
If you prefer AWS / DigitalOcean, run:
```bash
docker-compose -f docker-compose.prod.yml up -d --build
```
This instantly spins up the Node.js Next.js+Express server alongside a local PostgreSQL instance.

## 4. Setting up Stripe Subscriptions (India Context)
The platform is designed with the following INR pricing tiers for B2B Indian Enterprises (SEBI BRSR Compliance mode):
- **Starter:** ₹8,000 / month (Basic CSV uploads + 1 API Integration)
- **Professional:** ₹20,000 / month (Real-time IoT streaming)
- **Enterprise:** ₹40,000 / month (Dedicated support + Custom ERP Webhooks)

Setup your Stripe products matching these price points, and update the Product IDs in your Next.js frontend code if necessary.

## 5. Support & Questions
The code is thoroughly commented. If you hit any critical bugs during the 14-day handover period, please reach out via the provided contact email.
