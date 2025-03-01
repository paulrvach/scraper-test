"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { ScrollArea } from "@/components/ui/scroll-area";

import { NavFolder, NavItem } from "../api/nav/route";
import { cn } from "@/lib/utils";
import Link from "next/link";

const fetchNavData = async () => {
  try {
    const response = await fetch("/api/nav");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Could not fetch nav data\n", error);
    return null;
  }
};

const NavBar = () => {
  const [navItems, setNavItems] = useState<NavItem[] | NavFolder[] | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNavItems = async () => {
      // Create an async function inside useEffect
      setLoading(true);
      const data = await fetchNavData();
      console.log(data);
      setNavItems(data?.data || null);
      setLoading(false);
    };

    loadNavItems();
  }, []);
  return (
    <div className="sticky top-0 z-50 w-full pt-4  backdrop-blur-[1px]">
      <div className="flex w-full items-center justify-between px-4">
        <div className="mx-4 mix-blend-multiply bg-accent ">
          <Link href={"/"}>
            <Image
              src="https://images.squarespace-cdn.com/content/v1/61e1cfe1ea03b70d69145845/4a2f988a-4759-416c-9fc8-1e9f8f4a87bc/Iris-Logo-RGB-color-rect_for_GHL.jpg?format=1500w"
              alt="Iris Technology"
              className="block w-28  mix-blend-multiply"
              loading="eager"
              decoding="async"
              data-loader="raw"
              width={700}
              height={360}
            />
          </Link>
        </div>
        <div className="  ">
          <NavigationMenu>
            <NavigationMenuList>
              {!loading &&
                navItems?.map((item, index) => {
                  if ("folder" in item) {
                    // Render NavMenu.Item for folders
                    return (
                      <NavigationMenuItem key={index}>
                        <NavigationMenuTrigger>
                          {item.folder}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ScrollArea className="h-64">
                            {item.items.map((menuItem, menuItemIndex) => {
                              if (menuItem.href.includes("#")) {
                                return (
                                  <NavigationMenuLink
                                    key={menuItemIndex}
                                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none font-bold text-black transition-colors "
                                  >
                                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground w-96">
                                      {menuItem.text}
                                    </p>
                                  </NavigationMenuLink>
                                );
                              } else {
                                return (
                                  <NavigationMenuLink
                                    key={menuItemIndex}
                                    href={menuItem.href}
                                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                  >
                                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground w-96">
                                      {menuItem.text}
                                    </p>
                                  </NavigationMenuLink>
                                );
                              }
                            })}
                          </ScrollArea>
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                    );
                  } else {
                    // Render NavMenuLink for direct links
                    return (
                      <NavigationMenuLink
                        key={index}
                        href={item.href}
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        {item.text}
                      </NavigationMenuLink>
                    );
                  }
                })}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </div>
  );
};

const ListItem = React.forwardRef<
  React.ComponentRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export default NavBar;
