"use client";
import Image from "next/image";
import * as C from "./MindCard.styles";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import useGetReviewDetailQuery from "@/queries/travel/useGetReviewDetail";
import LoadingSpinner from "@/component/common/LoadingSpinner";
import Empty from "@/component/common/Empty";

type Props = {
  key : number, 
  id : number
}

export function MindCard({key, id}: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  // TODO: key 수정필요
  console.log("key", key)
  const { t } = useTranslation();
  const { data: listItemData, isLoading } = useGetReviewDetailQuery(id);
      
  if (isLoading) {
    return <LoadingSpinner />;
  }
  
  if (!listItemData) {
    return <Empty text={t("mind.loadingData")} />;
  }

  return (
    <C.Wrap>
      <C.TitleWrap>
        <C.Title__l onClick={() => router.push(`/mind/${id}`)}>
          <C.Title>{listItemData.title}</C.Title>
          <C.ScoreWrap>
            {[...Array(5)].map((_, index) => (
              <C.Score key={index} filled={index < listItemData.score}>
                ★
              </C.Score>
            ))}
          </C.ScoreWrap>
          <C.Date>
            <span>
              {listItemData.date}, {listItemData.weather}
            </span>
          </C.Date>
        </C.Title__l>
        <C.Title__r>
          <C.Setting_btn onClick={() => setOpen((prev) => !prev)}>
            ⚙ 설정
          </C.Setting_btn>

          <C.Setting_conform $open={open}>
            <C.Update onClick={() => alert("수정 클릭됨!")}>수정</C.Update>
            <C.Delete onClick={() => alert("삭제 클릭됨!")}>삭제</C.Delete>
          </C.Setting_conform>
        </C.Title__r>
      </C.TitleWrap>
      <Image
        src={listItemData.image}
        width={500}
        height={300}
        alt="일기 사진"
        onClick={() => router.push(`/mind/${id}`)}
      />
    </C.Wrap>
  );
}
