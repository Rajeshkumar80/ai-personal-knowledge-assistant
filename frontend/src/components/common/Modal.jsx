import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "../../utils/cn";

const sizes = {
  sm:  "max-w-sm",
  md:  "max-w-md",
  lg:  "max-w-lg",
  xl:  "max-w-xl",
  "2xl": "max-w-2xl",
};

function Modal({ open, onClose, title, children, size = "md", hideClose = false }) {
  const handleKey = useCallback(
    (e) => { if (e.key === "Escape" && open) onClose?.(); },
    [open, onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-40 bg-overlay backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              role="dialog"
              aria-modal="true"
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className={cn(
                "relative w-full rounded-2xl border border-border bg-surface shadow-lg",
                sizes[size]
              )}
              onClick={(e) => e.stopPropagation()}
            >
              {(title || !hideClose) && (
                <div className="flex items-center justify-between px-6 py-4 border-b border-border">
                  {title && (
                    <h2 className="text-sm font-semibold text-fg">{title}</h2>
                  )}
                  {!hideClose && (
                    <button
                      onClick={onClose}
                      className="ml-auto p-1.5 rounded-lg text-fg-dim hover:text-fg hover:bg-glow transition-colors"
                      aria-label="Close modal"
                    >
                      <X size={15} />
                    </button>
                  )}
                </div>
              )}
              <div className="px-6 py-5">{children}</div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

export default Modal;
