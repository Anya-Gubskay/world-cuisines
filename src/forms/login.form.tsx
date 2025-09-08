"use client";

import { signInWithCredentials } from "@/actions/sign-in";
import { useHeroToast } from "@/hooks/use-hero-toast";
import { Button, Form, Input } from "@heroui/react";
import { useState } from "react";

interface IProps {
  onClose: () => void;
}

const LoginForm = ({ onClose }: IProps) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { toast } = useHeroToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);

    const result = await signInWithCredentials(
      formData.email,
      formData.password
    );
    if (result.error) {
      toast("Ошибка при входе!", { toastType: "danger" });
    } else if (result.user) {
      toast("Вы успещно вошли!", { toastType: "success" });
    }
    window.location.reload();

    onClose();
  };

  return (
    <Form className="w-full" onSubmit={handleSubmit}>
      <Input
        aria-label="Email"
        isRequired
        name="email"
        placeholder="Введите email"
        type="email"
        value={formData.email}
        classNames={{
          innerWrapper: "bg-default-100",
          input: "text-sm focus:outline-none",
          helperWrapper: "!p-0 !m-0 !min-h-0",
          errorMessage: "absolute top-full mt-1 ml-1",
        }}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        validate={(value) => {
          if (!value) return "Почта обязательна";
          return null;
        }}
      />

      <Input
        aria-label="Password"
        isRequired
        placeholder="Введите пароль"
        type="password"
        value={formData.password}
        classNames={{
          innerWrapper: "bg-default-100",
          input: "text-sm focus:outline-none",
          helperWrapper: "!p-0 !m-0 !min-h-0",
          errorMessage: "absolute top-full mt-1 ml-1",
        }}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        validate={(value) => {
          if (!value) return "Пароль обязателен";
          return null;
        }}
      />

      <div className="flex w-[100%] gap-4 item-center pt-8 justify-end">
        <Button variant="light" onPress={onClose}>
          Отмена
        </Button>
        <Button color="primary" type="submit">
          Войти
        </Button>
      </div>
    </Form>
  );
};

export default LoginForm;
