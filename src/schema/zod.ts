import { object, string, email, number } from "zod";
import { z } from "zod";

export const signInSchema = object({
  email: string({ message: "Email is required" })
    .min(1, "Email is required")
    .and(email({ message: "Invalid email" })), // ← Ключевое изменение

  password: string({ message: "Password is required" })
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(32, "Password must be less than 32 characters"),
});

export const ingredientSchema = object({
  name: string().min(1, "Название обязательно"),
  category: z.enum([
    "VEGETABLES",
    "FRUITS",
    "MEAT",
    "DAIRY",
    "SPICES",
    "OTHER",
  ]),
  unit: z.enum(["GRAMS", "KILOGRAMS", "LITERS", "MILLILITERS", "PIECES"]),
  pricePerUnit: number({ message: "Цена должна быть числом" })
    .min(0, "Цена должна быть положительной")
    .nullable(),
  description: z.string().optional(),
});
