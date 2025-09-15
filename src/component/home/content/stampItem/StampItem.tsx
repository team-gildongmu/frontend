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
        style={{
          aspectRatio: "1 / 1",
          borderRadius: "50%",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* 배경 이미지 */}
        <Image
          src="/home/stamp/background/1.jpg"
          alt="스탬프 배경"
          fill
          style={{
            objectFit: "cover",
            objectPosition: "center",
            zIndex: 1,
          }}
          priority
          unoptimized
        />
        
        {/* 스탬프 아이콘 (스탬프된 경우에만) */}
        {item.is_stamped && (
          <Image
            src="/home/stamp/passedIcon.svg"
            alt="통과 스탬프"
            fill
            style={{
              objectFit: "contain",
              objectPosition: "center",
              zIndex: Z_INDEX.CONTENT,
            }}
            priority
            unoptimized
          />
        )}
      </CenterColumn>

      <Font
        typo="c01_m"
        color="black"
        style={{ marginTop: "0.5rem", textAlign: "center" }}
      >
        {item.title}
      </Font>
    </CenterColumn>
  );
}
