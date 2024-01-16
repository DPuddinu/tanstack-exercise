import { faker } from '@faker-js/faker';
import { queryOptions } from '@tanstack/react-query';
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from 'firebase/firestore/lite';
import { db } from './firebase';
import { CreateVehicleSchema, VehicleType } from '@/types/vehicle';

export type VehicleResponseType = {
  vehicles: VehicleType[];
};

export class VehicleNotFoundError extends Error {}
export type CreateVehicleType = Omit<VehicleType, 'id'>;

export const createVehicle = async (vehicle: CreateVehicleType) => {
  const newVehicle: VehicleType = { id: faker.string.uuid(), ...vehicle };
  return await setDoc(doc(db, 'vehicles', newVehicle.id), newVehicle);
};

export const updateVehicle = async (vehicle: VehicleType) => {
  const ref = doc(db, 'vehicles', vehicle.id);
  return await updateDoc(ref, vehicle);
};
export const getVehicles = async () => {
  const data = (await getDocs(collection(db, 'vehicles'))).docs.map((doc) =>
    doc.data()
  );
  return CreateVehicleSchema.array().parse(data);
};
export const getVehicleById = async (id: string) => {
  const ref = doc(db, 'vehicles', id);
  return (await getDoc(ref)).data();
};
export const deleteVehicle = async (id: string) => {
  const ref = doc(db, 'vehicles', id);
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
