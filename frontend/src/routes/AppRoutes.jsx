import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "../pages/Dashboard";

function ComingSoon({ title }) {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center text-3xl">
      {title} (Coming Soon)
    </div>
  );
}

function AppRoutes() {
  return (
    <Routes>

      <Route path="/" element={<Navigate to="/dashboard" />} />

      <Route path="/dashboard" element={<Dashboard />} />

      <Route
        path="/chat"
        element={<ComingSoon title="AI Chat" />}
      />

      <Route
        path="/documents"
        element={<ComingSoon title="Documents" />}
      />

      <Route
        path="/settings"
        element={<ComingSoon title="Settings" />}
      />
      <Route
  path="/documents"
  element={<ComingSoon title="Documents" />}
/>

    </Routes>
  );
}

export default AppRoutes;