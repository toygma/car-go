import { Suspense } from "react";
import Loading from "@/components/custom/Loading";
import NotFound from "@/components/custom/NotFound";
import AdminLayout from "@/layouts/AdminLayout";
import Dashboard from "@/pages/admin/Dashboard";


export const AdminRoutes = {
  path: "/admin",
  element: (
    <Suspense
      fallback={
        <div>
          <Loading fullScreen={true} />
        </div>
      }
    >
      <AdminLayout />
    </Suspense>
  ),
  errorElement: <NotFound />,
  children: [
    {
      path: "dashboard",
      element: (
        <Suspense>
          <Dashboard />
        </Suspense>
      ),
    },
  ],
};
