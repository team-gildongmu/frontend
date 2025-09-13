"use client";

import React, { useState } from "react";

import { CenterColumn } from "@/styles/BaseComponents";
import MyRoadCalendar from "@/component/myroad/listItem/MyRoadCalendar";
import MyRoadMap from "@/component/myroad/listItem/MyRoadMap";
import { Font } from "@/styles/Typography";
import { Button } from "@/styles/BaseStyledTags";
import Icon from "@/component/common/IconifyIcon";
import ListContainer from "@/component/myroad/listItem/ListContainer";
import { useTranslation } from "react-i18next";

export default function MyRoadItemScreen({ myroadid }: { myroadid: string }) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const { t } = useTranslation();

  console.log(myroadid);
  return (
    <CenterColumn>
      <ListContainer />
      <Button
        display="flex"
        flexDirection="row"
        alignItems="center"
        gridGap="5px"
        onClick={() => {
          setIsCalendarOpen(!isCalendarOpen);
        }}
        style={{ marginBottom: "10px" }}
      >
        <Icon icon="mdi:calendar" width="20" height="20" />
        <Font typo="c02_m" color="black">
          캘린더 등록하기
        </Font>
      </Button>

      <Button
        display="flex"
        flexDirection="row"
        alignItems="center"
        gridGap="5px"
        backgroundColor="white"
        border="1px solid #000"
        borderRadius="10px"
        padding="10px"
        onClick={() => {
          setIsMapOpen(!isMapOpen);
        }}
      >
        <Icon icon="mdi:map" width="20" height="20" />
        <Font typo="c02_m" color="black">
          {t("myroad.viewRouteOnMap")}
        </Font>
      </Button>
      <MyRoadCalendar
        isOpen={isCalendarOpen}
        onClose={() => setIsCalendarOpen(false)}
      />
      <MyRoadMap isOpen={isMapOpen} onClose={() => setIsMapOpen(false)} />
    </CenterColumn>
  );
}
