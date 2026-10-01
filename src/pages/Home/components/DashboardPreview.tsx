import { Section, SectionHeading } from "@/components/shared/Section";
import Card from "@/components/ui/Card";
import ProgressBar from "@/components/ui/ProgressBar";
import { Flame } from "lucide-react";

const SKILLS = [
  { name: "Grammar", value: 75 },
  { name: "Vocabulary", value: 90 },
  { name: "Listening", value: 60 },
  { name: "Reading", value: 75 },
];

const DashboardPreview = () => {
  return (
    <Section>
      <div className="grid items-center gap-10 md:grid-cols-2">
        <SectionHeading
          eyebrow="Progress"
          title="Always knows your next steps."
          description="Daily goals, streaks and skill-by-skill progress keep you moving without the clutter."
        />

        <Card>
          <p className="font-mono text-xs uppercase tracking-widest text-muted">
            Preview - sample data
          </p>
          <div className="mt-3 flex items-center justify-between">
            <h3>Guten Tag!</h3>
            <p className="flex items-center gap-1.5 text-sm font-medium">
              <Flame size={18} className="text-red" /> 7 day streak
            </p>
          </div>

          <div className="mt-6">
            <div className="mb-2 flex justify-between text-sm">
              <span>Today's goal</span>
              <span className="tabular-nums text-muted">8 /10 XP</span>
            </div>
            <ProgressBar value={80} label="Daily goal" />
          </div>

          <ul className="mt-6 space-y-3">
            {SKILLS.map((s) => (
              <li key={s.name}>
                <div className="mb-1 flex justify-between text-sm">
                  <span>{s.name}</span>
                  <span className="tabular-nums text-muted">{s.value}%</span>
                </div>
                <ProgressBar value={s.value} label={`${s.name} progress`} />
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </Section>
  );
};

export default DashboardPreview;
