import { lazy, Suspense } from "react";
import { AdminProtectedRoute } from "./ProtectedRoute";
import Loading from "@/components/custom/Loading";
import NotFound from "@/components/custom/NotFound";

const Dashboard = lazy(() => import("@/pages/admin/car/dashboard/Dashboard"));
const ListCars = lazy(() => import("@/pages/admin/car/listCars/ListCars"));
const NewCars = lazy(() => import("@/pages/admin/car/create/NewCars"));
const UpdateCar = lazy(() => import("@/pages/admin/car/updateCar/UpdateCar"));
const AdminLayout = lazy(() => import("@/layouts/AdminLayout"));
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
