import { Column } from "@/styles/BaseComponents";

import React from "react";
import Image from "next/image";

import Description from "@/component/myroad/list/Description";
import UserContainer from "@/component/home/content/reviewItem/UserContainer";
import { TravelReviewItem } from "@/types/travel";
import TagWrapper from "@/component/myroad/list/TagWrapper";
import { useRouter } from "next/navigation";

export default function ReviewItem({
  reviewItemData,
}: {
  reviewItemData: TravelReviewItem;
}) {
  const router = useRouter();
  const onClickReviewItem = () => {
    router.push(`/mind/${reviewItemData.travel_review_id}`);
  };

  return (
    <Column
      key={reviewItemData.travel_review_id}
      width="100%"
      p="7px"
      justifyContent="flex-start"
      alignItems="flex-start"
      gridGap="2px"
      onClick={onClickReviewItem}
      style={{ cursor: "pointer" }}
    >
      <UserContainer
        title={reviewItemData.title}
        userNickname={reviewItemData.user_nickname}
        userProfile={reviewItemData.user_photo}
      />
      <Image
        src={reviewItemData.image[0]}
        alt={reviewItemData.title}
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: "100%", height: "auto" }}
      />

      <Description description={reviewItemData.note} />
      <TagWrapper tags={reviewItemData.tags} isMain={true} />
    </Column>
  );
}
