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
    <div className="container min-h-screen p-4 mx-auto">
      {isAuth &&
        !!recipes.length &&(
          <div className="flex items-center justify-center w-full mb-8">
            <Link href="/recipes/new">
              <Button
                className="text-white"
                color="primary"
                size="lg"
                startContent={
                  <svg
                    className="w-5 h-5"
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
                Добавить рецепт
              </Button>
            </Link>
          </div>
        )}

      {error && (
        <div className="py-16 text-center">
          <p className="mb-4 text-lg text-red-500">{error}</p>
          <Button color="primary" onPress={() => window.location.reload()}>
            Попробовать снова
          </Button>
        </div>
      )}

      {isLoading && (
        <div className="flex items-center justify-center py-16">
          <Spinner
            variant="gradient"
            color="primary"
            size="lg"
            label="Загрузка рецептов..."
          />
        </div>
      )}

      {!isLoading && !error && recipes.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 space-y-6">
          {isAuth && (
            <Link href="/recipes/new">
              <Button
                color="primary"
                className="px-8 py-6 text-lg text-white"
                size="lg"
              >
                Создать первый рецепт
              </Button>
            </Link>
          )}

          <p className="text-xl text-center text-gray-500">
            {isAuth
              ? "Начните создавать кулинарную коллекцию"
              : "Рецепты пока не добавлены"}
          </p>
        </div>
      )}

      {!isLoading && !error && recipes.length > 0 && (
        <>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
