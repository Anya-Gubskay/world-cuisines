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
} from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import RegistrationModal from "../modals/registration.modal";
import LoginModal from "../modals/login.modal";
import { useState } from "react";
import { signOutFunc } from "@/actions/sign-out";
import { useAuthStore } from "@/store/auth.store";

interface NavItem {
  href: string;
  label: string;
}

export const Logo = () => {
  return (
    <Image
      src="/logo_world_kitchen.png"
      alt={siteConfig.title}
      width={36}
      height={36}
      priority
    />
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
    } catch (error) {
      console.log("error", error);
    }

    setAuthState("unauthenticated", null);
  };

  const getNaveItems = () => {
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
              color="foreground"
              href={item.href}
              className={`
              px-3 py-1
              ${isActive ? "text-orange-400" : "text-white"}
              hover: text-orange-400 hover:border
              hover: border-orange-400 hover: rounded-md
              transition-colors
              transition-border
              duration:200
              `}
            >
              {item.label}
            </Link>
          </NavbarItem>
        );
      });
  };

  return (
    <Navbar
      className={`text-white bg-black`}
      style={{ height: `${LayoutConfig.footerHeight}` }}
    >
      <NavbarBrand>
        <Link href="/" className="flex gap-1">
          <Logo />
          <p className="flex items-center justify-center font-bold text-inherit">
            {siteConfig.title}
          </p>
        </Link>
      </NavbarBrand>

      <NavbarContent className="gap-4 hblaidden sm:flex" justify="center">
        {getNaveItems()}
      </NavbarContent>

      <NavbarContent justify="end">
        {isAuth && <p>Привет, {session?.user?.email}!</p>}
        {status === "loading" ? (
          <Spinner variant="gradient" color="primary" />
        ) : !isAuth ? (
          <>
            <NavbarItem className="hidden lg:flex">
              <Button
                as={Link}
                color="secondary"
                href="#"
                onPress={() => setIsLoginOpen(true)}
              >
                Логин
              </Button>
            </NavbarItem>
            <NavbarItem>
              <Button
                as={Link}
                color="primary"
                href="#"
                onPress={() => setIsRegistrationOpen(true)}
              >
                Регистрация
              </Button>
            </NavbarItem>
          </>
        ) : (
          <NavbarItem className="hidden lg:flex">
            <Button
              as={Link}
              color="secondary"
              href="#"
              onPress={handleSignOut}
            >
              Выйти
            </Button>
          </NavbarItem>
        )}
      </NavbarContent>
      <RegistrationModal
        isOpen={isRegistrationOpen}
        onClose={() => setIsRegistrationOpen(false)}
      ></RegistrationModal>
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
      ></LoginModal>
    </Navbar>
  );
}
