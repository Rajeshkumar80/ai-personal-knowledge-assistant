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
      animate={{ width: collapsed ? 64 : 240 }}
      transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
      className="relative flex flex-col h-full bg-base border-r border-border shrink-0 overflow-hidden"
    >
      {/* Logo */}
      <div className="flex items-center h-14 px-4 border-b border-border shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-7 h-7 rounded-lg bg-accent flex items-center justify-center shrink-0">
            <Brain size={14} className="text-base" />
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, x: -4 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -4 }}
                transition={{ duration: 0.15 }}
                className="min-w-0"
              >
                <p className="text-sm font-semibold text-fg truncate leading-tight">KnowledgeAI</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 py-3 space-y-0.5 overflow-y-auto overflow-x-hidden">
        {navItems.map(({ title, icon: Icon, path }) => {
          const isActive = location.pathname === path ||
            (path !== "/dashboard" && location.pathname.startsWith(path));

          return (
            <NavLink
              key={path}
              to={path}
              title={collapsed ? title : undefined}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 transition-all duration-150 group",
                isActive
                  ? "bg-glow text-fg"
                  : "text-fg-dim hover:text-fg hover:bg-glow/60"
              )}
            >
              <Icon
                size={16}
                className={cn(
                  "shrink-0 transition-colors",
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

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed((v) => !v)}
        className="absolute -right-3 top-[68px] w-6 h-6 rounded-full bg-elevated border border-border flex items-center justify-center text-fg-dim hover:text-fg hover:border-border-hover transition-all z-10"
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>
    </motion.aside>
  );
}

export default Sidebar;
