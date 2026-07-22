import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Home, SearchX } from "lucide-react";
import Button from "../components/common/Button";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-base flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center space-y-6 max-w-md"
      >
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-3xl bg-glow border border-border flex items-center justify-center text-fg-faint">
            <SearchX size={36} />
          </div>
        </div>
        <div className="space-y-2">
          <h1 className="text-6xl font-bold text-fg-faint">404</h1>
          <h2 className="text-xl font-semibold text-fg">Page not found</h2>
          <p className="text-sm text-fg-faint">
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
