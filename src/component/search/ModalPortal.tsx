"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function ModalPortal({
  children,
  containerId = "modal-root",
}: {
  children: React.ReactNode;
  containerId?: string;
}) {
  const [mounted, setMounted] = useState(false);
  const [el, setEl] = useState<HTMLElement | null>(null);

  useEffect(() => {
    let target = document.getElementById(containerId);
    if (!target) {
      target = document.createElement("div");
      target.id = containerId;
      document.body.appendChild(target);
    }
    setEl(target);
    setMounted(true);
  }, [containerId]);

  if (!mounted || !el) return null;
  return createPortal(children, el);
}
