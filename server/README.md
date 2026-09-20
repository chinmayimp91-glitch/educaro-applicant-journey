# Backend starter

The production backend is intended for Node.js + TypeScript + PostgreSQL.

Suggested endpoints:
- `POST /api/applications` — save consented applicant input
- `POST /api/applications/:id/documents` — upload document for OCR/extraction
- `POST /api/applications/:id/assess` — run rules/AI-assisted gap assessment
- `GET /api/applications/:id/cv` — generate a reviewed CV draft

Do not make eligibility decisions solely from an AI model. Store document provenance, show extracted fields to applicants for confirmation, and use deterministic rules for defined requirements.
