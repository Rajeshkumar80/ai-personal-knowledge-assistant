import { motion } from "framer-motion";
import { Brain } from "lucide-react";

const dotVariants = {
  initial: { y: 0, opacity: 0.4 },
  animate: { y: -3, opacity: 1 },
};

function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 6 }}
      transition={{ duration: 0.2 }}
      className="flex items-end gap-3 max-w-2xl"
    >
      <div className="w-7 h-7 rounded-lg bg-accent flex items-center justify-center shrink-0 mb-1">
        <Brain size={13} className="text-base" />
      </div>

      <div className="rounded-2xl rounded-bl-sm bg-glow border border-border px-4 py-3">
        <div className="flex items-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-fg-dim"
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
          <span className="text-xs text-fg-faint ml-2">Thinking…</span>
        </div>
      </div>
    </motion.div>
  );
}

export default TypingIndicator;
