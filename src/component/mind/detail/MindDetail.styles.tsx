import colors from "@/styles/Colors"
import { Config } from "@/styles/FontVariants"
import { styled } from "styled-components"

export const Container = styled.ul`
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
    box-sizing: border-box;

    display: flex;
    flex-direction: column;
    align-content: center;
`

export const TitleWrap = styled.li`
    display: flex;
    align-items: center;
    padding: 16px;
    border-bottom: 1px solid #eee;
`

export const BackButton = styled.button`
  background: none;
  border: none;
  font-size: 14px;
  margin-right: 60px;
  cursor: pointer;
  color: #4a90e2;

  &:hover {
    text-decoration: underline;
  }
`;

export const Title = styled.h2`
    font: ${Config.variants.l01_bold_m};
`

export const ImageWrap = styled.li`

`
export const ScoreWrap = styled.div`
  display: flex;
  gap: 4px;
  margin-bottom: 8px;
`

export const Score = styled.span<{ filled: boolean }>`
  font-size: 24px;
  color: ${({ filled }) =>
    filled ? colors.red_300 : colors.gray_500};
`;

export const Date = styled.div`
    font: ${Config.variants.l01_bold_m};
    padding: 2px 0px;
`

export const Feeling = styled.div`
    font: ${Config.variants.l01_bold_m};
    padding: 2px 0px;
`
export const ContentWrap = styled.li`
    padding: 16px;
`

export const Content = styled.p`
    width: 400px;
    white-space: pre-wrap;
    word-break: break-word;
    overflow-wrap: break-word;
    font: ${Config.variants.l01_m};
`