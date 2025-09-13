import { Row } from "@/styles/BaseComponents";
import { Config } from "@/styles/FontVariants";
import { Z_INDEX } from "@/styles/ZIndex";
import styled from "styled-components";

export const HeaderContainer = styled.header`
  width: 100%;
  max-width: 780px;
  background-color: #fff;
  position: fixed;
  top: 0;
  z-index: ${Z_INDEX.HEADER};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px 20px;
  height: 47px;
`;

export const HeaderLogo = styled.h1`
  font: ${Config.variants.m01_bold_m};
  color: #0047ab;
`;

export const LanguageBtn = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  display: block;
  position: relative;
  padding: 8px 12px;
  border-radius: 8px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f5f5f5;
  }
`;

export const LanguageDisplay = styled(Row)`
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #333;
`;

export const ChevronIcon = styled.div<{ $isOpen: boolean }>`
  display: flex;
  align-items: center;
  transition: transform 0.2s ease;
  transform: ${({ $isOpen }) => ($isOpen ? "rotate(180deg)" : "rotate(0deg)")};
`;

export const Depth = styled.ul`
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 8px 0;
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  min-width: 140px;
  z-index: 1000;
  animation: slideDown 0.2s ease-out;

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const DepthBtn = styled.li<{ $isSelected: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  border: none;
  background: none;
  cursor: pointer;
  color: ${({ $isSelected }) => ($isSelected ? "#0047ab" : "#666")};
  padding: 8px 16px;
  font-size: 14px;
  font-weight: ${({ $isSelected }) => ($isSelected ? "600" : "400")};
  transition: all 0.2s ease;
  width: 100%;

  &:hover {
    background-color: #f8f9fa;
    color: #0047ab;
  }

  &:first-child {
    border-radius: 8px 8px 0 0;
  }

  &:last-child {
    border-radius: 0 0 8px 8px;
  }
`;
