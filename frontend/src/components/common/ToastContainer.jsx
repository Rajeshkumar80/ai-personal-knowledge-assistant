import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, AlertCircle, Info, X } from "lucide-react";
import { cn } from "../../utils/cn";

const icons = {
  success: { Icon: CheckCircle2, color: "text-emerald-400" },
  error:   { Icon: XCircle,      color: "text-red-400" },
  warning: { Icon: AlertCircle,  color: "text-amber-400" },
  info:    { Icon: Info,         color: "text-blue-400" },
};

function Toast({ id, type, message, onRemove }) {
  const { Icon, color } = icons[type] || icons.info;

  useEffect(() => {
    const t = setTimeout(() => onRemove(id), 4500);
    return () => clearTimeout(t);
  }, [id, onRemove]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 60, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 60, scale: 0.9 }}
      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      className="flex items-start gap-3 bg-[#1a2235] border border-white/10 rounded-xl px-4 py-3 shadow-xl shadow-black/40 max-w-sm w-full"
    >
      <Icon size={16} className={cn("mt-0.5 shrink-0", color)} />
      <p className="text-sm text-slate-200 flex-1 leading-snug">{message}</p>
      <button
        onClick={() => onRemove(id)}
        className="text-slate-500 hover:text-slate-300 transition-colors shrink-0 mt-0.5"
        aria-label="Dismiss"
      >
        <X size={14} />
      </button>
    </motion.div>
  );
}

export function ToastContainer() {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const handler = (e) => {
      setToasts((prev) => [...prev.slice(-4), e.detail]);
    };
    window.addEventListener("app:toast", handler);
    return () => window.removeEventListener("app:toast", handler);
  }, []);

  const remove = (id) => setToasts((prev) => prev.filter((t) => t.id !== id));

  return (
    <div
      aria-live="polite"
      className="fixed bottom-5 right-5 z-[9999] flex flex-col gap-2 pointer-events-none"
    >
      <AnimatePresence>
        {toasts.map((t) => (
          <div key={t.id} className="pointer-events-auto">
            <Toast {...t} onRemove={remove} />
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
}
