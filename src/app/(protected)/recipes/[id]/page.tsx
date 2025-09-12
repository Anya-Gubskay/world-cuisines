"use client";

import RecipeForm from "@/forms/recipe.form";
import { useRecipeStore } from "@/store/recipe.store";
import { IRecipe } from "@/types/recipe";
import { Spinner } from "@heroui/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const EditRecipePage = () => {
  const { id } = useParams<{ id: string }>();
  const { recipes, isLoading, error } = useRecipeStore();
  const [recipe, setRecipe] = useState<IRecipe | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (recipes.length > 0 || error) {
      const foundRecipe = recipes.find((r) => r.id === id);
      setRecipe(foundRecipe || null);
      setHasSearched(true);
    }
  }, [recipes, id, error]);

  if (isLoading)
    return (
      <Spinner
        className="absolute left-1/2 top-1/2"
        variant="gradient"
        color="warning"
      />
    );
  if (error) return <p className="text-center text-red-500">{error}</p>;

  if (hasSearched && !recipe) {
    return <p className="text-center text-red-500">Рецепт не найден</p>;
  }

  if (recipe) {
    return (
      <div className="container p-4 mx-auto">
        <h1 className="px-4 mb-4 text-2xl font-bold text-center sm:text-3xl sm:text-left sm:px-0">
          Редактировать рецепт: {recipe.name}
        </h1>
        <RecipeForm initialRecipe={recipe} />
      </div>
    );
  }
};

export default EditRecipePage;
