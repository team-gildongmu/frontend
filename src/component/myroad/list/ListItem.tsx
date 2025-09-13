import { Column } from "@/styles/BaseComponents";

import React from "react";
import Image from "next/image";

import colors from "@/styles/Colors";

import TopInfo from "@/component/myroad/list/TopInfo";
import ImgSwiper from "@/component/myroad/list/ImgSwiper";
import TagWrapper from "@/component/myroad/list/TagWrapper";
import Description from "@/component/myroad/list/Description";
import { TravelLogItem } from "@/types/travel";

export default function ListItem({
  listItemData,
  isMain = false,
}: {
  isMain?: boolean;
  listItemData: TravelLogItem;
}) {
  return (
    <Column
      key={listItemData.travel_log_id}
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
        detailId={listItemData.travel_log_id}
        subtitle={listItemData.subtitle}
        isMain={isMain}
      />
      {isMain ? (
        <Image
          src={listItemData.images[0]}
          alt={listItemData.title}
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
        />
      ) : (
        <ImgSwiper img={listItemData.images} />
      )}
      {isMain && <Description description={listItemData?.summary || ""} />}
      <TagWrapper tags={listItemData.keywords} isMain={isMain} />
    </Column>
  );
}
