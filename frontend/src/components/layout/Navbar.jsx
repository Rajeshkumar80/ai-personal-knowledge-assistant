import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Bell, Sun, Moon, UserCircle2, ChevronDown } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";
import { cn } from "../../utils/cn";

const routeTitles = {
  "/dashboard": "Dashboard",
  "/chat":      "AI Chat",
  "/documents": "Documents",
  "/settings":  "Settings",
};

function Navbar() {
  const location = useLocation();
  const { isDark, toggleTheme } = useTheme();
  const [notifOpen, setNotifOpen] = useState(false);

  const pageTitle = routeTitles[location.pathname] ?? "KnowledgeAI";

  return (
    <header className="h-[60px] flex items-center justify-between px-6 border-b border-white/6 bg-[#0a0d14]/80 backdrop-blur-xl shrink-0">
      {/* Page title */}
      <div>
        <h1 className="text-base font-semibold text-slate-100">{pageTitle}</h1>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-2">

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-200 hover:bg-white/6 transition-colors"
          aria-label="Toggle theme"
        >
          {isDark ? <Sun size={16} /> : <Moon size={16} />}
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setNotifOpen((v) => !v)}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-200 hover:bg-white/6 transition-colors relative"
            aria-label="Notifications"
          >
            <Bell size={16} />
            <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-indigo-400" />
          </button>

          {notifOpen && (
            <>
              <div className="fixed inset-0 z-30" onClick={() => setNotifOpen(false)} />
              <div className="absolute right-0 top-11 z-40 w-72 rounded-xl bg-[#131827] border border-white/10 shadow-xl shadow-black/40 overflow-hidden">
                <div className="px-4 py-3 border-b border-white/8">
                  <p className="text-sm font-semibold text-slate-200">Notifications</p>
                </div>
                <div className="px-4 py-8 text-center">
                  <p className="text-sm text-slate-500">No new notifications</p>
                </div>
              </div>
            </>
          )}
        </div>

        {/* User avatar */}
        <div className="flex items-center gap-2 pl-2 border-l border-white/8 ml-1">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
            U
          </div>
          <div className="hidden sm:block">
            <p className="text-xs font-medium text-slate-200 leading-tight">User</p>
            <p className="text-[10px] text-slate-500 leading-tight">Free plan</p>
          </div>
          <ChevronDown size={13} className="text-slate-500 hidden sm:block" />
        </div>
      </div>
    </header>
  );
}

export default Navbar;
