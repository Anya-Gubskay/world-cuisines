"use client";

import { addToast } from "@heroui/toast";

export const useHeroToast = () => {
  const showToast = (
    title = "",
    options?: {
      toastType?:
        | "default"
        | "primary"
        | "secondary"
        | "success"
        | "warning"
        | "danger";
      description?: string;
      timeout?: number;
    }
  ) => {
    const { toastType, description, timeout = 2000 } = options || {};

    addToast({
      title,
      description,
      severity: toastType,
      timeout,
      icon: "",
      color: toastType,
      classNames: {
        base: "!bottom-4",
      },
    });
  };

  return {
    toast: showToast,
  };
};
