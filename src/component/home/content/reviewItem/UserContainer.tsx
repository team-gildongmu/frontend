import { Column, Row } from "@/styles/BaseComponents";
import { Font } from "@/styles/Typography";
import Image from "next/image";
import React from "react";

interface UserContainerProps {
  title: string;
  userNickname: string;
  userProfile: string;
}

export default function UserContainer({
  title,
  userNickname,
  userProfile,
}: UserContainerProps) {
  return (
    <Row width="100%" gridGap="10px" alignItems="center">
      <Image
        src={userProfile}
        alt={userNickname}
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: "20px", height: "20px", borderRadius: "50%" }}
      />
      <Column>
        <Font
          typo="m01_sb_m"
          color="black"
          overflow="hidden"
          display="-webkit-box"
          style={{
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            wordBreak: "break-word",
            whiteSpace: "normal",
            textOverflow: "ellipsis",
          }}
        >
          {title}
        </Font>
        <Font
          typo="c03_m"
          color="black"
          overflow="hidden"
          display="-webkit-box"
        >
          {userNickname}
        </Font>
      </Column>
    </Row>
  );
}
