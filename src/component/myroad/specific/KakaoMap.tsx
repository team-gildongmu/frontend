import React from "react";

import { CenterColumn } from "@/styles/BaseComponents";
import { Map } from "react-kakao-maps-sdk";

export default function KakaoMap() {
  return (
    <CenterColumn width="100vw" height="100vh">
      <Map
        center={{ lat: 33.450701, lng: 126.570667 }}
        style={{ width: "100%", height: "100%" }}
        level={3}
      />
    </CenterColumn>
  );
}
