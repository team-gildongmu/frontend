import { useState, useCallback } from "react";
import Link from "next/link";

import {
  HeaderContainer,
  LanguageBtn,
  HeaderLogo,
  Depth,
  DepthBtn,
  LanguageDisplay,
  ChevronIcon,
} from "@/component/common/Header.styles";
import Icon from "@/component/common/IconifyIcon";
import LoadingSpinner from "@/component/common/LoadingSpinner";
import StampDetectBtn from "@/component/stampdetect/StampDetectBtn";
import StampDetectModal from "@/component/stampdetect/StampDetectModal";

import { setLanguage } from "@/hooks/useLang";
import { useLanguages } from "@/hooks/useLang";

import { Font } from "@/styles/Typography";
import { CenterRow } from "@/styles/BaseComponents";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isChanging, setIsChanging] = useState(false);
  const [isStampModalOpen, setIsStampModalOpen] = useState(false);
  const { languages, currentLanguage } = useLanguages();

  const languageChange = useCallback(
    async (lang: string) => {
      if (isChanging) return;

      setIsChanging(true);
      setIsOpen(false);

      try {
        await setLanguage(lang);
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

      <CenterRow gridGap="10px" width="auto" flexWrap="nowrap">
        <StampDetectBtn onClick={() => setIsStampModalOpen(true)} />
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
              {isChanging ? <LoadingSpinner /> : currentLanguage}
            </Font>
            <ChevronIcon $isOpen={isOpen}>
              <Icon icon="mdi:chevron-down" width={16} height={16} />
            </ChevronIcon>
          </LanguageDisplay>
        </LanguageBtn>
      </CenterRow>

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

      {/* 근처 스탬프 찾기 모달 */}
      <StampDetectModal
        isOpen={isStampModalOpen}
        onClose={() => setIsStampModalOpen(false)}
      />
    </HeaderContainer>
  );
};
