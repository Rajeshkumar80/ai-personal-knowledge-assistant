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
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h1 className="text-2xl font-bold text-slate-100">
            {greeting} 👋
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Here's an overview of your AI knowledge workspace.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.08 }}
          className="grid grid-cols-2 xl:grid-cols-4 gap-4"
        >
          <StatsCard
            title="Documents"
            value={stats?.totalDocuments ?? "—"}
            icon={FileText}
            color="indigo"
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
            color="purple"
            loading={statsLoading}
            trend="Indexed in ChromaDB"
          />
          <StatsCard
            title="Storage Used"
            value={stats?.totalStorage ?? "—"}
            icon={HardDrive}
            color="blue"
            loading={statsLoading}
            trend="Uploaded content"
          />
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.14 }}
        >
          <QuickActions />
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <RecentActivity />
        </motion.div>

      </div>
    </DashboardLayout>
  );
}

export default Dashboard;
