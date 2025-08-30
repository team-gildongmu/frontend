import { Column } from "@/styles/BaseComponents";

import React from "react";

import colors from "@/styles/Colors";

import TopInfo from "@/component/myroad/list/TopInfo";
import ImgSwiper from "@/component/myroad/list/ImgSwiper";
import TagWrapper from "@/component/myroad/list/TagWrapper";

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
      <TagWrapper tags={listItemData.tags} />
    </Column>
  );
}
