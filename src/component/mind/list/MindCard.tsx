"use client";
import * as D from "./MindCard.styles";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import useGetReviewDetailQuery from "@/queries/travel/useGetReviewDetail";
import LoadingSpinner from "@/component/common/LoadingSpinner";
import Empty from "@/component/common/Empty";
import Modal from "./Modal";
import ImgSwiper from "@/component/myroad/list/ImgSwiper";
import Weather from "../detail/Weather";
import { useDeleteReview } from "@/queries/travel/useDeleteReview";

type Props = {
  review_id : number
}

export function MindCard({review_id}: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const { t } = useTranslation();
  const { data: listItemData, isLoading } = useGetReviewDetailQuery(review_id);
  const deleteReviewMutation = useDeleteReview();

  const handleDelete = (id: number) => {
    deleteReviewMutation.mutate(id);
  };

      
  if (isLoading) {
    return <LoadingSpinner />;
  }
  
  if (!listItemData) {
    return <Empty text={t("mind.loadingData")} />;
  }

  return (
    <D.Wrap>
      <D.TitleWrap>
        <D.Title__l onClick={() => router.push(`/mind/${review_id}`)}>
          <D.Title>{listItemData.title}</D.Title>
          <D.ScoreWrap>
            {[...Array(5)].map((_, index) => (
              <D.Score key={index} filled={index < listItemData.ai_rating}>
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
        </D.Title__l>
        <D.Title__r>
          <D.Setting_btn onClick={() => setOpen((prev) => !prev)}>
            ⚙ {t("mind.setting")}
          </D.Setting_btn>

          <D.Setting_conform $open={open}>
            <D.Update onClick={() => router.push(`/mind/update/${review_id}`)}>수정</D.Update>
            <D.Delete onClick={() => setModalOpen(true)}>삭제</D.Delete>
          </D.Setting_conform>
        </D.Title__r>
      </D.TitleWrap>
      <D.ImgWrapper>
        <ImgSwiper img={listItemData.images}/>
      </D.ImgWrapper>
      {modalOpen && (
        <Modal
          message="정말로 게시글을 삭제하시겠습니까?"
          onConfirm={async () => {
            await handleDelete(review_id);
            alert("삭제가 완료되었습니다.");
            setModalOpen(false);
          }}
          onClose={() => setModalOpen(false)}
        />
      )}
    </D.Wrap>
       
  );
}
