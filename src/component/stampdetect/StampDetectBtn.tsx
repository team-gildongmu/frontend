import React from "react";
import { useTranslation } from "react-i18next";

import Icon from "@/component/common/IconifyIcon";

import colors from "@/styles/Colors";
import { Font } from "@/styles/Typography";
import { Button } from "@/styles/BaseStyledTags";
import { CenterRow } from "@/styles/BaseComponents";

interface StampDetectBtnProps {
  onClick?: () => void;
}

export default function StampDetectBtn({ onClick }: StampDetectBtnProps) {
  const { t } = useTranslation();

  return (
    <Button onClick={onClick} width="fit-content" minWidth="fit-content">
      <CenterRow
        gridGap="6px"
        p="8px 12px"
        borderRadius="8px"
        width="fit-content"
        minWidth="fit-content"
        textAlign="center"
        style={{ whiteSpace: "nowrap" }}
      >
        <Icon
          icon="mdi:map-marker-radius"
          width={20}
          height={20}
          color={colors.blue_500}
        />
        <Font typo="c04_m" color={colors.blue_500}>
          {t("stamp.detect.button")}
        </Font>
      </CenterRow>
    </Button>
  );
}
