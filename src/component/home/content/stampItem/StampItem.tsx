import { CenterColumn } from "@/styles/BaseComponents";
import { Img } from "@/styles/BaseStyledTags";
import { Font } from "@/styles/Typography";
import React from "react";
interface StampItemData {
  id: number;
  info: string;
  hasPassStamp: boolean;
}

export default function StampItem({ item }: { item: StampItemData }) {
  return (
    <CenterColumn width="100%" height="100%">
      <CenterColumn
        width="100%"
        height="auto"
        maxWidth="100px"
        style={{ aspectRatio: "1 / 1" }}
        position="relative"
      >
        <Font
          typo="c01_m"
          color="black"
          style={{ zIndex: 1, position: "relative" }}
        >
          {item.info}
        </Font>
        {item.hasPassStamp && (
          <Img
            src="/home/stamp/passedIcon.svg"
            width="80%"
            height="80%"
            position="absolute"
            top="0"
            left="0"
            right="0"
            bottom="0"
            margin="auto"
          />
        )}
      </CenterColumn>
    </CenterColumn>
  );
}
