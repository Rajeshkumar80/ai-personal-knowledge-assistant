import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FileText, MessageSquare, Database, HardDrive } from "lucide-react";
import DashboardLayout from "../components/layout/DashboardLayout";
import StatsCard from "../components/dashboard/StatsCard";
import QuickActions from "../components/dashboard/QuickActions";
import RecentActivity from "../components/dashboard/RecentActivity";
import { getStats } from "../api/documentApi";

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
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          <h1 className="text-xl font-bold text-fg">
            {greeting}
          </h1>
          <p className="text-sm text-fg-dim mt-1">
            Here's an overview of your AI knowledge workspace.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.06 }}
          className="grid grid-cols-2 xl:grid-cols-4 gap-3"
        >
          <StatsCard
            title="Documents"
            value={stats?.totalDocuments ?? "—"}
            icon={FileText}
            color="default"
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
            value={stats?.totalChunks
              ? Number(stats.totalChunks).toLocaleString()
              : "—"}
            icon={Database}
            color="blue"
            loading={statsLoading}
            trend="Indexed in ChromaDB"
          />
          <StatsCard
            title="Storage Used"
            value={stats?.totalStorage ?? "—"}
            icon={HardDrive}
            color="default"
            loading={statsLoading}
            trend="Uploaded content"
          />
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.12 }}
        >
          <QuickActions />
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.18 }}
        >
          <RecentActivity />
        </motion.div>

      </div>
    </DashboardLayout>
  );
}

export default Dashboard;
