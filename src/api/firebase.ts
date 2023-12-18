import { initializeApp } from "firebase/app";
import { collection, deleteDoc, doc, getDoc, getDocs, getFirestore, setDoc, updateDoc } from 'firebase/firestore/lite';
import { VehicleType } from "./vehicle";

const firebaseConfig = {
  apiKey: import.meta.env.FIREBASE_API_KEY,
  authDomain: "tanstack-test.firebaseapp.com",
  projectId: "tanstack-test",
  storageBucket: "tanstack-test.appspot.com",
  messagingSenderId: import.meta.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.FIREBASE_APP_ID
};

export const firebaseApp = initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

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
