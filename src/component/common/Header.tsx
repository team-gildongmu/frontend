import { useState } from "react";
import { HeaderContainer, LanguageBtn, HeaderLogo, Depth } from "./Header.styles";
import Image from "next/image";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleTrigger = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <HeaderContainer>
      <HeaderLogo>My Road</HeaderLogo>
      <ul>
        <li className="btn_depth">
          <LanguageBtn onClick={toggleTrigger}>
            <Image
              src="/language-button/language-button(ko).png"
              alt="logo"
              width={40}
              height={40}
            />
          </LanguageBtn>
        </li>
        {isOpen && (
          <Depth>
            <div>중국어</div>
            <div>한국어</div>
            <div>영어</div>
          </Depth>
        )}
      </ul>
    </HeaderContainer>
  );
};