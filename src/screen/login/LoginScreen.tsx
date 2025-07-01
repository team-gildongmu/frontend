import { CenterColumn } from "@/styles/BaseComponents";
import { Img } from "@/styles/BaseStyledTags";
import React from "react";

export default function LoginScreen() {
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_RESTAPI_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URL}&response_type=code`;

  const onClickKakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <CenterColumn>
      <Img
        src="/login/kakao_login_ko.png"
        width="80%"
        onClick={onClickKakaoLogin}
      />
    </CenterColumn>
  );
}
