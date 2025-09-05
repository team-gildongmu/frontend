import React from "react";

import MyRoadItemScreen from "@/screen/myroad/MyRoadItemScreen";

interface MyRoadDetailPageProps {
  params: Promise<{
    myroadid: string;
  }>;
}

export default async function MyRoadDetailPage({
  params,
}: MyRoadDetailPageProps) {
  const { myroadid } = await params;

  return <MyRoadItemScreen myroadid={myroadid} />;
}
