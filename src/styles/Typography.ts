'use client'

import styled from "styled-components";
import { Div } from "@/styles/BaseStyledTags";
import { Noto_Sans_KR } from "next/font/google";

const Default = styled(Div)`
  white-space: pre-line;

  word-break: normal;
  word-wrap: break-word;
  overflow-wrap: break-word;
  letter-spacing: -0.1px;
`;

const Font = styled(Default)``;

export const noto_300 = Noto_Sans_KR({
  weight: "300",
  subsets: ["latin"],
});
const fonts = { noto_300 };

export { Font, fonts };
