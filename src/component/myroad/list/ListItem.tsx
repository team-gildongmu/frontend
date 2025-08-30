import { Column } from "@/styles/BaseComponents";
import { Font } from "@/styles/Typography";
import Image from "next/image";
import React from "react";
import colors from "@/styles/Colors";
import TopInfo from "@/component/myroad/list/TopInfo";
import ImgSwiper from "./ImgSwiper";

interface ListItemData {
  id: number;
  img: string[];
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
      <ImgSwiper img={listItemData.img} />
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
