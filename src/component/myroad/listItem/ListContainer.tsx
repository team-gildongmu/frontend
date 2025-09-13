import { CenterColumn, Column } from "@/styles/BaseComponents";
import React from "react";
import ImgSwiper from "@/component/myroad/list/ImgSwiper";
import TagWrapper from "@/component/myroad/list/TagWrapper";
import { Font } from "@/styles/Typography";

export default function ListContainer() {
  const listItemData = {
    img: [
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
    summary: "마무리 멘트입니다",
    section: [
      {
        type: "POI",
        title: "서울 인디스페이스",
        desc: "고대 미라와 파피루스 문서를 전시합니다.",
        reason: "일정 동선에 맞춰 추천합니다.",
      },
      {
        type: "POI",
        title: "서울 인디스페이스",
        desc: "고대 미라와 파피루스 문서를 전시합니다.",
        reason: "일정 동선에 맞춰 추천합니다.",
      },
    ],
  };
  return (
    <CenterColumn width="100%" height="100%" p="15px" gridGap="25px">
      <ImgSwiper img={listItemData.img} />
      <Font typo="t01_bold_m" color="black" textAlign="left" width="100%">
        {listItemData.title}
      </Font>
      <TagWrapper tags={listItemData.tags} />
      <Column width="100%" gridGap="18px">
        <Font typo="t01_m" color="black" textAlign="left" width="100%">
          추천 관람 루트(약 2~3시간 코스)
        </Font>
        {listItemData.section.map((item, index) => (
          <Column key={index} width="100%" gridGap="5px">
            <Font typo="l01_bold_m" color="black" textAlign="left" width="100%">
              {item.title}
            </Font>
            <Font typo="c04_m" color="black" textAlign="left" width="100%">
              {item.desc}
            </Font>
            <Font typo="c04_m" color="black" textAlign="left" width="100%">
              {item.reason}
            </Font>
          </Column>
        ))}
      </Column>
      {/* 마무리 */}
      <Column width="100%" gridGap="5px">
        <Font typo="t01_m" color="black" textAlign="left" width="100%">
          ✅ 마무리
        </Font>
        <Font typo="c04_m" color="black" textAlign="left" width="100%">
          {listItemData.summary}
        </Font>
      </Column>
    </CenterColumn>
  );
}
