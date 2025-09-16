"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import { FooterContainer, NavItem, IconWrapper, Label } from "./Footer.styles";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@iconify/react";

const navItems = [
  {
    labelKey: "navigation.main",
    path: "/",
    index: 0,
    icon: "mdi:home",
  },
  {
    labelKey: "navigation.search",
    path: "/search",
    index: 1,
    icon: "mdi:magnify",
  },
  {
    labelKey: "navigation.myroad",
    path: "/myroad",
    index: 2,
    icon: "mdi:map",
  },
  {
    labelKey: "navigation.mind",
    path: "/mind",
    index: 3,
    icon: "mdi:heart",
  },
  {
    labelKey: "navigation.profile",
    path: "/profile",
    index: 4,
    icon: "mdi:account",
  },
];

export default function Footer() {
  const pathname = usePathname();
  const { t } = useTranslation();

  return (
    <FooterContainer>
      <ul>
        {navItems.map(({ labelKey, path, icon }) => {
          const isActive =
            path === "/" ? pathname === path : pathname.startsWith(path);
          const label = t(labelKey);
          return (
            <li key={labelKey}>
              <Link href={path}>
                <NavItem>
                  <IconWrapper $active={isActive}>
                    <Icon icon={icon} width="24" height="24" />
                  </IconWrapper>
                  <Label $active={isActive}>{label}</Label>
                </NavItem>
              </Link>
            </li>
          );
        })}
      </ul>
    </FooterContainer>
  );
}
