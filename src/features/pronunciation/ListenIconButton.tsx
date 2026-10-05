import { speak } from "@/lib/speech";
import { Volume2 } from "lucide-react";

const ListenIconButton = ({ text }: { text: string }) => {
  return (
    <button
      type="button"
      onClick={() => speak(text)}
      className="grid size-9 shrink-0 place-items-center rounded-full text-muted
  transition-colors bg-surface/40 hover:bg-surface hover:text-fg active:scale-[0.96]"
    >
      <Volume2 size={18} />
    </button>
  );
};

export default ListenIconButton;
