import { Outlet } from "react-router-dom";
import Sidebar from "@/pages/admin/sidebar/Sidebar";
import { MobileSideBar } from "@/pages/admin/sidebar/MobileSideBar";

const AdminLayout = () => {
  return (
    <div className="grid min-h-screen w-full mds:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 mds:block">
        <Sidebar />
      </div>
      <div className="block  mds:hidden absolute p-4">
        <MobileSideBar />
      </div>
      <div className="w-full mt-32">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
