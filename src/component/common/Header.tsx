import { useState } from "react";
import { HeaderContainer, LanguageBtn, HeaderLogo, Depth, DepthBtn } from "./Header.styles";
import Image from "next/image";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleTrigger = () => {
    setIsOpen((prev) => !prev);
  };
  
  const languageChange = () => {
    // 언어 변경시에 UI 변경 코드 삽입
    setIsOpen(false)
  }


  return (
    <HeaderContainer>
      <HeaderLogo>My Road</HeaderLogo>
        <div>
          <LanguageBtn onClick={toggleTrigger}>
            <Image
              src="/language-button/language-button(ko).png"
              alt="logo"
              width={40}
              height={40}
            />
          </LanguageBtn>
        </div>
        {isOpen && (
          <Depth>
            <DepthBtn onClick={languageChange}>중국어</DepthBtn>
            <DepthBtn onClick={languageChange}>한국어</DepthBtn>
            <DepthBtn onClick={languageChange}>영어</DepthBtn>
          </Depth>
        )}
    </HeaderContainer>
  );
};