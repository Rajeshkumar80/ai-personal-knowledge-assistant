import { motion, AnimatePresence } from "framer-motion";
import { FileText, CheckCircle2, Loader2 } from "lucide-react";
import { cn } from "../../utils/cn";
import { formatBytes } from "../../utils/format";

/**
 * Animated file upload progress bar.
 */
function UploadProgress({ file, progress, done }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.2 }}
      className="flex items-center gap-3 rounded-xl border border-white/8 bg-white/3 px-4 py-3"
    >
      {/* Icon */}
      <div className="w-9 h-9 rounded-xl bg-indigo-500/15 border border-indigo-500/25 flex items-center justify-center shrink-0">
        {done
          ? <CheckCircle2 size={16} className="text-emerald-400" />
          : <FileText size={16} className="text-indigo-400" />
        }
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-sm font-medium text-slate-200 truncate max-w-[200px]">
            {file.name}
          </span>
          <span className="text-xs text-slate-500 shrink-0 ml-3">
            {done ? "Complete" : `${progress}%`}
          </span>
        </div>

        {/* Progress bar */}
        <div className="h-1.5 rounded-full bg-white/8 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${done ? 100 : progress}%` }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={cn(
              "h-full rounded-full",
              done ? "bg-emerald-500" : "bg-indigo-500"
            )}
          />
        </div>

        <p className="text-[10px] text-slate-600 mt-1">
          {formatBytes(file.size)}
        </p>
      </div>

      {/* Spinner */}
      {!done && (
        <Loader2 size={14} className="text-slate-500 animate-spin shrink-0" />
      )}
    </motion.div>
  );
}

export default UploadProgress;
