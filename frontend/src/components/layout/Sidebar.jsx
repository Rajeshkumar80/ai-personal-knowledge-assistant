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
  Search,
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
      animate={{ width: collapsed ? 70 : 280 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex flex-col h-full bg-sidebar border-r border-border shrink-0 overflow-hidden z-10"
    >
      <div className="flex items-center h-14 px-4 border-b border-border shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center shrink-0 shadow-sm">
            <Brain size={16} className="text-white" />
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, x: -4 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -4 }}
                transition={{ duration: 0.12 }}
                className="text-sm font-semibold text-fg tracking-tight"
              >
                KnowledgeAI
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="px-2 py-3">
        {!collapsed && (
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-glow border border-border text-fg-faint text-xs">
            <Search size={14} />
            <span>Search workspace…</span>
          </div>
        )}
      </div>

      <nav className="flex-1 px-2 space-y-0.5 overflow-y-auto overflow-x-hidden">
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
                  ? "bg-glow text-fg"
                  : "text-fg-dim hover:text-fg hover:bg-glow/60"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-indicator"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  className="absolute left-0 w-0.5 h-5 bg-fg rounded-full"
                />
              )}
              <Icon
                size={16}
                className={cn(
                  "shrink-0",
                  isActive ? "text-fg" : "text-fg-faint group-hover:text-fg-dim"
                )}
              />
              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.1 }}
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

      <button
        onClick={() => setCollapsed((v) => !v)}
        className="absolute -right-3 top-5 w-6 h-6 rounded-full bg-elevated border border-border flex items-center justify-center text-fg-dim hover:text-fg hover:border-border-hover transition-all z-20 shadow-sm"
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed ? <ChevronRight size={11} /> : <ChevronLeft size={11} />}
      </button>
    </motion.aside>
  );
}

export default Sidebar;
