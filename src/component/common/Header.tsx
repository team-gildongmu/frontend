import { useState, useCallback } from "react";
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
  const [isChanging, setIsChanging] = useState(false);
  const { languages, currentLanguage } = useLanguages();

  const languageChange = useCallback(
    async (lang: string) => {
      if (isChanging) return; // 이미 변경 중이면 무시

      setIsChanging(true);
      setIsOpen(false);

      try {
        await setLanguage(lang);
        // 언어 변경 후 잠시 대기 (UI 업데이트를 위해)
        setTimeout(() => {
          setIsChanging(false);
        }, 100);
      } catch (error) {
        console.error("언어 변경 실패:", error);
        setIsChanging(false);
      }
    },
    [isChanging]
  );

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
        <LanguageBtn
          onClick={() => !isChanging && setIsOpen((prev) => !prev)}
          disabled={isChanging}
        >
          <LanguageDisplay>
            <Icon
              icon={getLanguageIcon(
                languages.find((lang) => lang.selected)?.locale || "ko"
              )}
              width={20}
              height={15}
            />
            <Font typo="l01_bold_m" color="black">
              {isChanging ? "변경중..." : currentLanguage}
            </Font>
            <ChevronIcon $isOpen={isOpen}>
              <Icon icon="mdi:chevron-down" width={16} height={16} />
            </ChevronIcon>
          </LanguageDisplay>
        </LanguageBtn>
      </div>

      {isOpen && !isChanging && (
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
