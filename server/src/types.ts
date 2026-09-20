export type Goal = "Study in Germany" | "Vocational training (Ausbildung)" | "Employment in Germany";
export type Applicant = { id:string; name:string; email:string; location?:string; goal:Goal; german?:string; education?:string; experience?:string; motivation?:string };
export type Assessment = { outcome:"needs_information"|"ready_for_human_review"; missingRequirements:string[]; recommendedStep:string; rationale:string[] };
