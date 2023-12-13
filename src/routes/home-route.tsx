import { rootRoute } from "@/main"
import { HomePage } from "@/pages/home"
import { Route } from "@tanstack/react-router"

const IndexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
})

export default IndexRoute