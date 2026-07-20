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
            className="fixed inset-0 z-40 bg-base/70 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
              initial={{ opacity: 0, scale: 0.96, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 8 }}
              transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className={cn(
                "relative w-full rounded-xl border border-border bg-surface shadow-2xl",
                sizes[size]
              )}
              onClick={(e) => e.stopPropagation()}
            >
              {(title || !hideClose) && (
                <div className="flex items-center justify-between px-5 py-4 border-b border-border">
                  {title && (
                    <h2 id="modal-title" className="text-sm font-semibold text-fg">
                      {title}
                    </h2>
                  )}
                  {!hideClose && (
                    <button
                      onClick={onClose}
                      className="ml-auto p-1.5 rounded-md text-fg-dim hover:text-fg hover:bg-glow transition-colors"
                      aria-label="Close modal"
                    >
                      <X size={15} />
                    </button>
                  )}
                </div>
              )}

              <div className="px-5 py-4">
                {children}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

export default Modal;
