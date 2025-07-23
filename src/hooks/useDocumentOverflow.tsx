"use client";

import { useEffect } from "react";

interface useDocumentOverflowProps {
  openModal: boolean;
}

const useDocumentOverflow = ({ openModal }: useDocumentOverflowProps) => {
  useEffect(() => {
    if (openModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [openModal]);
};

export default useDocumentOverflow;
