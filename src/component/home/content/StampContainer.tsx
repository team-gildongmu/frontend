import { Grid } from "@/styles/BaseComponents";
import React from "react";
import StampItem from "./stampItem/StampItem";

export default function StampContainer() {
  const stampItemData = [
    {
      id: 1,
      info: "강원도 강릉",
      hasPassStamp: true,
    },
    {
      id: 2,
      info: "서울 명동 거리",
      hasPassStamp: true,
    },
    {
      id: 3,
      info: "제주도 올레길 전문가",
      hasPassStamp: false,
    },
    {
      id: 4,
      info: "강남",
      hasPassStamp: false,
    },

    {
      id: 5,
      info: "안국",
      hasPassStamp: true,
    },

    {
      id: 6,
      info: "순천만 습지",
      hasPassStamp: false,
    },
  ];
  return (
    <Grid width="100%" height="100%" gridTemplateColumns="repeat(2, 1fr)">
      {stampItemData.map((item) => (
        <StampItem key={item.id} item={item} />
      ))}
    </Grid>
  );
}
