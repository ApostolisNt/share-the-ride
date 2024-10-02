import { z } from "zod";

// User schema
export const userSchema = z.object({
  _id: z.string(),
  allowed: z.array(z.string()).optional(),
  notAllowed: z.array(z.string()).optional(),
  rating: z.number().optional(),
  vehicleBrand: z.string().optional(),
  name: z.string().nonempty(),
  contact: z.object({
    phone: z.string().optional(),
    email: z.string().email(),
  }),
  driverInfo: z
    .object({
      yearsOfExperience: z.number().optional(),
      drivingLicense: z.string().optional(),
      language: z.string().optional(),
    })
    .optional(),
  userStatus: z.string().optional(),
});

// User schema inference type
export type User = z.infer<typeof userSchema>;
