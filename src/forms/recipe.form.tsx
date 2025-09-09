"use client";

import { useState, useTransition } from "react";
import { Button, Form, Input, Select, SelectItem } from "@heroui/react";
import { useIngredientStore } from "@/store/ingredient.store";
import { useRecipeStore } from "@/store/recipe.store";
import { IRecipe } from "@/types/recipe";
import { useRouter } from "next/navigation";
import { useHeroToast } from "@/hooks/use-hero-toast";
import { UNIT_ABBREVIATIONS } from "@/constants/select-options";
import { getUnitLabel } from "@/utils/unit";

interface RecipeFormProps {
  initialRecipe?: IRecipe;
}

interface IIngredientField {
  id: number;
  ingredientId: string;
  quantity: number | null;
}

const initialState = {
  name: "",
  description: "",
  imageUrl: "",
};

const RecipeForm = ({ initialRecipe }: RecipeFormProps) => {
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: initialRecipe?.name || initialState.name,
    description: initialRecipe?.description || initialState.description,
    imageUrl: initialRecipe?.imageUrl || initialState.imageUrl,
  });

  const [ingredientFields, setIngredientFields] = useState<IIngredientField[]>(
    initialRecipe?.ingredients
      ? initialRecipe.ingredients.map((ing, index) => ({
          id: index,
          ingredientId: ing.ingredientId,
          quantity: ing.quantity,
        }))
      : [{ id: 0, ingredientId: "", quantity: null }]
  );

  const { ingredients } = useIngredientStore();
  const { addRecipe, updateRecipe } = useRecipeStore();
  const [isPending, startTransition] = useTransition();
  const { toast } = useHeroToast();
  const router = useRouter();

  const getIngredientUnit = (ingredientId: string) => {
    const ingredient = ingredients.find((ing) => ing.id === ingredientId);
    return ingredient?.unit || "";
  };

  const handleAddIngredientField = () => {
    if (ingredientFields.length < 10) {
      setIngredientFields([
        ...ingredientFields,
        { id: ingredientFields.length, ingredientId: "", quantity: null },
      ]);
    }
  };

  const handleRemoveIngredientField = (id: number) => {
    if (ingredientFields.length > 1) {
      setIngredientFields(ingredientFields.filter((field) => field.id !== id));
    }
  };

  const handleIngredientChange = (
    id: number,
    field: keyof IIngredientField,
    value: string | number | null
  ) => {
    setIngredientFields(
      ingredientFields.map((f) => (f.id === id ? { ...f, [field]: value } : f))
    );
  };

  const handleSubmit = async (formData: FormData) => {
    startTransition(async () => {
      setError(null);

      const result = initialRecipe
        ? await updateRecipe(initialRecipe.id, formData)
        : await addRecipe(formData);

      if (result.success) {
        toast(
          initialRecipe
            ? "Рецепт успешно отредактирован!"
            : "Рецепт успешно добавлен!",
          {
            toastType: "success",
          }
        );
        setIngredientFields([{ id: 0, ingredientId: "", quantity: null }]);
        router.push("/");
        setFormData(initialState);
      } else {
        toast(
          result.error ||
            (initialRecipe
              ? "Ошибка при редактировании рецепта!"
              : "Ошибка при добавлении рецепта!"),
          {
            toastType: "danger",
          }
        );
        setError(result.error || "Ошибка при сохранении рецепта");
      }
    });
  };

  return (
    <Form className="w-[600px] space-y-6" action={handleSubmit}>
      {error && <p className="mb-4 text-red-500">{error}</p>}

      <Input
        isRequired
        name="name"
        placeholder="Введите название рецепта"
        type="text"
        value={formData.name}
        classNames={{
          inputWrapper: "bg-default-100",
          input: "text-sm focus:outline-none",
        }}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />

      <Input
        name="description"
        placeholder="Введите описание (необязательно)"
        type="text"
        value={formData.description}
        classNames={{
          inputWrapper: "bg-default-100",
          input: "text-sm focus:outline-none",
        }}
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
      />

      <Input
        name="imageUrl"
        placeholder="URL изображения (необязательно)"
        type="url"
        value={formData.imageUrl}
        classNames={{
          inputWrapper: "bg-default-100",
          input: "text-sm focus:outline-none",
        }}
        onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
      />

      <div className="w-full space-y-4">
        <h3 className="text-lg font-semibold">Ингредиенты:</h3>

        {ingredientFields.map((field, index) => {
          const selectedUnit = getUnitLabel(
            getIngredientUnit(field.ingredientId),
            UNIT_ABBREVIATIONS
          );

          return (
            <div
              key={field.id}
              className="flex items-end gap-3 p-4 rounded-lg bg-gray-50"
            >
              <div className="flex-1">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Ингредиент {index + 1}
                </label>
                <Select
                  isRequired
                  name={`ingredient_${index}`}
                  placeholder="Выберите ингредиент"
                  selectedKeys={field.ingredientId ? [field.ingredientId] : []}
                  classNames={{
                    trigger: "bg-white w-full",
                  }}
                  onChange={(e) =>
                    handleIngredientChange(
                      field.id,
                      "ingredientId",
                      e.target.value
                    )
                  }
                >
                  {ingredients.map((ingredient) => (
                    <SelectItem key={ingredient.id} textValue={ingredient.name}>
                      {ingredient.name} (
                      {getUnitLabel(ingredient.unit, UNIT_ABBREVIATIONS)})
                    </SelectItem>
                  ))}
                </Select>
              </div>

              <div className="flex-1">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Количество
                </label>
                <div className="relative">
                  <Input
                    isRequired
                    name={`quantity_${index}`}
                    placeholder="0"
                    type="number"
                    step="0.1"
                    min="0"
                    value={
                      field.quantity !== null ? field.quantity.toString() : ""
                    }
                    classNames={{
                      inputWrapper: "bg-white pr-20",
                      input: "text-sm",
                    }}
                    onChange={(e) =>
                      handleIngredientChange(
                        field.id,
                        "quantity",
                        e.target.value ? parseFloat(e.target.value) : null
                      )
                    }
                  />

                  {field.ingredientId && (
                    <span className="absolute px-2 py-1 text-sm font-medium text-gray-500 transform -translate-y-1/2 bg-gray-100 rounded right-3 top-1/2">
                      {selectedUnit}
                    </span>
                  )}
                </div>
              </div>

              {ingredientFields.length > 1 && (
                <Button
                  color="danger"
                  variant="flat"
                  size="sm"
                  onPress={() => handleRemoveIngredientField(field.id)}
                  className="mb-1"
                  isIconOnly
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </Button>
              )}
            </div>
          );
        })}

        {ingredientFields.length < 10 && (
          <Button
            color="primary"
            variant="flat"
            onPress={handleAddIngredientField}
            startContent={
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            }
          >
            Добавить ингредиент
          </Button>
        )}
      </div>

      <div className="flex items-center justify-end w-full mt-8 text-white">
        <Button color="primary" type="submit" isLoading={isPending} size="lg">
          {initialRecipe ? "Сохранить изменения" : "Добавить рецепт"}
        </Button>
      </div>
    </Form>
  );
};

export default RecipeForm;
