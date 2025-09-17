"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { usePostUserMutation } from "@/queries/auth/usePostUserMutation";
import { Font } from "@/styles/Typography";
import LoadingSpinner from "@/component/common/LoadingSpinner";

export default function KakaoLogin() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const { mutate: postUserMutation, isPending: isPostUserLoading } =
    usePostUserMutation();

  useEffect(() => {
    if (code) {
      postUserMutation(code, {
        onSuccess: () => {
          setTimeout(() => {
            window.location.href = "/";
          }, 100);
        },
        onError: () => {
          setError("로그인에 실패했습니다. 다시 시도해주세요.");
        },
      });
    }
  }, [code, postUserMutation, router]);

  if (isPostUserLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <Font typo="m01_m" color="red_500">
        {error}
      </Font>
    );
  }

  return <></>;
}
