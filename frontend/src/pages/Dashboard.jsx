import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FileText, MessageSquare, Database, HardDrive } from "lucide-react";
import DashboardLayout from "../components/layout/DashboardLayout";
import StatsCard from "../components/dashboard/StatsCard";
import QuickActions from "../components/dashboard/QuickActions";
import RecentActivity from "../components/dashboard/RecentActivity";
import { getStats } from "../api/documentApi";

const stagger = {
  animate: { transition: { staggerChildren: 0.05, delayChildren: 0.08 } },
};

const fadeUp = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } },
};

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [statsLoading, setStatsLoading] = useState(true);

  useEffect(() => {
    getStats()
      .then((res) => setStats(res.data))
      .catch(() => setStats(null))
      .finally(() => setStatsLoading(false));
  }, []);

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  return (
    <DashboardLayout>
      <motion.div variants={stagger} initial="initial" animate="animate" className="space-y-6">
        <motion.div variants={fadeUp}>
          <h1 className="text-xl font-semibold text-fg tracking-tight">{greeting}</h1>
          <p className="text-sm text-fg-dim mt-1">
            Here's an overview of your AI knowledge workspace.
          </p>
        </motion.div>

        <motion.div variants={fadeUp} className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          <StatsCard
            title="Documents"
            value={stats?.totalDocuments ?? "—"}
            icon={FileText}
            loading={statsLoading}
            trend="Total uploaded"
          />
          <StatsCard
            title="AI Chats"
            value={stats?.totalChats ?? "—"}
            icon={MessageSquare}
            color="emerald"
            loading={statsLoading}
            trend="Questions answered"
          />
          <StatsCard
            title="Vector Chunks"
            value={stats?.totalChunks ? Number(stats.totalChunks).toLocaleString() : "—"}
            icon={Database}
            color="blue"
            loading={statsLoading}
            trend="Indexed in ChromaDB"
          />
          <StatsCard
            title="Storage Used"
            value={stats?.totalStorage ?? "—"}
            icon={HardDrive}
            loading={statsLoading}
            trend="Uploaded content"
          />
        </motion.div>

        <motion.div variants={fadeUp}>
          <QuickActions />
        </motion.div>

        <motion.div variants={fadeUp}>
          <RecentActivity />
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
}

export default Dashboard;
