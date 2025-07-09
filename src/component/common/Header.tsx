import styled from "styled-components";

export const Header = () => <HeaderContainer>헤더 영역입니다</HeaderContainer>;

const HeaderContainer = styled.header`
  width: 100%;
  max-width: 780px;
  height: 41px;
  background-color: beige;
  position: fixed;
  top: 0;
  z-index: 100;
`;
