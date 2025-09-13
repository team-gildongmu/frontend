import { CenterColumn } from "@/styles/BaseComponents";
import { Font } from "@/styles/Typography";
import React from "react";
import Icon from "@/component/common/IconifyIcon";
import colors from "@/styles/Colors";

interface EmptyProps {
  text?: string;
}

export default function Empty({ text }: EmptyProps) {
  return (
    <CenterColumn width="100%" height="100%" gridGap="12px" py="20px">
      <Icon
        icon="mdi:alert-circle-outline"
        width="40"
        height="40"
        color={colors.gray_300}
      />
      <Font typo="c02_m" color="gray_500">
        {text || "데이터가 없습니다."}
      </Font>
    </CenterColumn>
  );
}
