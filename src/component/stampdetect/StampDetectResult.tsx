import React from "react";
import { useTranslation } from "react-i18next";

import Icon from "@/component/common/IconifyIcon";
import StampLocationItem from "@/component/stampdetect/StampLocationItem";

import { StampDetectLocation } from "@/types/stamp";

import { Font } from "@/styles/Typography";
import { CenterColumn, Column } from "@/styles/BaseComponents";

interface StampDetectModalProps {
  stampLocations: StampDetectLocation[];
}

export default function StampDetectResult({
  stampLocations,
}: StampDetectModalProps) {
  const { t } = useTranslation();

  return (
    <>
      {stampLocations.length > 0 ? (
        <Column gridGap="12px">
          {stampLocations.map((location) => (
            <StampLocationItem key={location.id} location={location} />
          ))}
        </Column>
      ) : (
        <CenterColumn gridGap="16px" p="40px 20px">
          <Icon
            icon="mdi:map-marker-off"
            width={48}
            height={48}
            color="gray_500"
          />
          <CenterColumn gridGap="4px">
            <Font typo="c04_m" color="gray_500">
              {t("stamp.detect.noLocations")}
            </Font>
            <Font typo="c04_m" color="gray_500">
              {t("stamp.detect.noLocationsDescription")}
            </Font>
          </CenterColumn>
        </CenterColumn>
      )}
    </>
  );
}
