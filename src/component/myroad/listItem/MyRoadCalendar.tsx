import { CenterColumn } from "@/styles/BaseComponents";
import React from "react";
import Calendar from "react-calendar";

export default function MyRoadCalendar() {
  return (
    <CenterColumn width="100%" height="100%" p="10px">
      <Calendar />
    </CenterColumn>
  );
}
