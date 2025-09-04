import { Column } from "@/styles/BaseComponents";

import React from "react";
import Image from "next/image";

import TagWrapper from "@/component/myroad/list/TagWrapper";
import Description from "@/component/myroad/list/Description";
import UserContainer from "@/component/home/content/reviewItem/UserContainer";

interface ReviewItemData {
  id: number;
  img: string[];
  title: string;
  description: string;
  userNickname: string;
  userProfile: string;
  tags: string[];
  detailId: string;
}

export default function ReviewItem({
  reviewItemData,
}: {
  reviewItemData: ReviewItemData;
}) {
  return (
    <Column
      key={reviewItemData.id}
      width="100%"
      p="7px"
      justifyContent="flex-start"
      alignItems="flex-start"
      gridGap="2px"
    >
      <UserContainer
        title={reviewItemData.title}
        userNickname={reviewItemData.userNickname}
        userProfile={reviewItemData.userProfile}
      />
      <Image
        src={reviewItemData.img[0]}
        alt={reviewItemData.title}
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: "100%", height: "auto" }}
      />

      <Description description={reviewItemData.description} />
      <TagWrapper tags={reviewItemData.tags} isMain={true} />
    </Column>
  );
}
