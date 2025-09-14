import React from "react";

import { Font } from "@/styles/Typography";
import { Button } from "@/styles/BaseStyledTags";
import Icon from "@/component/common/IconifyIcon";
import { useTranslation } from "react-i18next";
import colors from "@/styles/Colors";

export default function MapBtn({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) {
  const { t } = useTranslation();

  return (
    <>
      <Button
        display="flex"
        width="100%"
        flexDirection="row"
        alignItems="center"
        gridGap="5px"
        backgroundColor="white"
        border="1px solid #0047AB"
        borderRadius="10px"
        padding="15px"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        style={{
          boxShadow: "0 2px 4px rgba(0, 71, 171, 0.1)",
          transition: "all 0.2s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 71, 171, 0.2)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = "0 2px 4px rgba(0, 71, 171, 0.1)";
        }}
      >
        <Icon icon="mdi:map" width="20" height="20" color={colors.blue_500} />
        <Font typo="c02_m" color="black">
          {t("myroad.viewRouteOnMap")}
        </Font>
      </Button>
    </>
  );
}
