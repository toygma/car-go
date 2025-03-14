import { lazy, Suspense } from "react";
import Loading from "@/components/custom/Loading";
import NotFound from "@/components/custom/NotFound";

const Profile = lazy(() => import("@/pages/users/profile/Profile"));
const MyBookings = lazy(() => import("@/pages/bookings/MyBookings"));
const Invoice = lazy(() => import("@/pages/invoice/Invoice"));
const UserLayout = lazy(() => import("@/layouts/UserLayout"));

export const UserRoutes = {
  path: "/me",
  element: (
    <Suspense
      fallback={
        <div>
          <Loading fullScreen={true} />
        </div>
      }
    >
      <UserLayout />
    </Suspense>
  ),
  errorElement: <NotFound />,
  children: [
    {
      path: "profile",
      element: (
        <Suspense>
          <Profile />
        </Suspense>
      ),
    },
    {
      path: "bookings",
      element: (
        <Suspense>
          <MyBookings />
        </Suspense>
      ),
    },
    {
      path: "bookings/invoice/:id",
      element: (
        <Suspense>
          <Invoice />
        </Suspense>
      ),
    },
  ],
};
