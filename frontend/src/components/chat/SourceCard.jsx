import { FileText, BookOpen } from "lucide-react";
import { cn } from "../../utils/cn";
import Badge from "../common/Badge";

function SourceCard({ sourceFile, pageNumber, className }) {
  if (!sourceFile) return null;

  return (
    <div
      className={cn(
        "mt-3 flex items-start gap-2.5 rounded-lg border border-white/8 bg-white/3 px-3 py-2.5",
        className
      )}
    >
      <BookOpen size={13} className="text-[#666] mt-0.5 shrink-0" />
      <div className="min-w-0">
        <p className="text-xs font-medium text-[#888] mb-0.5">Source</p>
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5">
            <FileText size={11} className="text-[#555]" />
            <span className="text-xs text-[#aaa] truncate max-w-[240px]">{sourceFile}</span>
          </div>
          {pageNumber > 0 && (
            <Badge variant="default" className="text-[10px] py-0">
              Page {pageNumber}
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
}

export default SourceCard;
