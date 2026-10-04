import { ArrowLeft, RotateCcw } from "lucide-react";
import { Button, ButtonLink } from "../ui/Button";

export function ErrorBlock({
  message,
  onRetry,
}: {
  message: string;
  onRetry?: () => void;
}) {
  return (
    <div className="mt-8 rounded-2xl text-center border border-border bg-red/5 p-6">
      <p className="font-medium">Something went wrong.</p>
      <p className="mt-1 text-sm text-muted">{message}</p>
      {onRetry && (
        <Button variant="secondary" onClick={onRetry} className="mt-4">
          <RotateCcw size={16} />
          Try again
        </Button>
      )}
    </div>
  );
}

export function NotFoundBlock({
  title,
  backTo,
  backLabel,
}: {
  title: string;
  backTo: string;
  backLabel: string;
}) {
  return (
    <div className="mx-auto max-w-xl px-6 py-24 text-center">
      <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
      <ButtonLink to={backTo} variant="secondary" className="mt-6">
        <ArrowLeft size={16} />
        {backLabel}
      </ButtonLink>
    </div>
  );
}
