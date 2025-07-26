import {HeaderContainer, LanguageBtn} from "./Header.styles"
import Image from "next/image"

export const Header = () => (
  <HeaderContainer>
    <h1>My Road</h1>
    <ul>
      <li className="btn__depth">
        <LanguageBtn>
         <Image src="/language-button/language-button(ko).png" alt="logo" width={100} height={100}/>
        </LanguageBtn>
      </li>
      <li className="depth">
        <a href="">중국어</a>
        <a href="">한국어</a>
        <a href="">영어</a>
      </li>
    </ul>
  </HeaderContainer>
)


