import { Column } from "@/styles/BaseComponents";
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
  // 1부터 23까지 순환하는 배경 이미지 번호 계산
  const backgroundNumber = ((item.id - 1) % 22) + 1;

  return (
    <Column width="100%" height="100%" alignItems="center">
      <Column
        width="100%"
        height="auto"
        maxWidth="100px"
        style={{
          aspectRatio: "1 / 1",
          borderRadius: "50%",
          position: "relative",
          overflow: "hidden",
        }}
        alignItems="center"
      >
        {/* 배경 이미지 */}
        <Image
          src={`/home/stamp/background/${backgroundNumber}.jpg`}
          alt="스탬프 배경"
          fill
          sizes="100px"
          style={{
            objectFit: "cover",
            objectPosition: "center",
            zIndex: 1,
            mask: "radial-gradient(circle, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%)",
            WebkitMask:
              "radial-gradient(circle, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%)",
          }}
          loading="lazy"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
        />

        {/* 스탬프 아이콘 (스탬프된 경우에만) */}
        {item.is_stamped && (
          <Image
            src="/home/stamp/passedIcon.svg"
            alt="통과 스탬프"
            fill
            sizes="100px"
            style={{
              objectFit: "contain",
              objectPosition: "center",
              zIndex: Z_INDEX.CONTENT,
            }}
            loading="lazy"
          />
        )}
      </Column>

      <Font
        typo="c01_m"
        color="black"
        style={{ marginTop: "0.5rem", textAlign: "center" }}
      >
        {item.title}
      </Font>
    </Column>
  );
}
