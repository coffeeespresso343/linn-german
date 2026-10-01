import { Section } from "@/components/shared/Section";
import { ButtonLink } from "@/components/ui/Button";

const FinalCta = () => {
  return (
    <Section>
      <div className="rounded-3xl bg-fg px-6 py-14 text-center text-bg sm:px-12">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Bereit? Fang mit A1 an.
        </h2>
        <p className="mx-auto mt-3 max-w-md opacity-80">
          Create a free account to save your progress and pick where you left off.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink to="/register" size="lg">
            Create Account
          </ButtonLink>
          <ButtonLink to="/learn" variant="secondary" size="lg">
            Explore Lessons
          </ButtonLink>
        </div>
      </div>
    </Section>
  );
};

export default FinalCta;
