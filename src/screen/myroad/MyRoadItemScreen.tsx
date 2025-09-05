import React from "react";

import { CenterColumn } from "@/styles/BaseComponents";
import MyRoadCalendar from "@/component/myroad/listItem/MyRoadCalendar";

export default function MyRoadItemScreen({ myroadid }: { myroadid: string }) {
  return (
    <CenterColumn>
      <p>Detail ID: {myroadid}</p>
      <MyRoadCalendar />
    </CenterColumn>
  );
}
