import styled from "styled-components";

export const FooterContainer = styled.footer`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 70px;
  max-width: 780px;

  background-color: white;
  border-top: 1px solid #ddd;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;

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
  padding-top: 6px;
  font-size: 12px;
  color: #666;
`;

export const Icon = styled.div<{ $index: number; $active: boolean }>`
  width: 24px;
  height: 24px;
  background-image: url("./footer-image/tab-image.svg");
  background-size: 123px 48px;
  background-position: ${({ $index, $active }) =>
    `-${$index * 24}px ${$active ? "0" : "24px"}`};
  margin-bottom: 4px;
`;

export const Label = styled.span<{$active: boolean}>`
    display: inline-block;
    font-color: ${($active) => `${$active ? "#0047AB" : "#888888"}`};
`