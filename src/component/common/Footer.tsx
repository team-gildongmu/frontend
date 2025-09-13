"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import { FooterContainer, NavItem, Icon, Label } from "./Footer.styles";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { labelKey: "navigation.main", path: "/", index: 0 },
  { labelKey: "navigation.search", path: "/search", index: 1 },
  { labelKey: "navigation.myroad", path: "/myroad", index: 2 },
  { labelKey: "navigation.mind", path: "/mind", index: 3 },
  { labelKey: "navigation.profile", path: "/profile", index: 4 },
];

export default function Footer() {
  const pathname = usePathname();
  const { t } = useTranslation();

  return (
    <FooterContainer>
      <ul>
        {navItems.map(({ labelKey, path, index }) => {
          const isActive = pathname === path;
          const label = t(labelKey);
          return (
            <li key={labelKey}>
              <Link href={path}>
                <NavItem>
                  <Icon $index={index} $active={isActive} />
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
