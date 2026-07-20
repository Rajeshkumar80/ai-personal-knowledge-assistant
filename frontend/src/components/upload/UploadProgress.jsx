import { motion } from "framer-motion";
import { FileText, CheckCircle2, Loader2 } from "lucide-react";
import { cn } from "../../utils/cn";
import { formatBytes } from "../../utils/format";

function UploadProgress({ file, progress, done }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.2 }}
      className="flex items-center gap-3 rounded-lg border border-white/6 bg-white/2 px-4 py-3"
    >
      <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center shrink-0">
        {done
          ? <CheckCircle2 size={15} className="text-emerald-400" />
          : <FileText size={15} className="text-[#666]" />
        }
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-sm font-medium text-white truncate max-w-[200px]">
            {file.name}
          </span>
          <span className="text-xs text-[#555] shrink-0 ml-3">
            {done ? "Complete" : `${progress}%`}
          </span>
        </div>

        <div className="h-1 rounded-full bg-white/6 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${done ? 100 : progress}%` }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={cn(
              "h-full rounded-full",
              done ? "bg-emerald-500" : "bg-white"
            )}
          />
        </div>

        <p className="text-[10px] text-[#444] mt-1">
          {formatBytes(file.size)}
        </p>
      </div>

      {!done && (
        <Loader2 size={13} className="text-[#555] animate-spin shrink-0" />
      )}
    </motion.div>
  );
}

export default UploadProgress;
