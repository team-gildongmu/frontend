"use client";
import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { usePostUserMutation } from "@/queries/auth/usePostUserMutation";

export default function KakaoLogin() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const router = useRouter();

  const { mutate: postUserMutation, isPending: isPostUserLoading } =
    usePostUserMutation();

  useEffect(() => {
    if (code) {
      postUserMutation(code);
    }
    router.push("/");
  }, [code, postUserMutation, router]);

  return <>{isPostUserLoading ? <div>Loading...</div> : <></>}</>;
}
