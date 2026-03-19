# GreenTrack AI - Next Steps for Scaling

This repository serves as an MVP to land initial enterprise clients. To pivot from a mock-data foundation to a robust production platform, execute the following technical roadmap:

## 1. Database Integration (PostgreSQL + Prisma)
Currently, data is mocked in the React state and Next.js APIs.
- **Action**: Provision a PostgreSQL database via Supabase or AWS RDS.
- **Integration**: Install `prisma` ORM. Create schemas for `User`, `Company`, `EmissionLog`, and `Facility`.
- **API Update**: Update `/api/upload` to store CSV-parsed records into the `EmissionLog` table.

## 2. Real AI Integration (Hugging Face / OpenAI / GCP)
The "AI Insights" are currently hardcoded heuristics.
- **Action**: Implement a microservice or Next.js route that feeds aggregated `EmissionLog` data to an LLM or forecasting model.
- **Google Cloud Sustainability API**: Connect to GCP for accurate, dynamic emission factors rather than flat rate multipliers.
- **Implementation**: Instead of returning static text in `/api/analyze`, construct a prompt detailing the uploaded JSON metrics and request anomaly detection & reduction strategies from GPT-4o or Claude.

## 3. Stripe Billing Integration
The pricing tier page shows INR amounts ($99-499), but lacks checkout logic.
- **Action**: Deploy Stripe Checkout.
- **Implementation**: Create `/api/checkout_sessions` route. Pass the selected tier, process payment, and handle webhooks to update the `Company` billing tier in PostgreSQL.

## 4. True Auth & GDPR
- **Action**: Replace the mock `/api/auth` with `NextAuth.js`.
- **Implementation**: Add robust JWT lifecycle, magic links, or SSO (SAML) for enterprise clients. Add GDPR cookie consent banners and data deletion hooks.
