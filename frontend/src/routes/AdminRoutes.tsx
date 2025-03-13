import { Suspense } from "react";
import Loading from "@/components/custom/Loading";
import NotFound from "@/components/custom/NotFound";
import AdminLayout from "@/layouts/AdminLayout";
import Dashboard from "@/pages/admin/Dashboard";
import ListCars from "@/pages/admin/car/ListCars";
import NewCars from "@/pages/admin/car/create/NewCars";

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
    {
      path: "cars",
      element: (
        <Suspense>
          <ListCars />
        </Suspense>
      ),
    },
    {
      path: "cars/new",
      element: (
        <Suspense>
          <NewCars />
        </Suspense>
      ),
    },
  ],
};
