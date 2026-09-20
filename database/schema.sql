CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE applicants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL, email TEXT NOT NULL UNIQUE, location TEXT, goal TEXT NOT NULL,
  german_level TEXT, education TEXT, experience TEXT, motivation TEXT,
  consented_at TIMESTAMPTZ NOT NULL DEFAULT now(), created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), applicant_id UUID NOT NULL REFERENCES applicants(id) ON DELETE CASCADE,
  original_name TEXT NOT NULL, mime_type TEXT NOT NULL, storage_key TEXT NOT NULL,
  extracted_text TEXT, extraction_status TEXT NOT NULL DEFAULT 'pending', created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TABLE assessments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), applicant_id UUID NOT NULL REFERENCES applicants(id) ON DELETE CASCADE,
  outcome TEXT NOT NULL, missing_requirements JSONB NOT NULL DEFAULT '[]', recommended_step TEXT NOT NULL,
  rationale JSONB NOT NULL DEFAULT '[]', created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TABLE videos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), applicant_id UUID NOT NULL REFERENCES applicants(id) ON DELETE CASCADE,
  storage_key TEXT NOT NULL, review_status TEXT NOT NULL DEFAULT 'pending', created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
