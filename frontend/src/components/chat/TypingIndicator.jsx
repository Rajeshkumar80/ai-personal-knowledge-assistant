import { motion } from "framer-motion";
import { Brain } from "lucide-react";

const dotVariants = {
  initial: { y: 0, opacity: 0.4 },
  animate: { y: -4, opacity: 1 },
};

function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.2 }}
      className="flex items-end gap-3 max-w-2xl"
    >
      {/* AI Avatar */}
      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shrink-0 shadow-lg shadow-indigo-600/20 mb-1">
        <Brain size={14} className="text-white" />
      </div>

      {/* Bubble */}
      <div className="rounded-2xl rounded-bl-sm bg-white/5 border border-white/8 px-4 py-3">
        <div className="flex items-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-indigo-400"
              variants={dotVariants}
              initial="initial"
              animate="animate"
              transition={{
                duration: 0.5,
                delay: i * 0.15,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            />
          ))}
          <span className="text-xs text-slate-500 ml-2">Thinking…</span>
        </div>
      </div>
    </motion.div>
  );
}

export default TypingIndicator;
