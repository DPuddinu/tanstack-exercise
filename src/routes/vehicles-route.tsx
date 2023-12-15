import { vehicleQueryOptions, vehiclesQueryOptions } from '@/api/vehicle';
import { rootRoute } from '@/main';
import { Route, lazyRouteComponent } from '@tanstack/react-router';

const VehiclesRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/vehicles',
  component: lazyRouteComponent(() => import('@/pages/vehicles')),
  pendingComponent: () => <div>loading vehicles...</div>,
  errorComponent: () => <div>error loading vehicles!</div>,
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(vehiclesQueryOptions),
});

const VehicleByIdRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/vehicle/$id',
  component: lazyRouteComponent(() => import('@/pages/vehicle')),
  pendingComponent: () => <div>loading vehicle...</div>,
  errorComponent: () => <div>error loading vehicle!</div>,
  loader: ({ context: { queryClient }, params: { id } }) =>
    queryClient.ensureQueryData(vehicleQueryOptions(id)),
});

export { VehiclesRoute, VehicleByIdRoute };
