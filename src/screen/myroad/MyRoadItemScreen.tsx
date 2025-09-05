import React from "react";

import { CenterColumn } from "@/styles/BaseComponents";

export default function MyRoadItemScreen({ myroadid }: { myroadid: string }) {
  return (
    <CenterColumn>
      <p>Detail ID: {myroadid}</p>
    </CenterColumn>
  );
}
