import { Column } from "@/styles/BaseComponents";

import React from "react";

import colors from "@/styles/Colors";

import TopInfo from "@/component/myroad/list/TopInfo";
import ImgSwiper from "@/component/myroad/list/ImgSwiper";
import TagWrapper from "@/component/myroad/list/TagWrapper";
import Image from "next/image";
import { Font } from "@/styles/Typography";

interface ListItemData {
  id: number;
  img: string[];
  title: string;
  tags: string[];
  detailId: string;
}

export default function ListItem({
  listItemData,
  isMain = false,
}: {
  isMain?: boolean;
  listItemData: ListItemData;
}) {
  return (
    <Column
      key={listItemData.id}
      width="100%"
      p="7px"
      border={isMain ? "none" : `1px solid ${colors.gray_200}`}
      borderRadius="10px"
      justifyContent="flex-start"
      alignItems="flex-start"
      gridGap={isMain ? "2px" : "15px"}
    >
      <TopInfo
        title={listItemData.title}
        detailId={listItemData.detailId}
        isMain={isMain}
      />
      {isMain ? (
        <Image
          src={listItemData.img[0]}
          alt={listItemData.title}
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
        />
      ) : (
        <ImgSwiper img={listItemData.img} />
      )}
      {isMain && (
        <Font
          typo="c02_s"
          color="black"
          overflow="hidden"
          m="5px 0"
          display="-webkit-box"
          style={{
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            wordBreak: "break-word",
            whiteSpace: "normal",
            textOverflow: "ellipsis",
          }}
        >
          너무 좋습니다 간만에 산의 정기를 마시며 쉬고, 해안가를 걸어서 너무
          좋았습니다. 해안가를 걸어서 너무 좋았습니다. 좋아요 좋아요 다음에 또
          갈게요
        </Font>
      )}
      <TagWrapper tags={listItemData.tags} isMain={isMain} />
    </Column>
  );
}
