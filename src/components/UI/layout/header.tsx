"use client";

import { LayoutConfig } from "@/config/layout.config";
import { siteConfig } from "@/config/site.config";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOutFunc();
      setAuthState("unauthenticated", null);
      setIsMenuOpen(false);
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
                relative px-3 py-2 rounded-lg font-medium transition-all duration-300
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

  const getMobileNavItems = () => {
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
          <NavbarMenuItem key={item.href}>
            <Link
              href={item.href}
              className={`
                w-full px-4 py-3 rounded-lg font-medium transition-all duration-300
                ${
                  isActive
                    ? "text-white bg-gradient-to-r from-orange-500 to-orange-600"
                    : "text-gray-300 hover:text-white hover:bg-gray-800"
                }
              `}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          </NavbarMenuItem>
        );
      });
  };

  const getUserInitials = (email: string) => {
    return email.charAt(0).toUpperCase();
  };

  return (
    <>
      <Navbar
        className="border-b border-gray-800 shadow-2xl bg-gradient-to-r from-gray-900 to-black"
        style={{ height: `${LayoutConfig.footerHeight}` }}
        isBlurred={false}
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
        maxWidth="full"
      >
  
        <NavbarContent className="md:hidden" justify="start">
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="text-white"
          />
        </NavbarContent>

        <NavbarBrand className="w-auto md:flex-1">
          <Link
            href="/"
            className="flex items-center gap-3 group"
            onClick={() => setIsMenuOpen(false)}
          >
            <Logo />
            <div className="flex flex-col">
              <p className="text-lg font-bold tracking-tight text-white md:text-xl">
                {siteConfig.title}
              </p>
              <p className="hidden text-xs text-gray-400 transition-colors group-hover:text-orange-300 sm:block">
                Кухни народов мира
              </p>
            </div>
          </Link>
        </NavbarBrand>

        <NavbarContent
          className="justify-center flex-1 hidden md:flex"
          justify="center"
        >
          <div className="flex items-center justify-center gap-2">
            {getNavItems()}
          </div>
        </NavbarContent>

        <NavbarContent justify="end" className="flex-1 hidden gap-3 md:flex">
          {status === "loading" ? (
            <div className="flex items-center gap-2">
              <Spinner size="sm" color="white" />
              <span className="text-sm text-gray-400">Загрузка...</span>
            </div>
          ) : isAuth ? (
            <div className="flex items-center gap-4">
              <div className="items-center hidden gap-2 lg:flex">
                <Avatar
                  name={session?.user?.email || "User"}
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

        <NavbarMenu className="pt-4 border-t border-gray-800 bg-gradient-to-b from-gray-900 to-black">
          {getMobileNavItems()}

          <div className="px-4 py-3 mt-4 border-t border-gray-800">
            {status === "loading" ? (
              <div className="flex items-center gap-2 py-4">
                <Spinner size="sm" color="white" />
                <span className="text-sm text-gray-400">Загрузка...</span>
              </div>
            ) : isAuth ? (
              <>
                <div className="flex items-center gap-3 mb-4">
                  <Avatar
                    name={session?.user?.email || "User"}
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
                  fullWidth
                  onPress={handleSignOut}
                  className="text-white border border-red-500/30 hover:border-red-500"
                >
                  Выйти
                </Button>
              </>
            ) : (
              <div className="space-y-3">
                <Button
                  color="default"
                  variant="flat"
                  fullWidth
                  onPress={() => {
                    setIsLoginOpen(true);
                    setIsMenuOpen(false);
                  }}
                  className="text-white border border-gray-600 hover:border-orange-500 hover:text-orange-400"
                >
                  Вход
                </Button>
                <Button
                  color="primary"
                  variant="solid"
                  fullWidth
                  onPress={() => {
                    setIsRegistrationOpen(true);
                    setIsMenuOpen(false);
                  }}
                  className="text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
                >
                  Регистрация
                </Button>
              </div>
            )}
          </div>
        </NavbarMenu>
      </Navbar>

      <RegistrationModal
        isOpen={isRegistrationOpen}
        onClose={() => setIsRegistrationOpen(false)}
      />
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
}
