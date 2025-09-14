"use client";

import React, { useState } from "react";

import { CenterColumn } from "@/styles/BaseComponents";
import MyRoadCalendar from "@/component/myroad/listItem/MyRoadCalendar";
import MyRoadMap from "@/component/myroad/listItem/kakaoMap/MyRoadMap";
import { Font } from "@/styles/Typography";
import { Button } from "@/styles/BaseStyledTags";
import Icon from "@/component/common/IconifyIcon";
import ListContainer from "@/component/myroad/listItem/ListContainer";
import MapBtn from "@/component/myroad/listItem/kakaoMap/MapBtn";

export default function MyRoadItemScreen({ myroadid }: { myroadid: string }) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);

  return (
    <CenterColumn p="20px" gridGap="15px">
      <ListContainer myroadid={Number(myroadid)} />
      <MapBtn isOpen={isMapOpen} setIsOpen={setIsMapOpen} />
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

      <MyRoadCalendar
        isOpen={isCalendarOpen}
        onClose={() => setIsCalendarOpen(false)}
      />
      <MyRoadMap
        isOpen={isMapOpen}
        onClose={() => setIsMapOpen(false)}
        myroadid={Number(myroadid)}
      />
    </CenterColumn>
  );
}
