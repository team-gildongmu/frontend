"use client";

import { CenterColumn, CenterRow } from "@/styles/BaseComponents";
import { Button, Div } from "@/styles/BaseStyledTags";
import { Font } from "@/styles/Typography";
import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { Z_INDEX } from "@/styles/ZIndex";

export default function LoginScreen() {
  const { t } = useTranslation();

  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_RESTAPI_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URL}&response_type=code`;

  const onClickKakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <GradientBackground>
      <CenterColumn width="100%" height="100%" p="20px">
        <LoginCard>
          <CenterColumn mb="32px">
            <Font typo="m01_bold_m" color="blue_500" fontSize="32px">
              {t("login.title")}
            </Font>
            <Font
              typo="t01_ligh_m"
              color="gray_300"
              mt="8px"
              textAlign="center"
            >
              {t("login.subtitle")}
            </Font>
          </CenterColumn>

          <CenterColumn width="100%" mt="16px">
            <KakaoLoginButton onClick={onClickKakaoLogin}>
              <KakaoIcon />
              <Font color="gray_400" typo="t01_m">
                {t("login.kakaoLogin")}
              </Font>
            </KakaoLoginButton>
          </CenterColumn>

          <Font
            typo="c01_m"
            color="gray_300"
            mt="24px"
            textAlign="center"
            lineHeight="1.5"
          >
            {t("login.terms")}
          </Font>
        </LoginCard>
      </CenterColumn>
    </GradientBackground>
  );
}

const GradientBackground = styled(Div)`
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="rgba(0,71,171,0.03)"/><circle cx="75" cy="75" r="1" fill="rgba(0,71,171,0.03)"/><circle cx="50" cy="10" r="0.5" fill="rgba(0,71,171,0.02)"/><circle cx="10" cy="60" r="0.5" fill="rgba(0,71,171,0.02)"/><circle cx="90" cy="40" r="0.5" fill="rgba(0,71,171,0.02)"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
    opacity: 0.5;
  }
`;

// 로그인 카드 컨테이너
const LoginCard = styled(Div)`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 24px;
  padding: 48px 32px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  max-width: 400px;
  width: 90%;
  position: relative;
  z-index: ${Z_INDEX.CONTENT};
`;

const KakaoLoginButton = styled(Button)`
  background: #fee500;
  border-radius: 12px;
  padding: 16px 24px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3px;
  box-shadow: 0 4px 12px rgba(254, 229, 0, 0.3);
`;

const KakaoIcon = styled(CenterRow)`
  width: 25px;
  height: 25px;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 3C6.48 3 2 6.48 2 10.8c0 2.52 1.44 4.8 3.72 6.24L5.28 19.2l2.88-1.68c.96.24 1.92.36 2.88.36 5.52 0 10-3.48 10-7.8S17.52 3 12 3z" fill="%233C1E1E"/></svg>')
    center/contain no-repeat;
  margin-top: 2px;
`;
