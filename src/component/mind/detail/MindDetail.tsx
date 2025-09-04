"use client"

import { useRouter } from "next/navigation";
import * as D from "@/component/mind/detail/MindDetail.styles"
import Image from "next/image";

type Props = {
  id: number;
};

export default function MindDetail ({id}: Props) {
  console.log("id는 잘 받아와 집니다.", id)
  const router = useRouter();
  const score = "3";
  const contents = "오늘은 강릉에서 하루를 보냈다. 파란 하늘과 맑은 공기 덕분에 마음이 차분해졌다. 카페에서 마신 커피도 좋았고, 오랜만에 혼자만의 시간을 즐길 수 있었다.";
  return (
      <div>
        {/* <h4>{id} - 상세 id</h4> */}
        <D.Container>
          <D.TitleWrap>
            <D.BackButton onClick={() => router.back()}>
              ←
              {/* 아이콘 변경 필요함 */}
            </D.BackButton>
            <D.Title>📖 강릉에서의 멈춤</D.Title>
          </D.TitleWrap>
          <D.ImageWrap>
            {/* 스와이프로 제작해야함 */}
            <Image src={"/mind-test-image/mind-test-image.png"} width={366} height={412} alt="사진 들어올 자리"></Image>
          </D.ImageWrap>
          <li>
            <D.ScoreWrap>
              {[...Array(5)].map((_, index) => (
                  <D.Score key={index} filled={index < score}>
                      ★
                  </D.Score>
              ))}
            </D.ScoreWrap>
            <D.Date>2025년 6월 5일, 맑음</D.Date>
            <D.Feeling>
              <span>기분점수 |  </span>
              <span>4.5</span>
            </D.Feeling>
          </li>
          {/* 콘텐츠 내용부분 */}
          <D.ContentWrap>
            <D.Content>
              {contents}
            </D.Content>
          </D.ContentWrap>
        </D.Container>
      </div>
    )
}