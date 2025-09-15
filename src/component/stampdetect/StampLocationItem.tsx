import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import Icon from "@/component/common/IconifyIcon";
import { Font } from "@/styles/Typography";
import { Column, Row } from "@/styles/BaseComponents";
import { StampDetectLocation } from "@/types/stamp";
import colors from "@/styles/Colors";
import { Button } from "@/styles/BaseStyledTags";

interface StampLocationItemProps {
  location: StampDetectLocation;
}

export default function StampLocationItem({
  location,
}: StampLocationItemProps) {
  const { t } = useTranslation();

  const handleStamp = (locationId: string) => {
    console.log("스탬프 찍기:", locationId);
  };

  return (
    <Column
      key={location.id}
      width="100%"
      height="auto"
      border={`1px solid ${colors.gray_300}`}
      borderRadius="12px"
      padding="16px"
      backgroundColor={colors.gray_50}
      gridGap="8px"
    >
      <Row width="100%" justifyContent="space-between" textAlign="left">
        <Font typo="t01_l_bold" color="black">
          {location.title}
        </Font>
        <Font typo="c05_m" color="gray_300">
          {location.distance_km}
          {t("stamp.detect.distance")}
        </Font>
      </Row>
      <Font typo="t01_ligh_m" color="gray_500" width="100%" textAlign="left">
        {t("stamp.detect.latitude")}: {location.latitude.toFixed(6)},{" "}
        {t("stamp.detect.longitude")}: {location.longitude.toFixed(6)}
      </Font>
      <StampButton
        $isStamped={false}
        onClick={() => handleStamp(location.id.toString())}
      >
        <Icon icon="mdi:stamp" width={16} height={16} />
        <Font typo="c05_m" color="white">
          {t("stamp.detect.stampButton")}
        </Font>
      </StampButton>
    </Column>
  );
}

const StampButton = styled(Button)<{ $isStamped: boolean }>`
  background: ${({ $isStamped }) =>
    $isStamped ? colors.gray_300 : colors.blue_400};
  border-radius: 8px;
  padding: 8px 16px;
  width: fit-content;
`;
