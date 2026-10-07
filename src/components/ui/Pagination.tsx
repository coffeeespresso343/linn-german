import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./Button";

interface Props {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}
const Pagination = ({ page, totalPages, onChange }: Props) => {
  if (totalPages <= 1) return null;

  return (
    <nav className="mt-8 flex items-center justify-between gap-2">
      <Button variant="secondary" onClick={() => onChange(page - 1)} disabled={page <= 1}>
        <ChevronLeft size={18} />
        Prev
      </Button>

      <p className="text-sm tabular-nums text-muted">
        {page} of {totalPages}
      </p>

      <Button
        variant="secondary"
        onClick={() => onChange(page + 1)}
        disabled={page >= totalPages}
      >
        Next
        <ChevronRight size={18} />
      </Button>
    </nav>
  );
};

export default Pagination;
