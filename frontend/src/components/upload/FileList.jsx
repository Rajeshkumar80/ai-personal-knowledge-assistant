import { AnimatePresence, motion } from "framer-motion";
import { FileText } from "lucide-react";
import FileCard from "./FileCard";
import EmptyState from "../common/EmptyState";
import Button from "../common/Button";
import { Skeleton } from "../common/Loader";

function FileList({ documents, loading, onDelete, onUploadClick }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="rounded-2xl border border-border bg-card p-4 space-y-3">
            <div className="flex items-start justify-between">
              <Skeleton className="w-10 h-10 rounded-xl" />
              <Skeleton className="w-12 h-5 rounded-full" />
            </div>
            <Skeleton className="h-3.5 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
            <div className="pt-2 border-t border-border flex justify-between">
              <Skeleton className="h-2.5 w-16" />
              <Skeleton className="h-2.5 w-12" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (documents.length === 0) {
    return (
      <EmptyState
        icon={FileText}
        title="No documents yet"
        description="Upload your first document to start building your knowledge base."
        action={
          <Button onClick={onUploadClick} icon={FileText}>
            Upload Document
          </Button>
        }
      />
    );
  }

  return (
    <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      <AnimatePresence>
        {documents.map((doc) => (
          <FileCard key={doc.id} doc={doc} onDelete={onDelete} />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}

export default FileList;
