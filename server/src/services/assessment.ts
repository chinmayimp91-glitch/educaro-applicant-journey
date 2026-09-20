import type { Applicant, Assessment } from "../types.js";

export function assessApplicant(applicant: Applicant, documentCount: number): Assessment {
  const missing: string[] = [];
  if (!applicant.name.trim()) missing.push("Full name");
  if (!applicant.email.trim()) missing.push("Email address");
  if (!applicant.education?.trim()) missing.push("Education details");
  if (!applicant.motivation?.trim()) missing.push("Motivation and long-term goal");
  if (!documentCount) missing.push("At least one supporting document");
  if (applicant.goal === "Employment in Germany" && !applicant.experience?.trim()) missing.push("Relevant work experience");
  if (missing.length) return { outcome:"needs_information", missingRequirements:missing, recommendedStep:"Ask the applicant to complete the listed profile items.", rationale:["A qualification decision must only use verified applicant-provided information."] };
  const route = applicant.goal === "Study in Germany" ? "Review study admission and language pathway" : applicant.goal === "Vocational training (Ausbildung)" ? "Review Ausbildung pathway and employer matching" : "Review employment pathway and qualification recognition";
  return { outcome:"ready_for_human_review", missingRequirements:[], recommendedStep:route, rationale:["Profile has the minimum data needed for a human verification review.", "This result is a routing recommendation, not an immigration or admission decision."] };
}
