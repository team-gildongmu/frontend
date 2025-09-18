"use client"

import { useRouter } from "next/navigation";
import * as D from "@/component/mind/detail/MindDetail.styles"
import Image from "next/image";
import Icon from "@/component/common/IconifyIcon";
import colors from "@/styles/Colors";
import { useTranslation } from "react-i18next";
import useGetReviewDetailQuery from "@/queries/travel/useGetReviewDetail";
import LoadingSpinner from "@/component/common/LoadingSpinner";
import Empty from "@/component/common/Empty";

type Props = {
  id: number;
};

export default function MindDetail ({id}: Props) {
    const router = useRouter();
    const { t } = useTranslation();
    const { data: listItemData, isLoading } = useGetReviewDetailQuery(id);
  
    if (isLoading) {
      return <LoadingSpinner />;
    }
  
    if (!listItemData) {
      return <Empty text={t("mind.loadingData")} />;
    }


  return (
      <div>
        <D.Container>
          <D.TitleWrap>
            <D.BackButton onClick={() => router.back()}>
              <Icon  
                icon="tdesign:chevron-left"
                width={30}
                height={30}
                color={colors.gray_500} />
            </D.BackButton>
            <D.Title>{listItemData.title}</D.Title>
          </D.TitleWrap>
          <D.ImageWrap>
            <Image
              src={listItemData.image}
              width={0}
              height={0}
              sizes="100vw"
              style={{
                width: "100%",
                height: "auto",
                maxHeight: "270px",
                objectFit: "contain",
              }} alt="사진 들어올 자리" />
          </D.ImageWrap>
          <li>
            <D.ScoreWrap>
              {[...Array(5)].map((_, index) => (
                  <D.Score key={index} filled={index < Number(listItemData.score)}>
                      ★
                  </D.Score>
              ))}
            </D.ScoreWrap>
            <D.Date>{listItemData.date}, {listItemData.weather}</D.Date>
            <D.Feeling>
              <span>기분점수 |  </span>
              <span>{listItemData.mood}</span>
            </D.Feeling>
          </li>
          <D.ContentWrap>
            <D.Content>
              {listItemData.contents}
            </D.Content>
          </D.ContentWrap>
        </D.Container>
      </div>
    )
}