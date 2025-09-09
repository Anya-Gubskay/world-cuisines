"use client";

import { IRecipe } from "@/types/recipe";
import { Card, CardBody, CardHeader, Button } from "@heroui/react";
import { useRecipeStore } from "@/store/recipe.store";
import Link from "next/link";
import { useTransition } from "react";
import Image from "next/image";
import { UNIT_ABBREVIATIONS } from "@/constants/select-options";
import { useAuthStore } from "@/store/auth.store";
import { useHeroToast } from "@/hooks/use-hero-toast";
import { getUnitLabel } from "@/utils/unit";

interface RecipeCardProps {
  recipe: IRecipe;
}

const RecipeCard = ({ recipe }: RecipeCardProps) => {
  const { removeRecipe } = useRecipeStore();
  const { isAuth } = useAuthStore();
  const [isPending, startTransition] = useTransition();
  const { toast } = useHeroToast();

  const handleDelete = () => {
    startTransition(async () => {
      try {
        await removeRecipe(recipe.id);
        toast("Рецепт успешно удален!", {
          toastType: "success",
          description: "",
        });
      } catch (error) {
        toast("Ошибка при удалении рецепта!", {
          toastType: "danger",
          description: "",
        });
        console.error("Ошибка при удалении рецепта:", error);
      }
    });
  };

  return (
    <Card className="w-full min-w-[254px] max-w-md h-[480px] flex flex-col">
      <div className="h-48 overflow-hidden">
        {recipe.imageUrl ? (
          <div className="relative h-48 overflow-hidden transition-all bg-white border border-gray-200 rounded-lg shadow-md group hover:shadow-lg">
            <Image
              src={recipe.imageUrl}
              alt="Image for recipe"
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        ) : (
          <div className="flex items-center justify-center w-full h-full bg-gray-200">
            <span className="text-gray-500">Нет изображения</span>
          </div>
        )}
      </div>

      <CardHeader className="flex items-center justify-between text-black">
        <h2 className="text-xl font-bold">{recipe.name}</h2>
      </CardHeader>

      <CardBody className="flex-1 text-black">
        <p className="text-gray-600 line-clamp-6">
          {recipe.description || "Без описания"}
        </p>
        <h3 className="mt-4 font-semibold">Ингредиенты:</h3>
        <ul className="pl-5 overflow-y-auto list-disc max-h-24">
          {recipe.ingredients.map((ing) => (
            <li key={ing.id}>
              {ing.ingredient.name}: {ing.quantity}{" "}
              {getUnitLabel(ing.ingredient.unit, UNIT_ABBREVIATIONS)}
            </li>
          ))}
        </ul>
      </CardBody>

      {isAuth && (
        <div className="px-4 pt-2 pb-4 mt-auto">
          <div className="flex items-center justify-between gap-2">
            <Link href={`/recipes/${recipe.id}`} className="flex-1">
              <Button
                color="primary"
                variant="solid"
                size="sm"
                className="text-white "
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
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                }
              >
                Редактировать
              </Button>
            </Link>
            <Button
              color="danger"
              variant="flat"
              size="sm"
              onPress={handleDelete}
              isLoading={isPending}
              className="min-w-20"
              startContent={
                !isPending && (
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
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                )
              }
            >
              {isPending ? "Удаление..." : "Удалить"}
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
};

export default RecipeCard;
