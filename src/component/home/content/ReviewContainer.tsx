import React from "react";
import ReviewItem from "./reviewItem/ReviewItem";
import { Grid } from "@/styles/BaseComponents";

export default function ReviewContainer() {
  const reviewItemData = [
    {
      id: 1,
      img: [
        "https://www.adobe.com/kr/creativecloud/photography/hub/features/media_19243bf806dc1c5a3532f3e32f4c14d44f81cae9f.jpeg?width=1200&format=pjpg&optimize=medium",
      ],
      title: "여행 코스",
      description:
        "서울 도심의 숨겨진 명소들을 소개합니다. 너무 좋은 공간이었습니다! 추천해요.",
      userNickname: "닉네임",
      userProfile:
        "https://image.chosun.com/sitedata/image/201706/09/2017060903013_0.jpg",
      tags: ["#도심여행", "#서울명소", "#데이트코스"],
      detailId: "14",
    },
    {
      id: 2,
      img: [
        "https://res.klook.com/image/upload/fl_lossy.progressive,q_60/Mobile/City/rbijqoq1b491jsbcnnoe.jpg",
      ],
      title: "제주도 맛집 투어",
      description:
        "제주도에서 꼭 가봐야 할 맛집들을 정리했어요. 현지인 추천 맛집 위주로 소개합니다.",
      userNickname: "맛집헌터",
      userProfile:
        "https://image.chosun.com/sitedata/image/201706/09/2017060903013_0.jpg",
      tags: ["#제주도맛집", "#현지맛집", "#해산물"],
      detailId: "15",
    },
    {
      id: 3,
      img: ["https://img.hankyung.com/photo/202506/AA.40866131.1.jpg"],
      title: "부산 해변 카페 투어",
      description:
        "부산 해변가의 예쁜 카페들을 돌아보는 코스입니다. 바다 뷰가 환상적이에요!",
      userNickname: "카페러버",
      userProfile:
        "https://image.chosun.com/sitedata/image/201706/09/2017060903013_0.jpg",
      tags: ["#부산카페", "#오션뷰", "#감성카페"],
      detailId: "16",
    },
    {
      id: 4,
      img: [
        "https://www.telltrip.com/wp-content/uploads/2025/02/Gyeongju-Spring-Scenic-View-0.jpg",
      ],
      title: "경주 역사 탐방",
      description:
        "경주의 천년 역사를 느낄 수 있는 코스입니다. 아이들과 함께 가기 좋아요.",
      userNickname: "역사탐방가",
      userProfile:
        "https://image.chosun.com/sitedata/image/201706/09/2017060903013_0.jpg",
      tags: ["#경주여행", "#역사탐방", "#가족여행"],
      detailId: "17",
    },
    {
      id: 5,
      img: ["https://dimg.donga.com/wps/NEWS/IMAGE/2021/03/25/106066500.1.jpg"],
      title: "강릉 바다 힐링 여행",
      description:
        "강릉 바다에서 힐링하는 여행 코스입니다. 조용하고 평화로운 분위기가 최고예요.",
      userNickname: "힐링여행자",
      userProfile:
        "https://image.chosun.com/sitedata/image/201706/09/2017060903013_0.jpg",
      tags: ["#강릉여행", "#바다힐링", "#혼자여행"],
      detailId: "18",
    },
  ];
  return (
    <Grid width="100%" height="100%" gridTemplateColumns="repeat(2, 1fr)">
      {reviewItemData.map((item, index) => (
        <ReviewItem key={`review-${item.id}-${index}`} reviewItemData={item} />
      ))}
    </Grid>
  );
}
