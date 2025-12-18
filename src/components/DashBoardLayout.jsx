import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function DashboardLayout({ onLogout, role }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar role={role} onLogout={onLogout} />
      <main className="flex-1 p-6 bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
}
