interface ITypoProps {
  typo?: string;
}

const Config = {
  prop: "typo",
  variants: {
    t01_semi_b: {
      fontFamily: "Noto Sans KR, sans-serif",
      fontWeight: "600",
      fontSize: "24px",
      lineHeight: "normal",
    },
  },
};

export type { ITypoProps };
export { Config };
