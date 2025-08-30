import React from "react";

interface MyRoadDetailPageProps {
  params: {
    myroadid: string;
  };
}

export default function MyRoadDetailPage({ params }: MyRoadDetailPageProps) {
  const { myroadid } = params;

  return (
    <div>
      <h1>MyRoad 상세 페이지</h1>
      <p>Detail ID: {myroadid}</p>
    </div>
  );
}
