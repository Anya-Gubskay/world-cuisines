"use client";

import RecipeCard from "@/components/common/recipe-card";
import { useAuthStore } from "@/store/auth.store";
import { useRecipeStore } from "@/store/recipe.store";
import { Button, Spinner } from "@heroui/react";
import Link from "next/link";

export default function Home() {
  const { recipes, isLoading, error } = useRecipeStore();
  const { isAuth } = useAuthStore();

  return (
    <>
      {isAuth && (
        <div className="flex items-center justify-center w-full mb-4">
          <Link href="/recipes/new">
            <Button className="text-white" color="primary">
              Добавить рецепт
            </Button>
          </Link>
        </div>
      )}

      {error && (
        <p className="absolute mb-4 text-red-500 top-1/2">
          {error}
        </p>
      )}

      {isLoading && (
        <Spinner
          variant="gradient"
          color="primary"
          className="absolute top-1/2"
        />
      )}
      {!recipes.length && (
        <p className="absolute mb-4 top-1/2 text-primary">
          Список рецептов пуст
        </p>
      )}
      {!!recipes.length && (<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>)}
    </>
  );
}
