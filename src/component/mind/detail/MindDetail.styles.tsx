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
  cursor: pointer;
  color: #4a90e2;

  &:hover {
    text-decoration: underline;
  }
`;

export const Title = styled.p`
  display: flex;
  align-items: center;
  min-width: 300px;
  justify-content: center;
  gap: 15px;
  font: ${Config.variants.l01_bold_m};
`

export const ImageWrap = styled.li`
  width: 100%;
  height: 300px;
  background-color:${colors.gray_400};
`

export const TagWrapper = styled.li`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin: 10px 0;
`;

export const Tag = styled.span`
  background-color: #e6f0ff;   
  color: ${colors.blue_500};             
  padding: 4px 10px;
  border-radius: 12px;
  font: ${Config.variants.t01_ligh_m}
  white-space: nowrap;
`;

export const Information = styled.li`
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  margin: 10px 0;
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

export const DateWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background-color:
`;

export const Period = styled.span`
  font: ${Config.variants.l01_bold_m}
  color: ${colors.gray_500};
`;

export const Feeling = styled.div`
  font: ${Config.variants.l01_bold_m};
  padding: 2px 0px;
`
export const ContentWrap = styled.li`
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
`

export const Content = styled.p`
    width: 100%;
    white-space: pre-wrap;
    word-break: break-word;
    overflow-wrap: break-word;
    font: ${Config.variants.t01_ligh_m};
`