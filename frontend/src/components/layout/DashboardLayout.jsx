import { motion } from "framer-motion";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const pageVariants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } },
};

function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen overflow-hidden bg-base">
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          <div className="max-w-[1400px] mx-auto px-6 py-6 min-h-full flex flex-col">
            <motion.div variants={pageVariants} initial="initial" animate="animate" className="flex-1 flex flex-col">
              {children}
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
