"use client";

import { Button } from "@heroui/react";
import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-8 md:py-16">
      <div className="mb-4 text-6xl font-bold text-gray-300 md:text-8xl lg:text-9xl">
        404
      </div>

      <h1 className="mb-4 text-2xl font-bold tracking-tight text-center md:text-3xl">
        Страница не найдена
      </h1>

      <p className="max-w-md mb-6 text-center text-gray-600 md:mb-8">
        Возможно, страница была перемещена или удалена.
      </p>

      <div>
        <Button as={Link} color="primary" variant="shadow" href="/" size="lg">
          Вернуться на главную
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
