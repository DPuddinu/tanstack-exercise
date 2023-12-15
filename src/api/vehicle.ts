import { queryOptions } from '@tanstack/react-query';
import axios from 'axios';

export type VehicleType = {
  id: string;
  name: string;
  type: string;
  fuel: string;
  color: string;
  vrm: string;
  manufacturer: string;
};

export type VehicleResponseType = {
  vehicles: VehicleType[];
};

export class VehicleNotFoundError extends Error {}

export const fetchVehicle = async (id: string) => {
  const vehicle = await axios
    .get<VehicleResponseType>('vehicles.json')
    .then((r) => {
      console.log(r.data);
      const found = r.data.vehicles.find((x: VehicleType) => x.id === id);
      console.log(found);
      return found;
    })
    .catch((err) => {
      console.error(err);
      if (err.response.status === 404) {
        throw new VehicleNotFoundError(`Vehicle with id "${id}" not found!`);
      }
      throw err;
    });

  return vehicle as VehicleType;
};

export const fetchVehicles = async () => {
  return axios
    .get<VehicleResponseType>('vehicles.json')
    .then((r) => r.data.vehicles);
};

export const vehiclesQueryOptions = queryOptions({
  queryKey: ['vehicles'],
  queryFn: () => fetchVehicles(),
});

export const vehicleQueryOptions = (id: string) =>
  queryOptions({
    queryKey: ['vehicles', { id }],
    queryFn: () => fetchVehicle(id),
  });
