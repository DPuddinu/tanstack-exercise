import { z } from 'zod';

export const CreateVehicleSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  type: z.string(),
  fuel: z.string(),
  color: z.string(),
  vrm: z.string(),
  manufacturer: z.string(),
});

export type CreateVehicleType = z.infer<typeof CreateVehicleSchema>;
export type VehicleType = {
  id: string;
} & CreateVehicleType;
//  & (Omit<CreateVehicleType, 'id'>);
