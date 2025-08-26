"use client";
import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { usePostUserMutation } from "@/queries/auth/usePostUserMutation";

export default function KakaoLogin() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const router = useRouter();

  const { mutate: postUserMutation } = usePostUserMutation();

  useEffect(() => {
    if (code) {
      postUserMutation(code);
    }
    router.push("/");
  }, [code]);

  return <></>;
}
