"use client";

import { registerUser } from "@/actions/register";
import { useHeroToast } from "@/hooks/use-hero-toast";
import { Button, Form, Input } from "@heroui/react";
import { useState } from "react";

interface IProps {
  onClose: () => void;
}

const RegistrationForm = ({ onClose }: IProps) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useHeroToast();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await registerUser(formData);
      if (result.error) {
        toast("Ошибка при регистрации!", {
          toastType: "danger",
          description: result.error,
        });
      } else if (result.user) {
        toast("Регистрация успешна!", {
          toastType: "success",
          description: "Добро пожаловать в наше сообщество!",
        });
        onClose();
      }
    } catch (error) {
      toast("Неизвестная ошибка!", {
        toastType: "danger",
        description: "Попробуйте еще раз позже",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full space-y-6">
      <Form className="w-full space-y-4" onSubmit={handleSubmit}>
        <div className="w-full space-y-1">
          <label className="text-sm font-medium text-gray-700">Email</label>
          <Input
            aria-label="Email"
            isRequired
            name="email"
            placeholder="your@email.com"
            type="email"
            value={formData.email}
            classNames={{
              inputWrapper:
                "bg-white border border-gray-200 hover:border-orange-300 focus-within:border-orange-500 transition-colors",
              input: "text-gray-800 placeholder-gray-400",
            }}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            validate={(value) => {
              if (!value) return "Почта обязательна";
              if (!validateEmail(value)) return "Некорректный email";
              return null;
            }}
            startContent={
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                />
              </svg>
            }
          />
        </div>

        <div className="w-full space-y-1">
          <label className="text-sm font-medium text-gray-700">Пароль</label>
          <Input
            aria-label="Password"
            isRequired
            placeholder="Не менее 6 символов"
            type="password"
            value={formData.password}
            classNames={{
              inputWrapper:
                "bg-white border border-gray-200 hover:border-orange-300 focus-within:border-orange-500 transition-colors",
              input: "text-gray-800 placeholder-gray-400",
            }}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            validate={(value) => {
              if (!value) return "Пароль обязателен";
              if (value.length < 6)
                return "Пароль должен быть не менее 6 символов";
              return null;
            }}
            startContent={
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            }
          />
        </div>

        <div className="w-full space-y-1">
          <label className="text-sm font-medium text-gray-700">
            Подтвердите пароль
          </label>
          <Input
            isRequired
            name="confirmPassword"
            placeholder="Повторите пароль"
            type="password"
            value={formData.confirmPassword}
            classNames={{
              inputWrapper:
                "bg-white border border-gray-200 hover:border-orange-300 focus-within:border-orange-500 transition-colors",
              input: "text-gray-800 placeholder-gray-400",
            }}
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
            validate={(value) => {
              if (!value) return "Пароль для подтверждения обязателен";
              if (value !== formData.password) return "Пароли не совпадают";
              return null;
            }}
            startContent={
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            }
          />
        </div>

        <div className="flex w-full gap-3 pt-6">
          <Button
            variant="flat"
            onPress={onClose}
            className="flex-1 text-gray-700 border border-gray-300 hover:bg-gray-50"
            disabled={isLoading}
          >
            Отмена
          </Button>
          <Button
            color="primary"
            type="submit"
            isLoading={isLoading}
            className="flex-1 text-white shadow-lg bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 hover:shadow-orange-500/25"
            startContent={
              !isLoading && (
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
                    d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                  />
                </svg>
              )
            }
          >
            {isLoading ? "Регистрация..." : "Создать аккаунт"}
          </Button>
        </div>
      </Form>

      <div className="text-xs text-center text-gray-500">
        Нажимая «Создать аккаунт», вы соглашаетесь с нашими Условиями
        использования
      </div>
    </div>
  );
};

export default RegistrationForm;
