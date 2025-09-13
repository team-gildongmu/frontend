"use client";

import React from "react";

import { Column } from "@/styles/BaseComponents";

import ListItem from "@/component/myroad/list/ListItem";
import useGetLogListQuery from "@/queries/travel/useGetLogList";

export default function ListItemContainer() {
  // todo: listItem 데이터 추가
  const listItemData = [
    {
      id: 1,
      img: [
        "https://image.chosun.com/sitedata/image/201706/09/2017060903013_0.jpg",
        "https://image.chosun.com/sitedata/image/201706/09/2017060903013_0.jpg",
        "https://image.chosun.com/sitedata/image/201706/09/2017060903013_0.jpg",
      ],
      title: "🎨 루브르 박물관 관람 가이드",
      tags: [
        "#힐링",
        "#도심속",
        "#홍콩",
        "#혼자만의 시간",
        "#홍콩",
        "#혼자만의 시간",
        "#홍콩",
        "#혼자만의 시간",
        "#홍콩",
        "#혼자만의 시간",
        "#홍콩",
      ],
      detailId: "12",
    },
    {
      id: 2,
      img: [
        "https://ojsfile.ohmynews.com/PHT_IMG_FILE/2023/1108/IE003225955_PHT.jpg",
      ],
      title: "서울 도심 속 가이드",
      tags: ["#혼자만의 시간", "#드라이브"],
      detailId: "14",
    },

    {
      id: 3,
      img: [
        "https://thumb.tidesquare.com/common_cdn/upload/image/theme/2023/02/10/%E1%84%90%E1%85%A6%E1%84%86%E1%85%A1_%E1%84%80%E1%85%B5%E1%84%92%E1%85%AC%E1%86%A8%E1%84%8C%E1%85%A5%E1%86%AB_%E1%84%89%E1%85%A1%E1%86%BC%E1%84%83%E1%85%A1%E1%86%AB_%E1%84%87%E1%85%A2%E1%84%82%E1%85%A5_(750_X_500)_20230210095743.png",
        "https://image.chosun.com/sitedata/image/201706/09/2017060903013_0.jpg",
        "https://ojsfile.ohmynews.com/PHT_IMG_FILE/2023/1108/IE003225955_PHT.jpg",
      ],
      title: "홍콩 야경",
      tags: ["#홍콩", "#혼자만의 시간"],
      detailId: "34",
    },
    {
      id: 4,
      img: [
        "https://media.istockphoto.com/id/1300107681/ko/%EC%82%AC%EC%A7%84/%EB%8C%80%EC%84%9C%EC%96%91-%EC%9D%98-%ED%91%9C%EB%A9%B4.jpg?s=612x612&w=0&k=20&c=p_vW3L_1A7moSNqHpavoW8EmmiiKOM4bwQM7rSvt5OY=",
        "https://thumb.tidesquare.com/common_cdn/upload/image/theme/2023/02/10/%E1%84%90%E1%85%A6%E1%84%86%E1%85%A1_%E1%84%80%E1%85%B5%E1%84%92%E1%85%AC%E1%86%A8%E1%84%8C%E1%85%A5%E1%86%AB_%E1%84%89%E1%85%A1%E1%86%BC%E1%84%83%E1%85%A1%E1%86%AB_%E1%84%87%E1%85%A2%E1%84%82%E1%85%A5_(750_X_500)_20230210095743.png",
      ],
      title:
        "바다 여행 긴 제목 예시 바다 여행 긴 제목 예시바다 여행 긴 제목 예시바다 여행 긴 제목 예시바다 여행 긴 제목 예시바다 여행 긴 제목 예시바다 여행 긴 제목 예시바다 여행 긴 제목 예시바다 여행 긴 제목 예시바다 여행 긴 제목 예시",
      tags: ["#혼자만의 시간", "#드라이브"],
      detailId: "2",
    },
  ];

  const { data: logList, isLoading } = useGetLogListQuery();

  // TODO: 실제 데이터 사용 시 주석 해제
  // if (logList?.data?.length === 0 || isLoading) {
  //   return <Empty text="아직 작성된 여행 로그가 없습니다." />;
  // }

  //   if (logList.length === 0 || isLoading) {
  //     return <Empty text="아직 작성된 여행 로그가 없습니다." />;
  //   }

  console.log(logList, isLoading);

  return (
    <Column
      width="100%"
      height="100%"
      gridGap="20px"
      p="15px"
      overflow="auto"
      justifyContent="flex-start"
      alignItems="center"
    >
      {listItemData.map((item) => (
        <ListItem key={item.id} listItemData={item} />
      ))}
    </Column>
  );
}
