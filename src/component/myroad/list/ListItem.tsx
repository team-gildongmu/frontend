import { Column } from "@/styles/BaseComponents";

import React from "react";
import Image from "next/image";

import colors from "@/styles/Colors";

import TopInfo from "@/component/myroad/list/TopInfo";
import ImgSwiper from "@/component/myroad/list/ImgSwiper";
import TagWrapper from "@/component/myroad/list/TagWrapper";
import Description from "@/component/myroad/list/Description";

interface ListItemData {
  id: number;
  img: string[];
  title: string;
  description?: string;
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
      {isMain && <Description description={listItemData?.description || ""} />}
      <TagWrapper tags={listItemData.tags} isMain={isMain} />
    </Column>
  );
}
