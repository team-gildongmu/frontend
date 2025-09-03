import { Config } from "@/styles/FontVariants";
import styled from "styled-components"

export const HeaderContainer = styled.header`
  width: 100%;
  max-width: 780px;
  background-color: #fff;
  position: fixed;
  top: 0;
  z-index: 9999;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px 20px;
`;

export const HeaderLogo = styled.h1`
 font: ${Config.variants.m01_bold_m}
 color: #0047AB;
`;

export const LanguageBtn = styled.button`
  border: none;
  width: 23px;
  height: auto;
  display: block;
  position: relative;
`;

export const Depth = styled.ul`
  background-color: #fff;
  border: 1px solid #ddd;
  padding: 5px 10px;
  position: absolute;
  top: 58px;
  right: 0;
`;

export const DepthBtn = styled.li`
  display: block;
  border: none;
  background: none;
  cursor: pointer;
  color: #999;
  padding: 3px 0;

  &:hover {
    text-decoration: underline;
    color: black;
  }
`;
