"use client";

import colors from "@/styles/Colors";
import { useRouter } from "next/navigation";
import Icon from "@/component/common/IconifyIcon";
import styled from "styled-components";
import { Config } from "@/styles/FontVariants";

export default function PlusButton({ logId }: { logId: number }) {
  const router = useRouter();

  return (
    <PlusButtonWrap>
      <Icon icon="tdesign:edit-2" width="20" height="20" color={colors.blue_500} />
      <FloatingButton onClick={() => {
          router.push(`/mind/create?travel_log_id=${logId}`)}}>루트 후기 작성하기</FloatingButton>
    </PlusButtonWrap>
  );
}

const PlusButtonWrap = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  gap: 5px;
  width: 100%;
  background-color: white;
  border: 1px solid #0047ab;
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 2px 4px rgba(0, 71, 171, 0.1);
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 71, 171, 0.2);
  }
`

const FloatingButton = styled.span`
  display: block;
  font: ${Config.variants.c02_m};
`;