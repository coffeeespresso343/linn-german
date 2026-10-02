import Card from "@/components/ui/Card";
import type { ReactNode } from "react";

interface Props {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
}

const AuthCard = ({ title, subtitle, children, footer }: Props) => {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md items-center px-4 py-12">
      <Card className="w-full">
        <h1 className="text-2xl text-center font-semibold tracking-tight">{title}</h1>
        <p className="mt-1 text-center text-muted">{subtitle}</p>
        <div className="mt-6 space-y-4">{children}</div>
        <p className="mt-6 text-sm text-center text-muted">{footer}</p>
      </Card>
    </div>
  );
};

export default AuthCard;
