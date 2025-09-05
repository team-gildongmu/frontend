import { CenterColumn } from "@/styles/BaseComponents";
import { Font } from "@/styles/Typography";
import Image from "next/image";
import React from "react";
interface StampItemData {
  id: number;
  info: string;
  hasPassStamp: boolean;
}

export default function StampItem({ item }: { item: StampItemData }) {
  return (
    <CenterColumn width="100%" height="100%">
      <CenterColumn
        width="100%"
        height="auto"
        maxWidth="100px"
        style={{ aspectRatio: "1 / 1" }}
        position="relative"
      >
        <Font
          typo="c01_m"
          color="black"
          style={{ zIndex: 1, position: "relative" }}
        >
          {item.info}
        </Font>
        {item.hasPassStamp && (
          <Image
            src="/home/stamp/passedIcon.svg"
            alt="통과 스탬프"
            fill
            style={{
              objectFit: "contain",
              objectPosition: "center",
              imageRendering: "crisp-edges",
            }}
            priority
            unoptimized={true}
          />
        )}
      </CenterColumn>
    </CenterColumn>
  );
}
