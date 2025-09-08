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

  if (isLoading) return <Spinner variant="gradient" color="warning" />;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  if (hasSearched && !recipe) {
    return <p className="text-center text-red-500">Рецепт не найден</p>;
  }

  if (recipe) {
    return (
      <div className="container p-4 mx-auto">
        <h1 className="mb-4 text-3xl font-bold">
          Редактировать рецепт: {recipe.name}
        </h1>
        <RecipeForm initialRecipe={recipe} />
      </div>
    );
  }

  return <Spinner color="primary" variant="gradient" />;
};

export default EditRecipePage;
