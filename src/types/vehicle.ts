import { z } from "zod";

export const VehicleSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.string(),
  fuel: z.string(),
  color: z.string(),
  vrm: z.string(),
  manufacturer: z.string()
});

export type VehicleType = z.infer<typeof VehicleSchema>
