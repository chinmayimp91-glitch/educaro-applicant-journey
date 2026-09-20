# Educaro Applicant Journey

Full-stack starter for applicants in India exploring study, vocational training, or employment routes in Germany.

## Run locally

```bash
npm install
npm run dev
```

In a second terminal, start the API:

```bash
npm --prefix server install
npm run dev:api
```

For PostgreSQL, run `docker compose up -d`. The production schema is in `database/schema.sql`.

## Included

- Applicant intake profile
- Supporting-document selection
- Progressive completeness indicator
- Clear missing-information request
- Qualification-review readiness and next-step recommendation
- Express + TypeScript API for profiles, documents, introduction videos, assessments and CV drafts
- PostgreSQL schema and Docker Compose setup

The interface deliberately does not invent applicant information or produce an automatic eligibility decision. Real OCR, speech-to-text and an LLM must be connected with approved providers and applicant consent; their credentials belong only in `server/.env`.
