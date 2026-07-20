import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Home, SearchX } from "lucide-react";
import Button from "../components/common/Button";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0a0d14] flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center space-y-6 max-w-md"
      >
        {/* Icon */}
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-500">
            <SearchX size={36} />
          </div>
        </div>

        {/* Text */}
        <div className="space-y-2">
          <h1 className="text-6xl font-bold text-slate-700">404</h1>
          <h2 className="text-xl font-semibold text-slate-200">Page not found</h2>
          <p className="text-sm text-slate-500">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <Button icon={Home} onClick={() => navigate("/dashboard")}>
          Back to Dashboard
        </Button>
      </motion.div>
    </div>
  );
}

export default NotFound;
