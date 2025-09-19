import styled from "styled-components";
import colors from "@/styles/Colors";
import { Config } from "@/styles/FontVariants"

export const Wrap = styled.div`
  width : 90%;
  display: block;
  background: #fff;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  }
`;

export const TitleWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
`;

export const Title__l = styled.div`
  cursor: pointer;
`;

export const Title = styled.h4`
  font: ${Config.variants.t01_bold_m};
  margin-bottom: 6px;
`;

export const ScoreWrap = styled.div`
  display: flex;
  gap: 4px;
`;

export const Score = styled.span<{ filled: boolean }>`
  font-size: 20px;
  color: ${({ filled }) =>
    filled ? colors.red_300 : colors.gray_500};
  transition: color 0.2s ease-in-out;
`;

export const DateWrap = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #555;
  margin-top: 4px;
`;

export const Period = styled.span`
  font-weight: 500;
  color: #222;
  margin-right: 8px;
`;

export const Title__r = styled.div`
  position: relative;
`;

export const ImgWrapper = styled.div`
  width: 100%;
  margin-top: 12px;

  img {
    border-radius: 8px;
    object-fit: cover;
  }
`;

export const Setting_btn = styled.button`
  padding: 6px 10px;
  border: none;
  border-radius: 6px;
  background: #f5f5f5;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background: ${colors.gray_300};
  }
`;

export const Setting_conform = styled.ul<{ $open: boolean }>`
  position: absolute;
  top: 28px;
  right: 0;
  z-index: 999;
  list-style: none;
  margin: 0;
  padding: 4px 0;
  background: #fff;
  border: 1px solid ${colors.gray_400};
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);

  display: ${({ $open }) => ($open ? "block" : "none")};
`;

export const Update = styled.li`
  padding: 6px 12px;
  cursor: pointer;
  border-radius: 6px;

  &:hover {
    background: #f9f9f9;
  }
`;

export const Delete = styled.li`
  padding: 6px 12px;
  cursor: pointer;
  border-radius: 6px;
  color: ${colors.red_500};

  &:hover {
    background: #f9f9f9;
  }
`;