"use client";
import React from "react";
import styled from "styled-components";
import { CenterColumn } from "@/styles/BaseComponents";
import { Header } from "@/component/common/Header";
import Footer from "@/component/common/Footer";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Main>
      <Header />
      <ContentContainer>{children}</ContentContainer>
      <Footer />
    </Main>
  );
}

const Main = styled.main`
  display: flex;
  flex-direction: column;
  max-width: 780px;
  width: 100%;
  height: 100dvh;
  margin: 0 auto;
  position: relative;
`;

const ContentContainer = styled(CenterColumn)`
  flex: 1;
  width: 100%;
  max-width: 780px;
  overflow-y: auto;
  padding-top: 41px; /* 실제 헤더 높이에 맞게 조정 필요 */
  padding-bottom: 70px; /* 실제 탭바 높이에 맞게 조정 필요 */
  min-height: 0;
`;
