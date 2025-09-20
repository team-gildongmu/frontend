"use client";

import React, { useState } from "react";

import { CenterColumn } from "@/styles/BaseComponents";
import MyRoadMap from "@/component/myroad/listItem/kakaoMap/MyRoadMap";
import ListContainer from "@/component/myroad/listItem/ListContainer";
import MapBtn from "@/component/myroad/listItem/kakaoMap/MapBtn";
import PlusButton from "@/component/mind/list/PlusButton";

export default function MyRoadItemScreen({ myroadid }: { myroadid: string }) {
  const [isMapOpen, setIsMapOpen] = useState(false);

  return (
    <CenterColumn p="20px" gridGap="15px">
      <ListContainer myroadid={Number(myroadid)} />
      <MapBtn isOpen={isMapOpen} setIsOpen={setIsMapOpen} />
      <PlusButton logId={Number(myroadid)} />

      <MyRoadMap
        isOpen={isMapOpen}
        onClose={() => setIsMapOpen(false)}
        myroadid={Number(myroadid)}
      />
    </CenterColumn>
  );
}
