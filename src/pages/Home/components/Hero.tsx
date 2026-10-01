import { ButtonLink } from "@/components/ui/Button";
import WordRotator from "./WordRotator";

const Hero = () => {
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-24">
      <div>
        <p className="font-mono text-xs uppercase tracking-widest text-red">
          Linn German
        </p>
        <h1 className="mt-4 text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
          Deutsch lernen.
          <br />
          <span className="text-red">Schritte für Schritt.</span>
        </h1>

        <p className="mt-5 max-w-md text-lg text-muted">
          Learn German from A1 to C2 with German, English and Myanmar explanations.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink to="/learn" size="lg">
            Start Learning
          </ButtonLink>
          <ButtonLink to="/learn" variant="secondary" size="lg">
            Explore Lessons
          </ButtonLink>
        </div>
      </div>

      <WordRotator />
    </section>
  );
};

export default Hero;
