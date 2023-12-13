import { Route } from "@tanstack/react-router"
import { About } from "@/pages/about";
import { rootRoute } from "@/main";

const AboutRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: About,
})
export default AboutRoute;