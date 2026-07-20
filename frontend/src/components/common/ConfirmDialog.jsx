import Modal from "./Modal";
import Button from "./Button";
import { AlertTriangle } from "lucide-react";

function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title = "Are you sure?",
  description,
  confirmLabel = "Delete",
  loading = false,
}) {
  return (
    <Modal open={open} onClose={onClose} size="sm">
      <div className="flex flex-col items-center text-center gap-4 pb-2">
        <div className="w-11 h-11 rounded-xl bg-danger/10 border border-danger/20 flex items-center justify-center text-danger">
          <AlertTriangle size={20} />
        </div>

        <div className="space-y-1.5">
          <h3 className="text-sm font-semibold text-fg">{title}</h3>
          {description && (
            <p className="text-sm text-fg-dim">{description}</p>
          )}
        </div>

        <div className="flex gap-2 w-full mt-2">
          <Button
            variant="secondary"
            className="flex-1"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            className="flex-1"
            onClick={onConfirm}
            loading={loading}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default ConfirmDialog;
