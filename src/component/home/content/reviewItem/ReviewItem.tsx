import { Column } from "@/styles/BaseComponents";

import React from "react";
import Image from "next/image";

import Description from "@/component/myroad/list/Description";
import UserContainer from "@/component/home/content/reviewItem/UserContainer";
import { TravelReviewItem } from "@/types/travel";

export default function ReviewItem({
  reviewItemData,
}: {
  reviewItemData: TravelReviewItem;
}) {
  // todo 수정필요
  return (
    <Column
      key={reviewItemData.travel_review_id}
      width="100%"
      p="7px"
      justifyContent="flex-start"
      alignItems="flex-start"
      gridGap="2px"
    >
      <UserContainer
        title={reviewItemData.title}
        userNickname={reviewItemData.title}
        userProfile={reviewItemData.image[0]}
      />
      <Image
        src={reviewItemData.image[0]}
        alt={reviewItemData.title}
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: "100%", height: "auto" }}
      />

      <Description description={reviewItemData.title} />
      {/* <TagWrapper tags={reviewItemData.tags} isMain={true} /> */}
    </Column>
  );
}
