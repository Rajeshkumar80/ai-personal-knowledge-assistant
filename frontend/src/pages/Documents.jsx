import { useState } from "react";
import { motion } from "framer-motion";
import { Upload, Search, RefreshCw, FolderOpen } from "lucide-react";
import DashboardLayout from "../components/layout/DashboardLayout";
import FileList from "../components/upload/FileList";
import UploadModal from "../components/upload/UploadModal";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import { useDocuments } from "../context/DocumentContext";
import useDebounce from "../hooks/useDebounce";

function Documents() {
  const { documents, loading, remove, fetchDocuments } = useDocuments();
  const [uploadOpen, setUploadOpen] = useState(false);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 200);

  const filtered = documents.filter((d) =>
    d.fileName.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start justify-between gap-4 flex-wrap"
        >
          <div>
            <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
              <FolderOpen size={22} className="text-indigo-400" />
              Documents
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              {documents.length} document{documents.length !== 1 ? "s" : ""} in your knowledge base
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              icon={RefreshCw}
              onClick={fetchDocuments}
              loading={loading}
            >
              Refresh
            </Button>
            <Button
              size="sm"
              icon={Upload}
              onClick={() => setUploadOpen(true)}
            >
              Upload
            </Button>
          </div>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
        >
          <Input
            icon={Search}
            placeholder="Search documents by name…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-sm"
          />
        </motion.div>

        {/* File grid */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <FileList
            documents={filtered}
            loading={loading}
            onDelete={remove}
            onUploadClick={() => setUploadOpen(true)}
          />
        </motion.div>

      </div>

      {/* Upload modal */}
      <UploadModal open={uploadOpen} onClose={() => setUploadOpen(false)} />
    </DashboardLayout>
  );
}

export default Documents;
