import z from "zod";

export const restaurantSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  address: z.string().min(5, 'Address must be at least 5 characters').max(255),
  contactInfo: z
    .string()
    .min(7, 'Contact number is too short')
    .max(15, 'Contact number is too long')
    .regex(/^[+]?[\d\s\-().]+$/, 'Enter a valid phone number'),
  img: z.string().optional(),
});

export type RestaurantFormValues = z.infer<typeof restaurantSchema>;