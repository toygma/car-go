import Loading from "@/components/custom/Loading";
import NotFound from "@/components/custom/NotFound";
import MainLayout from "@/layouts/MainLayout";
import React, { Suspense } from "react";
import ProtectedRoute from "./ProtectedRoute";
import PaymentMethod from "@/pages/payment/PaymentMethod";

const HomePage = React.lazy(() => import("@/pages/home/HomePage"));
const DetailsPage = React.lazy(() => import("@/pages/details/DetailsPage"));
const LoginPage = React.lazy(() => import("@/pages/auth/AuthPage"));
export const MainRoutes = {
  path: "/",
  element: <MainLayout />,
  errorElement: <NotFound />,
  children: [
    {
      path: "/",
      element: (
        <Suspense fallback={<Loading />}>
          <HomePage />
        </Suspense>
      ),
    },
    {
      path: "/car/details/:id",
      element: (
        <Suspense fallback={<Loading />}>
          <DetailsPage />
        </Suspense>
      ),
    },
    {
      path: "/auth",
      element: (
        <Suspense fallback={<Loading />}>
          <ProtectedRoute>
            <LoginPage />
          </ProtectedRoute>
        </Suspense>
      ),
    },
    {
      path: "/booking/:id/payment_method",
      element: (
        <Suspense fallback={<Loading />}>
          <PaymentMethod />
        </Suspense>
      ),
    },
  ],
};
