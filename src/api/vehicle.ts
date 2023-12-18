import { queryOptions } from '@tanstack/react-query';
import axios from 'axios';
import { db } from './firebase';
import { collection, deleteDoc, doc, getDoc, getDocs, setDoc, updateDoc } from 'firebase/firestore/lite';

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

export const createVehicle = async (vehicle: VehicleType) => {
  return await setDoc(doc(db, 'vehicles', vehicle.id), vehicle);
};

export const updateVehicle = async (vehicle: VehicleType) => {
  const ref = doc(db, 'vehicles', vehicle.id);
  return await updateDoc(ref, vehicle);
};
export const getVehicles = async () => {
  return (await getDocs(collection(db, 'vehicles'))).docs.map((doc) => doc.data());
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
