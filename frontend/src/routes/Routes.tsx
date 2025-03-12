import { createBrowserRouter } from "react-router-dom";
import { MainRoutes } from "./MainRoutes";
import { UserRoutes } from "./UserRoutes";

export const router =  createBrowserRouter([
    MainRoutes,
    UserRoutes
])