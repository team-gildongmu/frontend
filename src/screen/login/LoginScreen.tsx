"use client";

import { CenterColumn, Column } from "@/styles/BaseComponents";
import { Img } from "@/styles/BaseStyledTags";
import { Font } from "@/styles/Typography";
import React from "react";

export default function LoginScreen() {
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_RESTAPI_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URL}&response_type=code`;

  const onClickKakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <Column width="100%" height="100%">
      <CenterColumn pt="106px" gridGap="28px">
        <Font typo="m01_bold_m" color="blue_500">
          My Road
        </Font>
        <Img
          src="/login/kakao_login_ko.png"
          width="80%"
          onClick={onClickKakaoLogin}
        />
      </CenterColumn>
    </Column>
  );
}
