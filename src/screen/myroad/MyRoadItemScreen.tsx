"use client";

import React, { useState } from "react";

import { CenterColumn } from "@/styles/BaseComponents";
import MyRoadCalendar from "@/component/myroad/listItem/MyRoadCalendar";
import { Font } from "@/styles/Typography";
import { Button } from "@/styles/BaseStyledTags";
import Icon from "@/component/common/IconifyIcon";

export default function MyRoadItemScreen({ myroadid }: { myroadid: string }) {
  const calendarInfo = [
    {
      id: 1,
      date: "2025-01-01",
      title: "캘린더 등록",
      description: "캘린더 등록",
    },
  ];

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  return (
    <CenterColumn>
      <p>Detail ID: {myroadid}</p>
      <Button
        display="flex"
        flexDirection="row"
        alignItems="center"
        gridGap="5px"
        onClick={() => {
          setIsCalendarOpen(!isCalendarOpen);
        }}
      >
        <Icon icon="mdi:calendar" width="20" height="20" />
        <Font typo="c02_m" color="black">
          캘린더 등록하기
        </Font>
      </Button>
      {isCalendarOpen && (
        <MyRoadCalendar
          isOpen={isCalendarOpen}
          onClose={() => setIsCalendarOpen(false)}
        />
      )}
    </CenterColumn>
  );
}
