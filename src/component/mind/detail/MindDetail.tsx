"use client"

import { useRouter } from "next/navigation";
import * as D from "@/component/mind/detail/MindDetail.styles"
import Image from "next/image";
import Icon from "@/component/common/IconifyIcon";
import colors from "@/styles/Colors";

type Props = {
  id: number;
};

export default function MindDetail ({id}: Props) {
  console.log('id 값은 잘 받아와짐', id)
  const router = useRouter();
  const score = "3";
  const contents = "오늘은 강릉에서 하루를 보냈다. 파란 하늘과 맑은 공기 덕분에 마음이 차분해졌다. 카페에서 마신 커피도 좋았고, 오랜만에 혼자만의 시간을 즐길 수 있었다.";
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
            <D.Title>📖 강릉에서의 멈춤</D.Title>
          </D.TitleWrap>
          <D.ImageWrap>
            <Image
              src={"/mind-test-image/mind-test-image.png"}
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
                  <D.Score key={index} filled={index < Number(score)}>
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
          <D.ContentWrap>
            <D.Content>
              {contents}
            </D.Content>
          </D.ContentWrap>
        </D.Container>
      </div>
    )
}