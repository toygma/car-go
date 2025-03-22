import { lazy, Suspense } from "react";
import { AdminProtectedRoute } from "./ProtectedRoute";
import Loading from "@/components/custom/Loading";
import NotFound from "@/components/custom/NotFound";
import ListBookings from "@/pages/admin/bookings/ListBookings";
import ListUsers from "@/pages/admin/users/ListUsers";
import ListReviews from "@/pages/admin/reviews/ListReviews";
import ListFaqs from "@/pages/admin/faq/ListFaqs";
import ListCoupons from "@/pages/admin/coupon/ListCoupons";

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
    {
      path: "bookings",
      element: (
        <Suspense>
          <ListBookings />
        </Suspense>
      ),
    },
    {
      path: "users",
      element: (
        <Suspense>
          <ListUsers />
        </Suspense>
      ),
    },
    {
      path: "reviews",
      element: (
        <Suspense>
          <ListReviews />
        </Suspense>
      ),
    },
    {
      path: "faqs",
      element: (
        <Suspense>
          <ListFaqs />
        </Suspense>
      ),
    },
    {
      path: "coupons/:id",
      element: (
        <Suspense>
          <ListCoupons />
        </Suspense>
      ),
    },
  ],
};
