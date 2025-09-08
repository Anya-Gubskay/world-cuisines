"use client";

import RecipeCard from "@/components/common/recipe-card";
import { useRecipeStore } from "@/store/recipe.store";
import { Button, Spinner } from "@heroui/react";
import Link from "next/link";

export default function Home() {
  const { recipes, isLoading, error } = useRecipeStore();

  return (
    <>
      <div className="flex items-center justify-center w-full mb-4">
        <Link href="/recipes/new">
          <Button className="text-white" color="primary">
            Добавить рецепт
          </Button>
        </Link>
      </div>

      {error && <p className="mb-4 text-red-500">{error}</p>}

      {isLoading && (
        <Spinner
          variant="gradient"
          color="primary"
          className="absolute top-1/2"
        />
      )}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </>
  );
}
