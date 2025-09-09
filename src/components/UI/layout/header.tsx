"use client";

import { LayoutConfig } from "@/config/layout.config";
import { siteConfig } from "@/config/site.config";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  Spinner,
  Avatar,
} from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import RegistrationModal from "../modals/registration.modal";
import LoginModal from "../modals/login.modal";
import { useState } from "react";
import { signOutFunc } from "@/actions/sign-out";
import { useAuthStore } from "@/store/auth.store";

export const Logo = () => {
  return (
    <div className="relative flex items-center">
      <Image
        src="/logo_world_kitchen.png"
        alt={siteConfig.title}
        width={40}
        height={40}
        priority
        className="rounded-lg"
      />
    </div>
  );
};

export default function Header() {
  const pathName = usePathname();
  const { isAuth, session, status, setAuthState } = useAuthStore();
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOutFunc();
      setAuthState("unauthenticated", null);
    } catch (error) {
      console.error("Ошибка при выходе:", error);
    }
  };

  const getNavItems = () => {
    return siteConfig.navItems
      .filter((item) => {
        if (item.href === "/ingredients") {
          return isAuth;
        }
        return true;
      })
      .map((item) => {
        const isActive = pathName === item.href;
        return (
          <NavbarItem key={item.href}>
            <Link
              href={item.href}
              className={`
                relative px-4 py-2 rounded-lg font-medium transition-all duration-300
                ${
                  isActive
                    ? "text-white bg-gradient-to-r from-orange-500 to-orange-600 shadow-lg"
                    : "text-gray-300 hover:text-white hover:bg-gray-800"
                }
                group
              `}
            >
              {item.label}
           
            </Link>
          </NavbarItem>
        );
      });
  };

  const getUserInitials = (email: string) => {
    return email.charAt(0).toUpperCase();
  };

  return (
    <Navbar
      className="border-b border-gray-800 shadow-2xl bg-gradient-to-r from-gray-900 to-black"
      style={{ height: `${LayoutConfig.footerHeight}` }}
      isBlurred={false}
    >
      <NavbarBrand>
        <Link href="/" className="flex items-center gap-3 group">
          <Logo />
          <div className="flex flex-col">
            <p className="text-xl font-bold tracking-tight text-white">
              {siteConfig.title}
            </p>
            <p className="text-xs text-gray-400 transition-colors group-hover:text-orange-300">
              Кухни народов мира
            </p>
          </div>
        </Link>
      </NavbarBrand>

      <NavbarContent className="hidden gap-2 md:flex" justify="center">
        {getNavItems()}
      </NavbarContent>

      <NavbarContent justify="end" className="gap-3">
        {status === "loading" ? (
          <div className="flex items-center gap-2">
            <Spinner size="sm" color="white" />
            <span className="text-sm text-gray-400">Загрузка...</span>
          </div>
        ) : isAuth ? (
          <div className="flex items-center gap-4">
            <div className="items-center hidden gap-2 lg:flex">
              <Avatar
                name={session?.user?.email!}
                size="sm"
                className="font-bold text-white bg-gradient-to-r from-orange-500 to-red-500"
                getInitials={getUserInitials}
              />
              <div className="flex flex-col">
                <span className="text-sm font-medium text-white">
                  {session?.user?.email}
                </span>
                <span className="text-xs text-green-400">Online</span>
              </div>
            </div>

            <Button
              color="danger"
              variant="flat"
              size="sm"
              onPress={handleSignOut}
              className="text-white border border-red-500/30 hover:border-red-500"
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
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
              }
            >
              Выйти
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Button
              color="default"
              variant="flat"
              size="sm"
              onPress={() => setIsLoginOpen(true)}
              className="text-white border border-gray-600 hover:border-orange-500 hover:text-orange-400"
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
                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                  />
                </svg>
              }
            >
              Вход
            </Button>

            <Button
              color="primary"
              variant="solid"
              size="sm"
              onPress={() => setIsRegistrationOpen(true)}
              className="text-white shadow-lg bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 hover:shadow-orange-500/25"
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
                    d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                  />
                </svg>
              }
            >
              Регистрация
            </Button>
          </div>
        )}
      </NavbarContent>

      <RegistrationModal
        isOpen={isRegistrationOpen}
        onClose={() => setIsRegistrationOpen(false)}
      />
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </Navbar>
  );
}
