"use client";
import React from "react";
import { useSearchParams } from "next/navigation";

export default function KakaoLogin() {
  const searchParams = useSearchParams();
  const code = searchParams.get('code');

  return <div>code 입니다. {code}</div>;
}