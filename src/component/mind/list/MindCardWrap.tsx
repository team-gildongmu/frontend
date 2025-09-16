"use client"
import useGetReviewListQuery from "@/queries/travel/useGetReviewList";
import { MindCard } from "./MindCard";
import styled from "styled-components";
import LoadingSpinner from "@/component/common/LoadingSpinner";
import Empty from "@/component/common/Empty";
import { useTranslation } from "react-i18next";

const MindScreenWrap = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`

export default function MindCardWrap () {
    const { t } = useTranslation();
    const { data: listItemData, isLoading } = useGetReviewListQuery();
    console.log("listItemData 확인", listItemData);
    
    if (isLoading) {
      return <LoadingSpinner />;
    }

    if (!listItemData) {
      return <Empty text={t("mind.loadingData")} />;
    }
    

    return (
        <MindScreenWrap>
            {listItemData.map((item) => (
                <MindCard key={item.travel_review_id} id={item.travel_review_id}/>
            ))}
        </MindScreenWrap>
    )
}
