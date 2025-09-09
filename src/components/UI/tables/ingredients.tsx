"use client";

import { CATEGORY_OPTIONS, UNIT_OPTIONS } from "@/constants/select-options";
import { useAuthStore } from "@/store/auth.store";
import { useIngredientStore } from "@/store/ingredient.store";
import { getUnitLabel } from "@/utils/unit";
import {
  Button,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Chip,
  Card,
  CardBody,
  Input,
} from "@heroui/react";
import { useState } from "react";
import { useHeroToast } from "@/hooks/use-hero-toast";

const IngredientsTable = () => {
  const { ingredients, removeIngredient, isLoading } = useIngredientStore();
  const { isAuth } = useAuthStore();
  const { toast } = useHeroToast();
  const [searchTerm, setSearchTerm] = useState("");

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Вы уверены, что хотите удалить ингредиент "${name}"?`)) {
      try {
        await removeIngredient(id);
        toast("Ингредиент удален", { toastType: "success" });
      } catch  {
        toast("Ошибка при удалении", { toastType: "danger" });
      }
    }
  };

  const getCategoryLabel = (value: string) => {
    const option = CATEGORY_OPTIONS.find((opt) => opt.value === value);
    return option ? option.label : value;
  };

  const filteredIngredients = ingredients.filter((ingredient) =>
    ingredient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isAuth) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <p className="text-lg text-gray-500">Необходима авторизация</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <Spinner
          variant="gradient"
          color="primary"
          size="lg"
          label="Загрузка ингредиентов..."
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Ингредиенты</h1>
          <p className="text-gray-600">
            Всего: {ingredients.length} ингредиентов
          </p>
        </div>

        <Input
          placeholder="Поиск ингредиентов..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-64"
          startContent={
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          }
        />
      </div>

      {filteredIngredients.length === 0 && !isLoading && (
        <Card className="border-2 border-gray-300 border-dashed bg-gray-50">
          <CardBody className="py-12 text-center">
            <svg
              className="w-12 h-12 mx-auto mb-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <p className="mb-2 text-lg text-gray-500">
              {searchTerm ? "Ничего не найдено" : "Список ингредиентов пуст"}
            </p>
            {searchTerm && (
              <Button variant="flat" onPress={() => setSearchTerm("")}>
                Очистить поиск
              </Button>
            )}
          </CardBody>
        </Card>
      )}

      {filteredIngredients.length > 0 && (
        <Card className="border border-gray-200 shadow-sm">
          <Table
            aria-label="Список ингредиентов"
            removeWrapper
            classNames={{
              base: "w-full",
              th: "bg-gray-50 text-gray-700 font-semibold text-sm px-4 py-3",
              td: "px-4 py-3 text-sm",
              tr: "border-b border-gray-100 hover:bg-gray-50 transition-colors",
            }}
          >
            <TableHeader>
              <TableColumn className="w-1/5">Название</TableColumn>
              <TableColumn className="w-1/6">Категория</TableColumn>
              <TableColumn className="w-1/6">Ед. изм.</TableColumn>
              <TableColumn className="w-1/6">Цена</TableColumn>
              <TableColumn className="w-1/4">Описание</TableColumn>
              <TableColumn className="w-1/6 text-center">Действия</TableColumn>
            </TableHeader>
            <TableBody>
              {filteredIngredients.map((ingredient) => (
                <TableRow key={ingredient.id}>
                  <TableCell>
                    <span className="font-medium text-gray-900">
                      {ingredient.name}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Chip
                      size="sm"
                      variant="flat"
                      className="capitalize"
                    >
                      {getCategoryLabel(ingredient.category)}
                    </Chip>
                  </TableCell>
                  <TableCell>
                    <span className="text-gray-600">
                      {getUnitLabel(ingredient.unit, UNIT_OPTIONS)}
                    </span>
                  </TableCell>
                  <TableCell>
                    {ingredient.pricePerUnit !== null ? (
                      <span className="font-medium text-green-600">
                        {ingredient.pricePerUnit.toFixed(2)} ₽
                      </span>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {ingredient.description || "-"}
                    </p>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center">
                      <Button
                        color="danger"
                        size="sm"
                        variant="flat"
                        onPress={() =>
                          handleDelete(ingredient.id, ingredient.name)
                        }
                        className="min-w-20"
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
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        }
                      >
                        Удалить
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}

      {/* Статистика */}
      {filteredIngredients.length > 0 && (
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          <span>
            Показано: {filteredIngredients.length} из {ingredients.length}
          </span>
          {searchTerm && (
            <Button variant="light" size="sm" onPress={() => setSearchTerm("")}>
              Очистить фильтр
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default IngredientsTable;
