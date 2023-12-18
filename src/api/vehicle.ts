import { queryOptions } from '@tanstack/react-query';
import axios from 'axios';
import { collection, doc, getDocs, setDoc, updateDoc, deleteDoc } from 'firebase/firestore/lite';
import { db } from './firebase';

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

export class VehicleNotFoundError extends Error { }

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
  const vehicles = collection(db, 'vehicles');
  const vehicleSnapshot = await getDocs(vehicles);
  const vehicleList = vehicleSnapshot.docs.map(doc => doc.data());
  return vehicleList;
};

export const createVehicle = async (vehicle: VehicleType) => {
  return await setDoc(doc(db, "vehicles", vehicle.id), vehicle);
};
export const updateVehicle = async (vehicle: VehicleType) => {
  const ref = doc(db, "vehicles", vehicle.id);
  return await updateDoc(ref, vehicle);
};
export const getVehicles = async () => {
  return await getDocs(collection(db, "vehicles"))
}
export const getVehicleById = async (id: string) => {
  return await getDocs(collection(db, "vehicles", id))
}
export const deleteVehicle = async (id: string) => {
  const ref = doc(db, "vehicles", id);
  return await deleteDoc(ref);
};

export const vehiclesQueryOptions = queryOptions({
  queryKey: ['vehicles'],
  queryFn: () => getVehicles(),
});

export const vehicleQueryOptions = (id: string) =>
  queryOptions({
    queryKey: ['vehicles', { id }],
    queryFn: () => getVehicleById(id),
  });
