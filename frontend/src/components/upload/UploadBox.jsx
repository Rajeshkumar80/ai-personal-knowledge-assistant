import { useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileText, ImageIcon, File } from "lucide-react";
import { cn } from "../../utils/cn";

const ACCEPTED_TYPES = {
  "application/pdf": "PDF",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "DOCX",
  "text/plain": "TXT",
  "image/png": "PNG",
  "image/jpeg": "JPG",
};

const ACCEPT_STRING = Object.keys(ACCEPTED_TYPES).join(",");

function getFileIcon(type) {
  if (type?.includes("image")) return ImageIcon;
  if (type?.includes("pdf") || type?.includes("word")) return FileText;
  return File;
}

/**
 * Drag-and-drop upload zone.
 */
function UploadBox({ onFiles }) {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef(null);

  const processFiles = (files) => {
    const valid = Array.from(files).filter((f) => ACCEPTED_TYPES[f.type]);
    if (valid.length > 0) onFiles(valid);
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragging(false);
    processFiles(e.dataTransfer.files);
  }, [onFiles]);

  const handleDragOver = (e) => { e.preventDefault(); setDragging(true); };
  const handleDragLeave = () => setDragging(false);

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onClick={() => inputRef.current?.click()}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
      aria-label="Upload document"
      className={cn(
        "relative rounded-2xl border-2 border-dashed transition-all duration-200 cursor-pointer",
        "flex flex-col items-center justify-center gap-4 py-12 px-6 text-center",
        dragging
          ? "border-indigo-400 bg-indigo-500/10 scale-[1.01]"
          : "border-white/12 bg-white/2 hover:border-indigo-500/40 hover:bg-indigo-500/5"
      )}
    >
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPT_STRING}
        multiple
        onChange={(e) => processFiles(e.target.files)}
        className="hidden"
        aria-hidden="true"
      />

      <AnimatePresence mode="wait">
        {dragging ? (
          <motion.div
            key="dragging"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="w-14 h-14 rounded-2xl bg-indigo-500/20 border border-indigo-400/40 flex items-center justify-center"
          >
            <Upload size={24} className="text-indigo-300" />
          </motion.div>
        ) : (
          <motion.div
            key="idle"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center"
          >
            <Upload size={24} className="text-slate-400" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-1.5">
        <p className="text-sm font-semibold text-slate-200">
          {dragging ? "Drop files here" : "Drag & drop files or click to browse"}
        </p>
        <p className="text-xs text-slate-500">
          Supports PDF, DOCX, TXT, PNG, JPG — up to 20 MB each
        </p>
      </div>

      {/* Accepted types */}
      <div className="flex items-center gap-2 flex-wrap justify-center">
        {Object.values(ACCEPTED_TYPES).map((label) => (
          <span
            key={label}
            className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-white/6 border border-white/10 text-slate-400"
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

export default UploadBox;
