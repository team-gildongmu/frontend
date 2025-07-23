"use client";

import React, { useState } from "react";
import KakaoMap from "@/component/myroad/specific/KakaoMap";
import { CenterColumn, CenterRow } from "@/styles/BaseComponents";
import useDocumentOverflow from "@/hooks/useDocumentOverflow";

export default function MyroadSpecificScreen() {
  const [openMapModal, setOpenMapModal] = useState(false);

  useDocumentOverflow({ openModal: openMapModal });

  return (
    <CenterColumn>
      <CenterRow width="237px" height="33px">
        <CenterRow
          backgroundColor="green_300"
          onClick={() => setOpenMapModal(true)}
        >
          지도로 루트보기
        </CenterRow>
      </CenterRow>
      {openMapModal && <KakaoMap />}
    </CenterColumn>
  );
}
