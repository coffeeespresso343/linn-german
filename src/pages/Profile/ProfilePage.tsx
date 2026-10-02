import { Button } from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { useAuth } from "@/features/auth/useAuth";
import { Loader, LogOut } from "lucide-react";
import { useState } from "react";

const ProfilePage = () => {
  const { user, profile, signOut } = useAuth();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const name = [profile?.first_name, profile?.last_name].filter(Boolean).join(" ");

  const handleSignOut = async () => {
    setIsSigningOut(true);
    await signOut();
    setIsSigningOut(false);
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">Profile</h1>
      <Card className="mt-6 space-y-6">
        <dl className="grid grid-cols-[8rem_1fr] gap-y-2 text-sm">
          <dt className="text-muted">Name</dt>
          <dd>{name || "-"}</dd>
          <dt className="text-muted">Email</dt>
          <dd>{user?.email}</dd>
          <dt className="text-muted">Language</dt>
          <dd>{profile?.preferred_language}</dd>
          <dt className="text-muted">Role</dt>
          <dd>{profile?.role}</dd>
        </dl>

        <Button
          variant="secondary"
          onClick={handleSignOut}
          disabled={isSigningOut}
          className="text-red"
        >
          {isSigningOut ? (
            <Loader size={16} className="animate-spin" />
          ) : (
            <LogOut size={16} />
          )}
          Logout
        </Button>
      </Card>
    </div>
  );
};

export default ProfilePage;
