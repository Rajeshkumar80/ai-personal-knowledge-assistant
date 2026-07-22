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
      <div className="space-y-6">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-xl font-semibold text-fg tracking-tight flex items-center gap-2">
              <FolderOpen size={18} />
              Documents
            </h1>
            <p className="text-sm text-fg-dim mt-1">
              {documents.length} document{documents.length !== 1 ? "s" : ""} in your knowledge base
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm" icon={RefreshCw} onClick={fetchDocuments} loading={loading}>
              Refresh
            </Button>
            <Button size="sm" icon={Upload} onClick={() => setUploadOpen(true)}>
              Upload
            </Button>
          </div>
        </div>

        <Input
          icon={Search}
          placeholder="Search documents by name…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />

        <FileList
          documents={filtered}
          loading={loading}
          onDelete={remove}
          onUploadClick={() => setUploadOpen(true)}
        />
      </div>

      <UploadModal open={uploadOpen} onClose={() => setUploadOpen(false)} />
    </DashboardLayout>
  );
}

export default Documents;
