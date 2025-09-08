"use client";

import { siteConfig } from "@/config/site.config";
import { usePathname } from "next/navigation";

const Title = () => {
  const pathName = usePathname();

  const currentNavItem = siteConfig.navItems.find(
    (item) => item.href === pathName
  );

  const pageTitle = currentNavItem ? currentNavItem.label : "";
  return (
    <div className="flex justify-center w-full my-8">
      <h1 className="text-3xl font-bold">{pageTitle}</h1>
    </div>
  );
};

export default Title;
