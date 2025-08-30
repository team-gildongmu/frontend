import { CenterColumn, Column, Row } from "@/styles/BaseComponents";
import { Font } from "@/styles/Typography";
import Image from "next/image";
import React from "react";
import colors from "@/styles/Colors";
import TopInfo from "@/component/myroad/list/TopInfo";

interface ListItemData {
  id: number;
  img: string;
  title: string;
  tags: string[];
  detailId: string;
}

export default function ListItem({
  listItemData,
}: {
  listItemData: ListItemData;
}) {
  return (
    <Column
      key={listItemData.id}
      width="100%"
      p="7px"
      border={`1px solid ${colors.gray_200}`}
      borderRadius="10px"
      justifyContent="flex-start"
      alignItems="flex-start"
      gridGap="15px"
    >
      <TopInfo title={listItemData.title} detailId={listItemData.detailId} />

      <Image
        src={listItemData.img}
        alt={listItemData.title}
        width={100}
        height={100}
        style={{
          borderRadius: "4px",
          objectFit: "cover" as any,
          flexShrink: 0,
        }}
      />

      <Column width="100%" maxWidth="100%" flexShrink={0}>
        <Font
          typo="l01_m"
          color="gray_500"
          overflow="hidden"
          display="-webkit-box"
          style={{
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical" as any,
            wordBreak: "break-word",
            whiteSpace: "normal",
            textOverflow: "ellipsis",
          }}
        >
          {listItemData.tags.join(" ")}
        </Font>
      </Column>
    </Column>
  );
}
