import { useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload } from "lucide-react";
import { cn } from "../../utils/cn";

const ACCEPTED_TYPES = {
  "application/pdf": "PDF",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "DOCX",
  "text/plain": "TXT",
  "image/png": "PNG",
  "image/jpeg": "JPG",
};

const ACCEPT_STRING = Object.keys(ACCEPTED_TYPES).join(",");

function UploadBox({ onFiles }) {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef(null);

  const processFiles = useCallback(
    (files) => {
      const valid = Array.from(files).filter((f) => ACCEPTED_TYPES[f.type]);
      if (valid.length > 0) onFiles(valid);
    },
    [onFiles]
  );

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setDragging(false);
      processFiles(e.dataTransfer.files);
    },
    [processFiles]
  );

  const handleDragOver  = (e) => { e.preventDefault(); setDragging(true); };
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
        "relative rounded-xl border-2 border-dashed transition-all duration-150 cursor-pointer",
        "flex flex-col items-center justify-center gap-4 py-10 px-6 text-center",
        dragging
          ? "border-border-hover bg-glow/60 scale-[1.01]"
          : "border-border bg-glow hover:border-border-hover hover:bg-glow/80"
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
            className="w-12 h-12 rounded-xl bg-glow border border-border-hover flex items-center justify-center"
          >
            <Upload size={20} className="text-fg" />
          </motion.div>
        ) : (
          <motion.div
            key="idle"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-12 h-12 rounded-xl bg-glow border border-border flex items-center justify-center"
          >
            <Upload size={20} className="text-fg-faint" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-1.5">
        <p className="text-sm font-semibold text-fg">
          {dragging ? "Drop files here" : "Drag & drop files or click to browse"}
        </p>
        <p className="text-xs text-fg-faint">
          Supports PDF, DOCX, TXT, PNG, JPG — up to 20 MB each
        </p>
      </div>

      <div className="flex items-center gap-2 flex-wrap justify-center">
        {Object.values(ACCEPTED_TYPES).map((label) => (
          <span
            key={label}
            className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-glow border border-border text-fg-dim"
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

export default UploadBox;
