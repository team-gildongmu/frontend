import { CenterColumn, Column, Row } from "@/styles/BaseComponents";
import { Font } from "@/styles/Typography";
import Image from "next/image";
import React from "react";
import Icon from "@/component/common/IconifyIcon";

interface UserContainerProps {
  title: string;
  userNickname: string;
  userProfile: string | null;
}

export default function UserContainer({
  title,
  userNickname,
  userProfile,
}: UserContainerProps) {
  return (
    <Row width="100%" gridGap="10px" alignItems="center">
      {userProfile ? (
        <Image
          src={userProfile}
          alt={userNickname}
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "20px", height: "20px", borderRadius: "50%" }}
        />
      ) : (
        <CenterColumn
          width="20px"
          height="20px"
          borderRadius="50%"
          backgroundColor="gray_100"
        >
          <Icon icon="mdi:account" width={14} height={14} color="white" />
        </CenterColumn>
      )}
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
