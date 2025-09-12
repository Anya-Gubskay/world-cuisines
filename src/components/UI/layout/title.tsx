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
    <div className="flex justify-center w-full my-4 sm:my-6 md:my-8">
      <h1 className="px-4 text-xl font-bold text-center sm:text-2xl md:text-3xl">
        {pageTitle}
      </h1>
    </div>
  );
};

export default Title;
