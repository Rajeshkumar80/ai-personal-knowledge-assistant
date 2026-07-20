import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Upload, MessageSquare, FileText, Search } from "lucide-react";

const actions = [
  {
    title: "Upload Document",
    description: "Add PDF, DOCX, TXT, or images",
    icon: Upload,
    color: "from-indigo-500/15 to-indigo-600/8 border-indigo-500/20 hover:border-indigo-400/40",
    iconColor: "text-indigo-400",
    path: "/documents",
  },
  {
    title: "Ask AI",
    description: "Chat with your knowledge base",
    icon: MessageSquare,
    color: "from-emerald-500/15 to-emerald-600/8 border-emerald-500/20 hover:border-emerald-400/40",
    iconColor: "text-emerald-400",
    path: "/chat",
  },
  {
    title: "Browse Files",
    description: "View and manage documents",
    icon: FileText,
    color: "from-purple-500/15 to-purple-600/8 border-purple-500/20 hover:border-purple-400/40",
    iconColor: "text-purple-400",
    path: "/documents",
  },
  {
    title: "Search Knowledge",
    description: "Find specific information",
    icon: Search,
    color: "from-blue-500/15 to-blue-600/8 border-blue-500/20 hover:border-blue-400/40",
    iconColor: "text-blue-400",
    path: "/chat",
  },
];

function QuickActions() {
  const navigate = useNavigate();

  return (
    <div className="rounded-2xl border border-white/7 bg-white/3 p-6">
      <h2 className="text-sm font-semibold text-slate-200 mb-4">Quick Actions</h2>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {actions.map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.button
              key={item.title}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-start gap-3 rounded-xl border bg-gradient-to-br p-4 text-left transition-all duration-200 cursor-pointer ${item.color}`}
            >
              <div className={`w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center ${item.iconColor}`}>
                <Icon size={18} />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-200">{item.title}</p>
                <p className="text-xs text-slate-500 mt-0.5 leading-snug">{item.description}</p>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

export default QuickActions;
