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
    <div className="container min-h-screen px-4 py-4 mx-auto sm:py-6">
      {isAuth && !!recipes.length && (
        <div className="flex items-center justify-center w-full mb-6 sm:mb-8">
          <Link href="/recipes/new" className="w-full sm:w-auto">
            <Button
              className="w-full text-white sm:w-auto"
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
              <span className="hidden sm:inline">Добавить рецепт</span>
              <span className="sm:hidden">Добавить</span>
            </Button>
          </Link>
        </div>
      )}

      {error && (
        <div className="py-12 text-center sm:py-16">
          <p className="mb-4 text-base text-red-500 sm:text-lg">{error}</p>
          <Button color="primary" onPress={() => window.location.reload()}>
            Попробовать снова
          </Button>
        </div>
      )}

      {isLoading && (
        <div className="flex items-center justify-center py-12 sm:py-16">
          <Spinner
            variant="gradient"
            color="primary"
            size="lg"
            label="Загрузка рецептов..."
            classNames={{
              label: "text-sm sm:text-base",
            }}
          />
        </div>
      )}

      {!isLoading && !error && recipes.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 space-y-4 sm:py-16 sm:space-y-6">
          {isAuth && (
            <Link href="/recipes/new" className="w-full sm:w-auto">
              <Button
                color="primary"
                className="w-full px-4 py-4 text-base text-white sm:px-8 sm:py-6 sm:text-lg"
                size="lg"
                fullWidth
              >
                <span className="hidden sm:inline">Создать первый рецепт</span>
                <span className="sm:hidden">Создать рецепт</span>
              </Button>
            </Link>
          )}

          <p className="text-lg text-center text-gray-500 sm:text-xl">
            {isAuth
              ? "Начните создавать кулинарную коллекцию"
              : "Рецепты пока не добавлены"}
          </p>
        </div>
      )}

      {!isLoading && !error && recipes.length > 0 && (
        <>
          <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>

          {isAuth && (
            <div className="fixed z-10 bottom-6 right-6 sm:hidden">
              <Link href="/recipes/new">
                <Button
                  color="primary"
                  isIconOnly
                  size="lg"
                  className="text-white shadow-lg w-14 h-14"
                  aria-label="Добавить рецепт"
                >
                  <svg
                    className="w-6 h-6"
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
                </Button>
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
}
