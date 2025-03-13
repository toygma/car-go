import { createBrowserRouter } from "react-router-dom";
import { MainRoutes } from "./MainRoutes";
import { UserRoutes } from "./UserRoutes";
import { AdminRoutes } from "./AdminRoutes";

export const router =  createBrowserRouter([
    MainRoutes,
    UserRoutes,
    AdminRoutes
])