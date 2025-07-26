import styled from "styled-components";

export const Header = () => (
  <HeaderContainer>
    <h1>AAA</h1>
    <ul>
      <li className="btn__depth">
        <a href="">언어 변경이미지</a>
      </li>
      <li className="depth">
        <a href="">중국어</a>
        <a href="">한국어</a>
        <a href="">영어</a>
      </li>
    </ul>
  </HeaderContainer>
)

const HeaderContainer = styled.header`
  width: 100%;
  max-width: 780px;
  height: 41px;
  background-color: beige;
  position: fixed;
  top: 0;
  z-index: 9999;
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
`;
