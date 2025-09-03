import styled from "styled-components";
import colors from "@/styles/Colors";
import { Config } from "@/styles/FontVariants"

export const Wrap = styled.a`
    display: block;
    text-decoration: none;
    color: #000;
    padding: 10px 10px;
    border-bottom: 1px solid ${colors.blue_300}
`
export const TitleWrap = styled.h4`
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
`

export const Title__l = styled.div`
  cursor: pointer;
`

export const Title = styled.h4`
   font: ${Config.variants.l01_bold_m}
`
export const Date = styled.div`
    font: ${Config.variants.l01_m}
`

export const Title__r = styled.div`
    height: 10px;
    position: relative;
`
export const Setting_btn = styled.button`
  padding: 8px 12px;
  border: none;
  border-radius: 8px;
  background: #f1f1f1;
  cursor: pointer;
`;

export const Setting_conform = styled.ul<{ $open: boolean }>`
  position: absolute;
  margin-top: 5px;
  list-style: none;
  padding: 0;
  background: white;
  border: 1px solid ${colors.gray_500};
  border-radius: 8px;

  display: ${({ $open }) => ($open ? "block" : "none")};
`;

export const Update = styled.li`
  padding: 5px 12px;
  cursor: pointer;
  border-radius: 8px;

  &:hover {
    background: #f5f5f5;
  }
`;

export const Delete = styled.li`
  padding: 5px 12px;
  border-radius: 8px;
  cursor: pointer;
  color: red;

  &:hover {
    background: #f5f5f5;
  }
`;