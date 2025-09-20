"use client"

import { useRouter } from "next/navigation";
import * as D from "@/component/mind/detail/MindDetail.styles"
import Icon from "@/component/common/IconifyIcon";
import colors from "@/styles/Colors";
import { useTranslation } from "react-i18next";
import useGetReviewDetailQuery from "@/queries/travel/useGetReviewDetail";
import LoadingSpinner from "@/component/common/LoadingSpinner";
import Empty from "@/component/common/Empty";
import ImgSwiper from "@/component/myroad/list/ImgSwiper";
import Weather from "./Weather";

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
            <D.Title>
                <Icon  
                icon="tdesign:filter-3-filled"
                width={30}
                height={30}
                color={colors.red_300} />
                {listItemData.title}
            </D.Title>
          </D.TitleWrap>
          <ImgSwiper img={listItemData.images}/>
          <D.TagWrapper>
            {listItemData.tags.map((tag: string, idx: number) => (
              <D.Tag key={idx}>#{tag}</D.Tag>
            ))}
          </D.TagWrapper>
          <D.Information>
            <D.ScoreWrap>
              {[...Array(5)].map((_, index) => (
                  <D.Score key={index} filled={index < Number(listItemData.ai_rating)}>
                      ★
                  </D.Score>
              ))}
            </D.ScoreWrap>
            <D.DateWrap>
              <D.Period>
                {listItemData.start_date} ~ {listItemData.end_date}
              </D.Period>
              <Weather weather={listItemData.weather} />
            </D.DateWrap>
            <D.Feeling>
              <span>기분점수 |  </span>
              <span>{listItemData.mood}</span>
            </D.Feeling>
          </D.Information>
          <D.ContentWrap>
            <D.Content>
              {listItemData.note}
            </D.Content>
          </D.ContentWrap>
        </D.Container>
      </div>
    )
}