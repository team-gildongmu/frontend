"use client";
import React from "react";
import styled from "styled-components";
import { Column } from "@/styles/BaseComponents";
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

  @media (max-width: 380px) {
    min-width: 380px;
    overflow-x: auto;
  }
`;

const ContentContainer = styled(Column)`
  flex: 1;
  width: 100%;
  max-width: 780px;
  overflow-y: auto;
  padding-top: 47px; 
  padding-bottom: 47px;
  min-height: 0;
  align-items: stretch;
`;
