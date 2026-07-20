import { useLocation } from "react-router-dom";

const routeTitles = {
  "/dashboard": "Dashboard",
  "/chat":      "AI Chat",
  "/documents": "Documents",
  "/settings":  "Settings",
};

function Navbar() {
  const location = useLocation();
  const pageTitle = routeTitles[location.pathname] ?? "KnowledgeAI";

  return (
    <header className="h-14 flex items-center px-6 border-b border-white/8 bg-black/80 backdrop-blur-xl shrink-0">
      <h1 className="text-sm font-semibold text-white">{pageTitle}</h1>
    </header>
  );
}

export default Navbar;
