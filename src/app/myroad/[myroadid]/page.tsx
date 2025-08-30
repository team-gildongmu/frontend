import React from "react";

interface MyRoadDetailPageProps {
  params: Promise<{
    myroadid: string;
  }>;
}

export default async function MyRoadDetailPage({
  params,
}: MyRoadDetailPageProps) {
  const { myroadid } = await params;

  return (
    <div>
      <h1>MyRoad 상세 페이지</h1>
      <p>Detail ID: {myroadid}</p>
    </div>
  );
}
