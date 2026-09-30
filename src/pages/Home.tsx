import { Button, ButtonLink } from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import ProgressBar from "@/components/ui/ProgressBar";

const Home = () => {
  return (
    <main className="mx-auto max-w-3xl px-6 py-20">
      <h1 className="text-5xl font-semibold tracking-tight">
        Deutsch lernen. <br />
        <span className="text-red">Schritt für Schritt.</span>
      </h1>

      <p className="mt-4 text-muted" lang="my">
        Learn German in German, English &amp; Myanmar. မြန်မာဘာသာဖြင့် ဂျာမန်ဘာသာလေ့လာပါ။
      </p>

      <div className="flex flex-wrap gap-3">
        <ButtonLink to="/learn" size="lg">
          Start Learning
        </ButtonLink>
        <Button variant="secondary" size="lg">
          Explore Lessons
        </Button>
        <Button variant="ghost" size="lg">
          Ghost
        </Button>
      </div>

      <Card className="mt-5">
        <p>A1 . Beginner</p>
        <div className="flex items-center gap-3 mt-3">
          <ProgressBar value={72} label="A1 progress" />
          <span className="text-sm tabular-nums text-muted">72%</span>
        </div>
      </Card>
    </main>
  );
};

export default Home;
