import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { PageLoader } from "../components/common/Loader";

// Lazy-load pages for code splitting
const Dashboard = lazy(() => import("../pages/Dashboard"));
const Chat      = lazy(() => import("../pages/Chat"));
const Documents = lazy(() => import("../pages/Documents"));
const Settings  = lazy(() => import("../pages/Settings"));
const NotFound  = lazy(() => import("../pages/NotFound"));

function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/"           element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard"  element={<Dashboard />} />
        <Route path="/chat"       element={<Chat />} />
        <Route path="/documents"  element={<Documents />} />
        <Route path="/settings"   element={<Settings />} />
        <Route path="*"           element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default AppRoutes;
