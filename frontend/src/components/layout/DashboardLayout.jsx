import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

/**
 * Root shell for all authenticated pages.
 * Sidebar (collapsible) | [Navbar + Page content]
 */
function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen overflow-hidden bg-[#0a0d14]">
      <Sidebar />

      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Navbar />

        <main className="flex-1 overflow-y-auto overflow-x-hidden p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
