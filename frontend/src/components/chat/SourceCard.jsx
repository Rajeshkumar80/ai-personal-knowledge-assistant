import { FileText, BookOpen } from "lucide-react";
import { cn } from "../../utils/cn";
import Badge from "../common/Badge";

/**
 * Displays the source document citation for an AI answer.
 */
function SourceCard({ sourceFile, pageNumber, className }) {
  if (!sourceFile) return null;

  return (
    <div
      className={cn(
        "mt-3 flex items-start gap-2.5 rounded-xl border border-indigo-500/20 bg-indigo-500/8 px-3.5 py-2.5",
        className
      )}
    >
      <BookOpen size={13} className="text-indigo-400 mt-0.5 shrink-0" />
      <div className="min-w-0">
        <p className="text-xs font-medium text-indigo-300 mb-0.5">Source</p>
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5">
            <FileText size={11} className="text-indigo-400/70" />
            <span className="text-xs text-slate-300 truncate max-w-[240px]">{sourceFile}</span>
          </div>
          {pageNumber > 0 && (
            <Badge variant="primary" className="text-[10px] py-0">
              Page {pageNumber}
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
}

export default SourceCard;
