import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Menu } from "lucide-react";
import Sidebar from "./Sidebar";

/**
 * Wraps all authenticated dashboard pages. Nest routes under this in
 * App.jsx the same way the marketing pages are nested under the existing
 * <Layout /> (Navbar + Footer) — e.g.:
 *
 *   <Route element={<ProtectedRoute />}>
 *     <Route element={<DashboardLayout />}>
 *       <Route path="/dashboard" element={<ClientDashboard />} />
 *       <Route path="/sessions" element={<Sessions />} />
 *       ...
 *     </Route>
 *   </Route>
 */

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-surface-container-low bg-noise">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 min-w-0">
        {/* Mobile top bar */}
        <div className="md:hidden sticky top-0 z-30 h-16 bg-surface-container-lowest border-b border-surface-variant flex items-center px-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 text-on-surface"
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>
          <span className="ml-2 text-[17px] font-['Fraunces',serif] font-semibold text-primary">
            Inner Balance
          </span>
        </div>

        <Outlet />
      </div>
    </div>
  );
}
