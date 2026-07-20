import DashboardLayout from "../components/layout/DashboardLayout";

import StatsCard from "../components/dashboard/StatsCard";
import QuickActions from "../components/dashboard/QuickActions";
import RecentActivity from "../components/dashboard/RecentActivity";

import {
  FileText,
  MessageSquare,
  Database,
} from "lucide-react";

function Dashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-8">

        <div>
          <h1 className="text-4xl font-bold">
            Welcome Back 👋
          </h1>

          <p className="text-slate-400 mt-2">
            Here's an overview of your AI workspace.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">

          <StatsCard
            title="Documents"
            value="12"
            icon={<FileText size={36} />}
          />

          <StatsCard
            title="AI Chats"
            value="56"
            icon={<MessageSquare size={36} />}
          />

          <StatsCard
            title="Vector Chunks"
            value="1,248"
            icon={<Database size={36} />}
          />

        </div>

        <QuickActions />

        <RecentActivity />

      </div>
    </DashboardLayout>
  );
}

export default Dashboard;