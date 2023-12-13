import { postQueryOptions, postsQueryOptions } from "@/api/posts"
import { rootRoute } from "@/main"
import { Route, lazyRouteComponent } from "@tanstack/react-router"

const PostRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/posts',
  component: lazyRouteComponent(() => import('@/pages/posts')),
  pendingComponent: () => <div>loading posts...</div>,
  errorComponent: () => <div>error loading posts!</div>,
  loader: ({ context: { queryClient } }) => queryClient.ensureQueryData(postsQueryOptions)
})

const PostByIdRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/posts/$id',
  component: lazyRouteComponent(() => import('@/pages/post')),
  pendingComponent: () => <div>loading posts...</div>,
  errorComponent: () => <div>error loading posts!</div>,
  loader: ({ context: { queryClient }, params: { id } }) => queryClient.ensureQueryData(postQueryOptions(id)),
})

export { PostByIdRoute, PostRoute }
