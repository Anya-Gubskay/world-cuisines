import { UnitOption } from "@/types/unit";

export const CATEGORY_OPTIONS = [
  { value: "VEGETABLES", label: "Овощи" },
  { value: "FRUITS", label: "Фрукты" },
  { value: "MEAT", label: "Мясо" },
  { value: "DAIRY", label: "Молочные" },
  { value: "SPICES", label: "Специи" },
  { value: "OTHER", label: "Другое" },
] as const;

export const UNIT_OPTIONS: UnitOption[] = [
  { value: "GRAMS", label: "Граммы" },
  { value: "KILOGRAMS", label: "Килограммы" },
  { value: "LITERS", label: "Литры" },
  { value: "MILLILITERS", label: "Миллилитры" },
  { value: "PIECES", label: "Штуки" },
] as const;

export const UNIT_ABBREVIATIONS: UnitOption[] = [
  { value: "GRAMS", label: "г" },
  { value: "KILOGRAMS", label: "кг" },
  { value: "LITERS", label: "л" },
  { value: "MILLILITERS", label: "мл" },
  { value: "PIECES", label: "шт" },
] as const;
