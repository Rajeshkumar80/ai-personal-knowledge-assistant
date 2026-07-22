import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Upload, MessageSquare, FileText, Search } from "lucide-react";

const actions = [
  { title: "Upload Document", description: "Add PDF, DOCX, TXT, or images", icon: Upload, path: "/documents" },
  { title: "Ask AI", description: "Chat with your knowledge base", icon: MessageSquare, path: "/chat" },
  { title: "Browse Files", description: "View and manage documents", icon: FileText, path: "/documents" },
  { title: "Search Knowledge", description: "Find specific information", icon: Search, path: "/chat" },
];

function QuickActions() {
  const navigate = useNavigate();

  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <h2 className="text-sm font-semibold text-fg mb-4">Quick Actions</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
        {actions.map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.button
              key={item.title}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              onClick={() => navigate(item.path)}
              className="flex flex-col items-start gap-3 rounded-xl border border-border bg-glow hover:border-border-hover hover:bg-card p-4 text-left transition-all duration-150 cursor-pointer"
            >
              <div className="w-9 h-9 rounded-xl bg-glow border border-border flex items-center justify-center text-fg-dim">
                <Icon size={16} />
              </div>
              <div>
                <p className="text-sm font-medium text-fg">{item.title}</p>
                <p className="text-xs text-fg-faint mt-0.5 leading-snug">{item.description}</p>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

export default QuickActions;
