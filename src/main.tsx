import { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

type Profile = { name: string; email: string; location: string; goal: string; german: string; education: string; experience: string; motivation: string };
const initial: Profile = { name:"", email:"", location:"India", goal:"Study in Germany", german:"", education:"", experience:"", motivation:"" };

function App() {
  const [profile, setProfile] = useState<Profile>(initial);
  const [files, setFiles] = useState<File[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const update = (key: keyof Profile) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setProfile(p => ({...p, [key]:e.target.value}));
  const missing = useMemo(() => [!profile.name && "your name", !profile.email && "your email", !profile.education && "education details", !profile.motivation && "your motivation", files.length === 0 && "supporting documents"].filter(Boolean) as string[], [profile, files]);
  const qualified = profile.education.trim() && profile.motivation.trim() && files.length > 0;
  return <main>
    <header><div><span className="mark">E</span><b>Educ<span>aro</span></b></div><p>Germany Applicant Journey</p></header>
    <section className="hero"><div><p className="eyebrow">YOUR NEXT STEP, CLARIFIED</p><h1>Build your Germany journey with confidence.</h1><p>Share your background once. Our journey assistant structures your profile, checks what is needed, and recommends a clear next action.</p></div><div className="stepcard"><b>Application progress</b><div className="bar"><i style={{width:`${Math.max(12, 100 - missing.length * 16)}%`}} /></div><small>{missing.length ? `${missing.length} items still needed` : "Profile ready for review"}</small></div></section>
    <section className="grid"><form onSubmit={e => { e.preventDefault(); setSubmitted(true); }}>
      <h2>Tell us about you</h2><p className="muted">Only applicant-provided information is used. You can review it before submission.</p>
      <div className="two"><Field label="Full name" value={profile.name} onChange={update("name")} required/><Field label="Email" type="email" value={profile.email} onChange={update("email")} required/></div>
      <div className="two"><Field label="Current location" value={profile.location} onChange={update("location")}/><label>Primary goal<select value={profile.goal} onChange={update("goal")}><option>Study in Germany</option><option>Vocational training (Ausbildung)</option><option>Employment in Germany</option></select></label></div>
      <label>Education <textarea value={profile.education} onChange={update("education")} placeholder="Degree, institution, field of study, graduation year" /></label>
      <div className="two"><Field label="Work experience" value={profile.experience} onChange={update("experience")} placeholder="Role, employer, duration"/><Field label="German level" value={profile.german} onChange={update("german")} placeholder="e.g. A2, B1, B2"/></div>
      <label>Why Germany? <textarea value={profile.motivation} onChange={update("motivation")} placeholder="Your motivation and long-term goal" /></label>
      <label className="upload">Upload documents<input type="file" multiple accept=".pdf,.png,.jpg,.jpeg,.doc,.docx" onChange={e => setFiles(Array.from(e.target.files || []))}/><span>{files.length ? `${files.length} file(s) ready for extraction` : "Degrees, CV, certificates or language proof"}</span></label>
      <button type="submit">Analyse my journey</button>
    </form>
    <aside><h2>Journey review</h2>{submitted ? <><div className={qualified ? "result good" : "result"}><b>{qualified ? "Ready for eligibility review" : "More information needed"}</b><p>{qualified ? "Your profile contains the key information needed to start a guided review." : "Add the items below so we can produce a reliable recommendation."}</p></div><h3>{qualified ? "Recommended next step" : "Please provide"}</h3><ul>{qualified ? <><li>Verify uploaded documents</li><li>Generate your structured CV</li><li>Book a pathway consultation</li></> : missing.map(item => <li key={item}>{item}</li>)}</ul></> : <><div className="result"><b>Your private profile workspace</b><p>Complete the form and the assistant will identify gaps and suggest your appropriate journey.</p></div><h3>What happens next</h3><ol><li>We structure your information</li><li>We check requirements</li><li>You receive a recommended action</li></ol></>}</aside>
    </section><footer>Prototype — verification is required before any qualification decision.</footer>
  </main>
}
function Field({label, ...props}: {label:string} & React.InputHTMLAttributes<HTMLInputElement>) { return <label>{label}<input {...props}/></label> }
createRoot(document.getElementById("root")!).render(<App/>);
