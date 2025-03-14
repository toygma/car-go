import { Suspense } from "react";
import Loading from "@/components/custom/Loading";
import NotFound from "@/components/custom/NotFound";
import AdminLayout from "@/layouts/AdminLayout";
import Dashboard from "@/pages/admin/car/dashboard/Dashboard";
import ListCars from "@/pages/admin/car/listCars/ListCars";
import NewCars from "@/pages/admin/car/create/NewCars";
import UpdateCar from "@/pages/admin/car/updateCar/UpdateCar";
import { AdminProtectedRoute } from "./ProtectedRoute";

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
      <AdminProtectedRoute role={["admin"]}>
        {" "}
        <AdminLayout />
      </AdminProtectedRoute>
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
    {
      path: "cars/new/:id",
      element: (
        <Suspense>
          <UpdateCar />
        </Suspense>
      ),
    },
  ],
};
