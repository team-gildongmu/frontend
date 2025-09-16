import colors from "@/styles/Colors";
import { Z_INDEX } from "@/styles/ZIndex";
import styled from "styled-components";

export const FooterContainer = styled.footer`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 47px;
  max-width: 780px;

  background-color: white;
  border-top: 1px solid #ddd;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: ${Z_INDEX.FOOTER};

  ul {
    display: flex;
    justify-content: space-between;
    width: 100%;
    max-width: 600px;
    padding: 0 10px;
    list-style: none;
  }

  li {
    flex: 1;
    text-align: center;
  }
`;

export const NavItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 12px;
  color: #666;
`;

export const IconWrapper = styled.div<{ $active: boolean }>`
  width: 24px;
  height: 24px;
  margin-bottom: 2px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ $active }) => ($active ? "#0047AB" : "#888888")};
  transition: color 0.2s ease;
`;

export const Label = styled.span<{ $active: boolean }>`
  display: inline-block;
  color: ${({ $active }) => ($active ? colors.blue_500 : colors.gray_300)};
  font-size: 10px;
  font-weight: 500;
`;
