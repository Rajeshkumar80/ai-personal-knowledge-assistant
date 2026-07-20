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
        <div className="w-11 h-11 rounded-xl bg-[#ee0000]/10 border border-[#ee0000]/20 flex items-center justify-center text-[#ee0000]">
          <AlertTriangle size={20} />
        </div>

        <div className="space-y-1.5">
          <h3 className="text-sm font-semibold text-white">{title}</h3>
          {description && (
            <p className="text-sm text-[#666]">{description}</p>
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
