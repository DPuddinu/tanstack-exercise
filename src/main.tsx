import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import {
  Link,
  Outlet,
  Router,
  RouterProvider,
  rootRouteWithContext,
} from '@tanstack/react-router';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from './components/providers/theme-provider.tsx';

import './index.css';
import AboutRoute from './routes/about-route.tsx';
import IndexRoute from './routes/home-route.tsx';
import { PostByIdRoute, PostRoute } from './routes/posts-route.tsx';
import { VehicleByIdRoute, VehiclesRoute } from './routes/vehicles-route.tsx';
import { Toaster } from './components/primitives/ui/sonner.tsx';

export const queryClient = new QueryClient();

export const rootRoute = rootRouteWithContext<{ queryClient: QueryClient }>()({
  component: () => (
    <div className='h-full flex flex-col'>
      <div className='p-2 flex gap-2'>
        <Link to='/' className='[&.active]:font-bold'>
          Home
        </Link>
        <Link to='/about' className='[&.active]:font-bold'>
          About
        </Link>
        <Link to='/posts' className='[&.active]:font-bold'>
          Posts
        </Link>
        <Link to='/vehicles' className='[&.active]:font-bold'>
          Vehicles
        </Link>
      </div>
      <hr />
      <div className='p-2 grow'>
        <Outlet />
        <Toaster />
      </div>
      <ReactQueryDevtools buttonPosition='top-right' />
    </div>
  ),
});

const routeTree = rootRoute.addChildren([
  IndexRoute,
  AboutRoute,
  PostByIdRoute,
  PostRoute,
  VehiclesRoute,
  VehicleByIdRoute,
]);

export const router = new Router({
  routeTree: routeTree,
  defaultPreload: 'intent',
  context: { queryClient: queryClient },
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>
);
