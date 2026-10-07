import { Star } from "lucide-react";
import { useAuth } from "../auth/useAuth";
import { Link, useLocation } from "react-router-dom";
import { useBookmarks, useToggleBookmark } from "./hooks";
import type { BookmarkType } from "./bookmarkService";
import { cn } from "@/lib/cn";

const base =
  "grid size-9 shrink-0 place-items-center rounded-full text-muted transition-colors active:scale-95 hover:bg-surface hover:text-fg";

const BookmarkButton = ({
  type,
  id,
  label,
}: {
  type: BookmarkType;
  id: string;
  label: string;
}) => {
  const { user } = useAuth();
  const location = useLocation();
  const bookmarks = useBookmarks(type);
  const toggle = useToggleBookmark(type);
  const saved = bookmarks.data?.includes(id) ?? false;

  if (!user) {
    return (
      <Link
        to="/login"
        state={{ from: location.pathname + location.search }}
        aria-label="Log in to save words"
        className={base}
      >
        <Star size={18} />
      </Link>
    );
  }

  return (
    <button
      type="button"
      aria-pressed={saved}
      aria-label={saved ? `Remove ${label} from saved` : `Save ${label}`}
      onClick={() => toggle.mutate({ id, saved })}
      className={cn(base, saved && "text-red")}
    >
      <Star size={18} fill={saved ? "currentColor" : "none"} />
    </button>
  );
};

export default BookmarkButton;
