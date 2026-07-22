import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import Modal from "../common/Modal";
import UploadBox from "./UploadBox";
import UploadProgress from "./UploadProgress";
import Button from "../common/Button";
import { useDocuments } from "../../context/DocumentContext";

function UploadModal({ open, onClose }) {
  const { upload } = useDocuments();
  const [uploads, setUploads] = useState([]);
  const [running, setRunning] = useState(false);

  const handleFiles = useCallback(async (files) => {
    setRunning(true);
    const entries = files.map((file) => ({ file, progress: 0, done: false, error: null }));
    setUploads(entries);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      setUploads((prev) =>
        prev.map((u, idx) => (idx === i ? { ...u, progress: 5 } : u))
      );
      try {
        await upload(file, (pct) => {
          setUploads((prev) =>
            prev.map((u, idx) => (idx === i ? { ...u, progress: pct } : u))
          );
        });
        setUploads((prev) =>
          prev.map((u, idx) => (idx === i ? { ...u, done: true, progress: 100 } : u))
        );
      } catch {
        setUploads((prev) =>
          prev.map((u, idx) => (idx === i ? { ...u, error: "Upload failed", done: true } : u))
        );
      }
    }
    setRunning(false);
  }, [upload]);

  const handleClose = () => {
    if (running) return;
    setUploads([]);
    onClose();
  };

  const allDone = uploads.length > 0 && uploads.every((u) => u.done);

  return (
    <Modal open={open} onClose={handleClose} title="Upload Documents" size="lg">
      <div className="space-y-4">
        {uploads.length === 0 && <UploadBox onFiles={handleFiles} />}
        <AnimatePresence>
          {uploads.map(({ file, progress, done }, i) => (
            <UploadProgress
              key={`${file.name}-${i}`}
              file={file}
              progress={progress}
              done={done}
            />
          ))}
        </AnimatePresence>
        {allDone && (
          <div className="flex justify-end pt-2">
            <Button onClick={handleClose}>Done</Button>
          </div>
        )}
      </div>
    </Modal>
  );
}

export default UploadModal;
