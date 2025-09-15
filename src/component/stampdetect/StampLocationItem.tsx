import React, { useState } from "react";
import Lottie from "react-lottie-player";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

import Icon from "@/component/common/IconifyIcon";

import usePatchStampMutation from "@/queries/stamps/usePatchStampMutation";
import { StampDetectLocation } from "@/types/stamp";

import { Font } from "@/styles/Typography";
import { Column, Row } from "@/styles/BaseComponents";
import colors from "@/styles/Colors";
import { Button } from "@/styles/BaseStyledTags";

import StampLottie from "@/json/StampLottie.json";
interface StampLocationItemProps {
  location: StampDetectLocation;
}

export default function StampLocationItem({
  location,
}: StampLocationItemProps) {
  const { t } = useTranslation();

  const { mutate: patchStamp } = usePatchStampMutation();

  const [isStamped, setIsStamped] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);

  const handleStamp = (locationId: string) => {
    patchStamp(
      { stamp_id: Number(locationId) },
      {
        onSuccess: () => {
          setIsStamped(true);
        },
      }
    );
    setShowAnimation(true);

    setTimeout(() => {
      setShowAnimation(false);
    }, 3000);
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
      {showAnimation && (
        <LottieWrapper>
          <Lottie
            animationData={StampLottie}
            style={{ width: "100%", height: "100%" }}
            play
            loop={false}
          />
        </LottieWrapper>
      )}
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
        $isStamped={isStamped}
        onClick={() => handleStamp(location.id.toString())}
        disabled={isStamped}
      >
        <Row gridGap="5px">
          <Icon
            icon={isStamped ? "mdi:check" : "mdi:map-marker-plus"}
            color={colors.white}
            width={20}
            height={20}
          />
          <Font typo="c05_m" color="white">
            {isStamped
              ? t("stamp.detect.stampedButton")
              : t("stamp.detect.stampButton")}
          </Font>
        </Row>
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

const LottieWrapper = styled.div`
  position: absolute;
  z-index: 4;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
`;
