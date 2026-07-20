import { useState } from "react";
import { motion } from "framer-motion";
import { FileText, FileImage, File, Trash2, Database, Calendar } from "lucide-react";
import { cn } from "../../utils/cn";
import { formatBytes, timeAgo, getFileTypeLabel } from "../../utils/format";
import Badge from "../common/Badge";
import ConfirmDialog from "../common/ConfirmDialog";

function FileTypeIcon({ fileType, fileName }) {
  const label = getFileTypeLabel(fileType, fileName);
  if (label === "Image") return <FileImage size={20} />;
  if (label === "PDF" || label === "DOCX") return <FileText size={20} />;
  return <File size={20} />;
}

function FileCard({ doc, onDelete }) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await onDelete(doc.id);
    } finally {
      setDeleting(false);
      setConfirmOpen(false);
    }
  };

  const label = getFileTypeLabel(doc.fileType, doc.fileName);
  const labelVariant = {
    PDF: "danger", DOCX: "info", TXT: "success", Image: "warning",
  }[label] || "default";

  return (
    <>
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        whileHover={{ y: -2 }}
        transition={{ duration: 0.18 }}
        className="group rounded-2xl border border-white/7 bg-white/3 p-4 hover:border-white/12 hover:bg-white/5 transition-all duration-200"
      >
        {/* Icon + Badge */}
        <div className="flex items-start justify-between mb-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/15 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            <FileTypeIcon fileType={doc.fileType} fileName={doc.fileName} />
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={labelVariant}>{label}</Badge>
            <button
              onClick={() => setConfirmOpen(true)}
              className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-600 hover:text-red-400 hover:bg-red-500/10 transition-all opacity-0 group-hover:opacity-100"
              aria-label={`Delete ${doc.fileName}`}
            >
              <Trash2 size={13} />
            </button>
          </div>
        </div>

        {/* File name */}
        <p
          className="text-sm font-medium text-slate-200 leading-snug mb-1 line-clamp-2"
          title={doc.fileName}
        >
          {doc.fileName}
        </p>

        {/* Meta */}
        <div className="flex flex-col gap-1 mt-3 pt-3 border-t border-white/6">
          <div className="flex items-center justify-between text-[11px] text-slate-500">
            <span className="flex items-center gap-1.5">
              <Database size={10} />
              {doc.chunkCount ?? 0} chunks
            </span>
            <span>{formatBytes(doc.fileSize)}</span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-slate-600">
            <Calendar size={10} />
            {timeAgo(doc.uploadDate)}
          </div>
        </div>
      </motion.div>

      <ConfirmDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleDelete}
        loading={deleting}
        title="Delete document?"
        description={`"${doc.fileName}" and all its indexed chunks will be permanently removed.`}
        confirmLabel="Delete"
      />
    </>
  );
}

export default FileCard;
