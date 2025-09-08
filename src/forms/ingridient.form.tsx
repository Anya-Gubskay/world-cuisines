"use client";

import { CATEGORY_OPTIONS, UNIT_OPTIONS } from "@/constants/select-options";
import { useIngredientStore } from "@/store/ingredient.store";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { Button, Select, SelectItem } from "@heroui/react";
import { useState, useTransition } from "react";

const initialState = {
  name: "",
  category: "",
  unit: "",
  pricePerUnit: null as number | null,
  description: "",
};

const IngridientForm = () => {
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState(initialState);
  const { addIngredient } = useIngredientStore();

  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (formData: FormData) => {
    startTransition(async () => {
      await addIngredient(formData);
      const storeError = useIngredientStore.getState().error;

      if (storeError) {
        setError(storeError);
      } else {
        setError(null);
        setFormData(initialState);
      }
    });
  };

  return (
    <Form className="w-full" action={handleSubmit}>
      {error && <p className="mb-4 text-red-500">{error}</p>}

      <Input
        isRequired
        name="name"
        placeholder="Введите название ингредиента"
        type="text"
        value={formData.name}
        classNames={{
          innerWrapper: "bg-default-100",
          input: "text-sm focus:outline-none",
          helperWrapper: "!p-0 !m-0 !min-h-0",
          errorMessage: "absolute top-full mt-1 ml-1",
        }}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        validate={(value) => {
          if (!value) return "Название обязателньо";
          return null;
        }}
      />

      <div className="flex w-full gap-2">
        <div className="w-1/3">
          <Select
            isRequired
            name="category"
            placeholder="Категории"
            selectedKeys={formData.category ? [formData.category] : []}
            classNames={{
              trigger: "bg-default-100 w-full",
              innerWrapper: "bg-default-100",
              value: "truncate",
              selectorIcon: "text-black",
              helperWrapper: "!p-0 !m-0 !min-h-0",
              errorMessage: "absolute top-full mt-1 ml-1",
            }}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
            {CATEGORY_OPTIONS.map((option) => (
              <SelectItem key={option.value} className="text-black">
                {option.label}
              </SelectItem>
            ))}
          </Select>
        </div>
        <div className="w-1/3">
          <Select
            isRequired
            name="unit"
            placeholder="Ед. изм."
            selectedKeys={formData.unit ? [formData.unit] : []}
            classNames={{
              trigger: "bg-default-100 w-full",
              innerWrapper: "text-sm",
              value: "truncate",
              selectorIcon: "text-black",
              helperWrapper: "!p-0 !m-0 !min-h-0",
              errorMessage: "absolute top-full mt-1 ml-1",
            }}
            onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
          >
            {UNIT_OPTIONS.map((option) => (
              <SelectItem key={option.value} className="text-black">
                {option.label}
              </SelectItem>
            ))}
          </Select>
        </div>
        <div className="w-1/3">
          <Input
            isRequired
            name="pricePerUnit"
            placeholder="Цена"
            type="number"
            value={
              formData.pricePerUnit !== null
                ? formData.pricePerUnit.toString()
                : ""
            }
            classNames={{
              innerWrapper: "bg-default-100",
              input: "text-sm focus:outline-none",
              helperWrapper: "!p-0 !m-0 !min-h-0",
              errorMessage: "absolute top-full mt-1 ml-1",
            }}
            onChange={(e) => {
              const value = e.target.value ? parseFloat(e.target.value) : null;
              setFormData({ ...formData, pricePerUnit: value });
            }}
            endContent={
              <span className="absolute transform -translate-y-1/2 pointer-events-none right-3 top-1/2 text-default-500">
                руб.
              </span>
            }
            validate={(value) => {
              if (!value) return "Цена обязательна";
              const num = parseFloat(value);
              if (isNaN(num) || num < 0) {
                return "Цена должна быть положительной";
              }
              return null;
            }}
          />
        </div>
      </div>

      <Input
        name="description"
        placeholder="Введите описание (необязательно)"
        type="text"
        value={formData.description}
        classNames={{
          inputWrapper: "bg-default-100",
          input: "text-sm focus:outline-none",
          helperWrapper: "!p-0 !m-0 !min-h-0",
          errorMessage: "absolute top-full mt-1 ml-1",
        }}
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
      />

      <div className="flex items-center justify-end w-full">
        <Button
          className="text-white bg-orange-400"
          type="submit"
          isLoading={isPending}
        >
          Добавить ингредиента
        </Button>
      </div>
    </Form>
  );
};

export default IngridientForm;
