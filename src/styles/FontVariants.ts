interface ITypoProps {
  typo?: string;
}

const Config = {
  prop: "typo",
  variants: {
    m01_bold_m: {
      // Main Logo
      fontFamily: "Nunito-Extra, sans-serif",
      fontWeight: "700",
      fontSize: "35px",
      lineHeight: "normal",
    },
    m01_m: {
      // Header-logo
      fontFamily: "Nunito-Extra, sans-serif",
      fontWeight: "400",
      fontSize: "12px",
      lineHeight: "normal",
    },
    m01_sb_m: {
      // Header-logo
      fontFamily: "Noto Sans KR, sans-serif",
      fontWeight: "700",
      fontSize: "12px",
      lineHeight: "normal",
    },
    c01_m: {
      // 캡션 주석등
      fontFamily: "Noto Sans KR, sans-serif",
      fontWeight: "500",
      fontSize: "10px",
      lineHeight: "normal",
    },
    l01_m: {
      // 일기 후기 평텍스트
      fontFamily: "Noto Sans KR, sans-serif",
      fontWeight: "400",
      fontSize: "14px",
      lineHeight: "normal",
    },
    l01_bold_m: {
      // 일기 후기 강조 텍스트
      fontFamily: "Noto Sans KR, sans-serif",
      fontWeight: "700",
      fontSize: "14px",
      lineHeight: "normal",
    },
    t01_m: {
      // 제목, 질문 강조 텍스트
      fontFamily: "Noto Sans KR, sans-serif",
      fontWeight: "700",
      fontSize: "15px",
      lineHeight: "normal",
    },
    t01_bold_m: {
      // 일기 제목
      fontFamily: "Noto Sans KR, sans-serif",
      fontWeight: "700",
      fontSize: "20px",
      lineHeight: "normal",
    },
    t02_m: {
      fontFamily: "Noto Sans KR, sans-serif",
      fontWeight: "700",
      fontSize: "8px",
      lineHeight: "normal",
    },
    c02_m: {
      // 카테고리 텍스트
      fontFamily: "Noto Sans KR, sans-serif",
      fontWeight: "500",
      fontSize: "9px",
      lineHeight: "normal",
    },
    c02_s: {
      fontFamily: "Noto Sans KR, sans-serif",
      fontWeight: "400",
      fontSize: "7px",
      lineHeight: "normal",
    },
    c03_m: {
      fontFamily: "Noto Sans KR, sans-serif",
      fontWeight: "400",
      fontSize: "5px",
      lineHeight: "normal",
    },
  },
};

export type { ITypoProps };
export { Config };
