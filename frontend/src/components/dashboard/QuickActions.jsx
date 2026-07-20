import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Upload, MessageSquare, FileText, Search } from "lucide-react";

const actions = [
  {
    title: "Upload Document",
    description: "Add PDF, DOCX, TXT, or images",
    icon: Upload,
    path: "/documents",
  },
  {
    title: "Ask AI",
    description: "Chat with your knowledge base",
    icon: MessageSquare,
    path: "/chat",
  },
  {
    title: "Browse Files",
    description: "View and manage documents",
    icon: FileText,
    path: "/documents",
  },
  {
    title: "Search Knowledge",
    description: "Find specific information",
    icon: Search,
    path: "/chat",
  },
];

function QuickActions() {
  const navigate = useNavigate();

  return (
    <div className="rounded-xl border border-white/6 bg-white/2 p-5">
      <h2 className="text-sm font-semibold text-white mb-3">Quick Actions</h2>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
        {actions.map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.button
              key={item.title}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => navigate(item.path)}
              className="flex flex-col items-start gap-2.5 rounded-lg border border-white/6 bg-white/2 hover:border-white/12 hover:bg-white/4 p-3.5 text-left transition-all duration-150 cursor-pointer"
            >
              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-[#888]">
                <Icon size={16} />
              </div>
              <div>
                <p className="text-sm font-medium text-white">{item.title}</p>
                <p className="text-xs text-[#555] mt-0.5 leading-snug">{item.description}</p>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

export default QuickActions;
