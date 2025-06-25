"use client";

import { useGetTestDataQuery } from "@/queries/test/useGetTestData";

export default function Home() {
  const { data } = useGetTestDataQuery();
  return (
    <>
      <h1>길동무</h1>
      {data}
    </>
  );
}
