import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen overflow-hidden bg-base">
      <Sidebar />

      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Navbar />

        <main className="flex-1 overflow-y-auto overflow-x-hidden p-5 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
