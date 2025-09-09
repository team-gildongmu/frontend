import { CenterColumn } from "@/styles/BaseComponents";
import { Font } from "@/styles/Typography";
import Image from "next/image";
import React from "react";
import { Z_INDEX } from "@/styles/ZIndex";
interface StampItemData {
  id: number;
  title: string;
  is_stamped: boolean;
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
          style={{ zIndex: Z_INDEX.CONTENT, position: "relative" }}
        >
          {item.title}
        </Font>
        {item.is_stamped && (
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
