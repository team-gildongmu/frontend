"use client";

import { useGetTestDataQuery } from "@/queries/test/useGetTestData";

// 메인 홈 페이지
export default function Home() {
  const { data } = useGetTestDataQuery();
  return (
    <>
      <h1>길동무</h1>
      {data}
    </>
  );
}
