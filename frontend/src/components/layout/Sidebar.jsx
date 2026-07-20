import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  MessageSquare,
  FolderOpen,
  Settings,
  ChevronLeft,
  ChevronRight,
  Brain,
  Zap,
} from "lucide-react";
import { cn } from "../../utils/cn";

const navItems = [
  { title: "Dashboard",  icon: LayoutDashboard, path: "/dashboard" },
  { title: "AI Chat",    icon: MessageSquare,   path: "/chat" },
  { title: "Documents",  icon: FolderOpen,      path: "/documents" },
  { title: "Settings",   icon: Settings,        path: "/settings" },
];

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <motion.aside
      animate={{ width: collapsed ? 70 : 240 }}
      transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
      className="relative flex flex-col h-full bg-[#0d1117] border-r border-white/6 shrink-0 overflow-hidden"
    >
      {/* Logo */}
      <div className="flex items-center h-[60px] px-4 border-b border-white/6 shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shrink-0 shadow-lg shadow-indigo-600/25">
            <Brain size={16} className="text-white" />
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -6 }}
                transition={{ duration: 0.15 }}
                className="min-w-0"
              >
                <p className="text-sm font-bold text-slate-100 truncate leading-tight">KnowledgeAI</p>
                <p className="text-[10px] text-indigo-400 font-medium tracking-wide">Personal Assistant</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto overflow-x-hidden">
        {navItems.map(({ title, icon: Icon, path }) => {
          const isActive = location.pathname === path ||
            (path !== "/dashboard" && location.pathname.startsWith(path));

          return (
            <NavLink
              key={path}
              to={path}
              title={collapsed ? title : undefined}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-150 group relative",
                isActive
                  ? "bg-indigo-600/20 text-indigo-300 border border-indigo-500/25"
                  : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-indigo-400 rounded-full"
                  transition={{ duration: 0.2 }}
                />
              )}
              <Icon
                size={18}
                className={cn(
                  "shrink-0 transition-colors",
                  isActive ? "text-indigo-400" : "text-slate-500 group-hover:text-slate-300"
                )}
              />
              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.12 }}
                    className="text-sm font-medium truncate"
                  >
                    {title}
                  </motion.span>
                )}
              </AnimatePresence>
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom — status */}
      <AnimatePresence>
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="px-4 pb-4"
          >
            <div className="rounded-xl bg-emerald-500/8 border border-emerald-500/20 px-3 py-2.5 flex items-center gap-2.5">
              <Zap size={13} className="text-emerald-400 shrink-0" />
              <div className="min-w-0">
                <p className="text-xs font-medium text-emerald-300">AI Online</p>
                <p className="text-[10px] text-slate-500 truncate">llama3.2 · ChromaDB</p>
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse ml-auto shrink-0" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed((v) => !v)}
        className="absolute -right-3 top-[72px] w-6 h-6 rounded-full bg-[#1a2235] border border-white/12 flex items-center justify-center text-slate-400 hover:text-slate-200 hover:border-white/25 transition-all shadow-md z-10"
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>
    </motion.aside>
  );
}

export default Sidebar;
