import { z } from "zod";

// User schema
export const userSchema = z.object({
  _id: z.string(),
  allowed: z.array(z.string()).optional(),
  notAllowed: z.array(z.string()).optional(),
  rating: z.number().optional(),
  vehicleBrand: z.string().optional(),
  name: z.string().nonempty(),
  password: z.string(),
  contact: z.object({
    phone: z.string(),
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

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

export const signUpSchema = z
  .object({
    email: z.string().email({ message: "Invalid email address" }),
    name: z.string().nonempty(),
    phone: z.string(),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" }),
    confirmPassword: z.string().min(6, {
      message: "Confirm Password must be at least 6 characters long",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const signUpUserSchema = z.object({
  name: z.string().nonempty({ message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().nonempty({ message: "Phone is required" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

export type SignUpFormInputs = z.infer<typeof signUpSchema>;
export type LoginFormInputs = z.infer<typeof loginSchema>;

// User schema inference type
export type User = z.infer<typeof userSchema>;
