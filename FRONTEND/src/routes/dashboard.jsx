import { createRoute } from "@tanstack/react-router"
import { rootRoute } from "./rootRoute.jsx"
import {DashboardPage} from "../pages/DashboardPage"
import { checkAuth } from "../utils/helper"

export const dashboardRoute = createRoute({
    getParentRoute: () => rootRoute,
    path:'/dashboard',
    component: DashboardPage,
    beforeLoad: checkAuth,
})