"use client";

import RecipeForm from "@/forms/recipe.form";

export default function NewRecipePage() {
  return (
    <div className="container p-4 mx-auto">
      <h1 className="mb-4 text-3xl font-bold">Создать новый рецепт</h1>
      <RecipeForm />
    </div>
  );
}
