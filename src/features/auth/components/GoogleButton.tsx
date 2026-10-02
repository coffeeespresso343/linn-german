import { useState } from "react";
import { signInWithGoogle } from "../authService";
import { Button } from "@/components/ui/Button";
import { FcGoogle } from "react-icons/fc";

const GoogleButton = () => {
  const [error, setError] = useState<string | null>(null);

  async function onClick() {
    setError(null);
    const { error } = await signInWithGoogle();
    if (error) setError(error.message);
  }
  return (
    <div>
      <Button type="button" variant="secondary" onClick={onClick} className="w-full">
        <FcGoogle size={16} />
        Continue with Google
      </Button>
      {error && <p className="mt-2 text-sm text-red-dark dark:text-red">{error}</p>}
    </div>
  );
};

export default GoogleButton;
