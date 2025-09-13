import { useState } from "react";
import {
  HeaderContainer,
  LanguageBtn,
  HeaderLogo,
  Depth,
  DepthBtn,
  LanguageDisplay,
  ChevronIcon,
} from "./Header.styles";
import Link from "next/link";
import { setLanguage } from "@/hooks/useLang";
import { useLanguages } from "@/hooks/useLang";
import Icon from "@/component/common/IconifyIcon";
import { Font } from "@/styles/Typography";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { languages, currentLanguage } = useLanguages();

  const languageChange = (lang: string) => {
    setLanguage(lang);
    setIsOpen(false);
  };

  const getLanguageIcon = (locale: string) => {
    switch (locale) {
      case "ko":
        return "flag:kr-4x3";
      case "en":
        return "flag:us-4x3";
      case "ja":
        return "flag:jp-4x3";
      default:
        return "mdi:translate";
    }
  };

  return (
    <HeaderContainer>
      <HeaderLogo>
        <Link href="/">My Road</Link>
      </HeaderLogo>

      <div>
        <LanguageBtn onClick={() => setIsOpen((prev) => !prev)}>
          <LanguageDisplay>
            <Icon
              icon={getLanguageIcon(
                languages.find((lang) => lang.selected)?.locale || "ko"
              )}
              width={20}
              height={15}
            />
            <Font typo="l01_bold_m" color="black">
              {currentLanguage}
            </Font>
            <ChevronIcon $isOpen={isOpen}>
              <Icon icon="mdi:chevron-down" width={16} height={16} />
            </ChevronIcon>
          </LanguageDisplay>
        </LanguageBtn>
      </div>

      {isOpen && (
        <Depth>
          {languages.map((lang) => (
            <DepthBtn
              key={lang.locale}
              onClick={() => languageChange(lang.locale)}
              $isSelected={lang.selected}
            >
              <Icon
                icon={getLanguageIcon(lang.locale)}
                width={20}
                height={15}
              />
              <Font typo="c04_m" color="black">
                {lang.label}
              </Font>
            </DepthBtn>
          ))}
        </Depth>
      )}
    </HeaderContainer>
  );
};
