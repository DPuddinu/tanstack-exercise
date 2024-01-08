import { VehicleByIdRoute } from '@/routes/vehicles-route';

const Vehicle = () => {
  const vehicle = VehicleByIdRoute.useLoaderData();

  return <div>{`${vehicle?.vrm} - ${vehicle?.color} - ${vehicle?.fuel}`}</div>;
};

export default Vehicle;
