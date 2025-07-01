import React from "react";
import styled from "styled-components";

export default function Footer() {
  return <FooterContainer>Footer</FooterContainer>;
}

const FooterContainer = styled.footer`
  width: 100%;
  max-width: 780px;
  background-color: blueviolet;
  position: fixed;
  bottom: 0;
  z-index: 100;
`;
