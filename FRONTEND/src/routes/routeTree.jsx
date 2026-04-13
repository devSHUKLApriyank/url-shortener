import { createRouter } from "@tanstack/react-router"
import { authRoute } from "./auth.route.jsx"
import { dashboardRoute } from "./dashboard.jsx"
import { homeRoute } from "./homepage.jsx"
import { rootRoute } from "./rootRoute.jsx"
import { landingRoute } from "./landing.jsx"


const routeTree = rootRoute.addChildren([
 landingRoute, homeRoute, authRoute, dashboardRoute
])

export const router = createRouter({ 
  routeTree,
  context: {
    queryClient: undefined,  
    store: undefined,
  }
})