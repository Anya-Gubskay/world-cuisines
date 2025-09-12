"use client";

import { CATEGORY_OPTIONS, UNIT_OPTIONS } from "@/constants/select-options";
import { useIngredientStore } from "@/store/ingredient.store";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { Button, Select, SelectItem, Card, CardBody } from "@heroui/react";
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
    <Card className="w-full shadow-sm">
      <CardBody className="p-4 sm:p-6">
        <h2 className="mb-4 text-lg font-semibold text-gray-800 sm:mb-6 sm:text-xl">
          Добавить ингредиент
        </h2>

        <Form className="w-full space-y-4" action={handleSubmit}>
          {error && (
            <p className="p-2 text-sm text-red-500 rounded-md bg-red-50">
              {error}
            </p>
          )}

          <Input
            isRequired
            name="name"
            placeholder="Название ингредиента"
            type="text"
            value={formData.name}
            classNames={{
              inputWrapper: "bg-default-100 h-12",
              input: "text-sm text-gray-800 placeholder:text-gray-500",
            }}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            validate={(value) => {
              if (!value) return "Название обязательно";
              return null;
            }}
          />

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
            <Select
              isRequired
              name="category"
              placeholder="Категория"
              selectedKeys={formData.category ? [formData.category] : []}
              classNames={{
                trigger: "bg-default-100 h-12 data-[hover=true]:bg-default-200",
                value: "text-sm text-gray-800 placeholder:text-gray-500",
                selectorIcon: "text-gray-600",
              }}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
            >
              {CATEGORY_OPTIONS.map((option) => (
                <SelectItem
                  key={option.value}
                  textValue={option.label}
                  className="text-gray-800"
                >
                  {option.label}
                </SelectItem>
              ))}
            </Select>

            <Select
              isRequired
              name="unit"
              placeholder="Ед. измерения"
              selectedKeys={formData.unit ? [formData.unit] : []}
              classNames={{
                trigger: "bg-default-100 h-12 data-[hover=true]:bg-default-200",
                value: "text-sm text-gray-800 placeholder:text-gray-500",
                selectorIcon: "text-gray-600",
              }}
              onChange={(e) =>
                setFormData({ ...formData, unit: e.target.value })
              }
            >
              {UNIT_OPTIONS.map((option) => (
                <SelectItem
                  key={option.value}
                  textValue={option.label}
                  className="text-gray-800"
                >
                  {option.label}
                </SelectItem>
              ))}
            </Select>
            <Input
              isRequired
              name="pricePerUnit"
              placeholder="Цена за единицу"
              type="number"
              step="0.01"
              min="0"
              value={formData.pricePerUnit?.toString() || ""}
              classNames={{
                inputWrapper:
                  "bg-default-100 h-12 pr-12 data-[hover=true]:bg-default-200",
                input: "text-sm text-gray-800 placeholder:text-gray-500",
              }}
              onChange={(e) => {
                const value = e.target.value
                  ? parseFloat(e.target.value)
                  : null;
                setFormData({ ...formData, pricePerUnit: value });
              }}
              endContent={<span className="text-sm text-gray-600">₽</span>}
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

          <Input
            name="description"
            placeholder="Описание (необязательно)"
            type="text"
            value={formData.description}
            classNames={{
              inputWrapper:
                "bg-default-100 h-12 data-[hover=true]:bg-default-200",
              input: "text-sm text-gray-800 placeholder:text-gray-500",
            }}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />

          <Button
            className="w-full text-white bg-orange-500 hover:bg-orange-600"
            type="submit"
            isLoading={isPending}
            size="lg"
          >
            Добавить ингредиент
          </Button>
        </Form>
      </CardBody>
    </Card>
  );
};

export default IngridientForm;
