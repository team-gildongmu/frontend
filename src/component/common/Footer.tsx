"use client";

import React from "react";
import { FooterContainer, NavItem, Icon, Label } from "./Footer.styles";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "메인", path: "/", index: 0 },
  { label: "검색", path: "/search", index: 1 },
  { label: "마이로드", path: "/myroad", index: 2 },
  { label: "마음길", path: "/mind", index: 3 },
  { label: "내정보", path: "/profile", index: 4 },
];

export default function Footer() {
  const pathname = usePathname();

  return (
    <FooterContainer>
      <ul>
        {navItems.map(({ label, path, index }) => {
          const isActive = pathname === path;
          return (
            <li key={label}>
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