import { VehicleByIdRoute } from '@/routes/vehicles-route';

const Vehicle = () => {
  const vehicle = VehicleByIdRoute.useLoaderData();

  return <div>{vehicle.vrm}</div>;
};

export default Vehicle;
