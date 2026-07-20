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

/**
 * Accessible, animated modal dialog.
 */
function Modal({ open, onClose, title, children, size = "md", hideClose = false }) {
  // Close on Escape key
  const handleKey = useCallback(
    (e) => { if (e.key === "Escape" && open) onClose?.(); },
    [open, onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  // Lock body scroll while open
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Panel */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
              initial={{ opacity: 0, scale: 0.94, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 12 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className={cn(
                "relative w-full rounded-2xl border border-white/10 bg-[#131827] shadow-2xl shadow-black/60",
                sizes[size]
              )}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              {(title || !hideClose) && (
                <div className="flex items-center justify-between px-6 py-4 border-b border-white/8">
                  {title && (
                    <h2 id="modal-title" className="text-base font-semibold text-slate-100">
                      {title}
                    </h2>
                  )}
                  {!hideClose && (
                    <button
                      onClick={onClose}
                      className="ml-auto p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-white/8 transition-colors"
                      aria-label="Close modal"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
              )}

              {/* Content */}
              <div className="px-6 py-5">
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
