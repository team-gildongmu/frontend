import colors from "@/styles/Colors";
import { Config } from "@/styles/FontVariants";
import styled from "styled-components";

export const Container = styled.div`
  max-width: 987px;
  margin: 2rem auto;
  padding: 2rem;
  background: ${colors.blue_300};
  border-radius: 20px;
`;

export const ProgressBarWrap = styled.div`
  width: 100%;
  height: 10px;
  background: ${colors.red_300};
  border-radius: 9999px;
  overflow: hidden;
  margin-top: 2rem;
`;

export const ProgressFill = styled.div<{ percent: number }>`
  height: 100%;
  width: ${({ percent }) => percent}%;
  background: ${colors.blue_500};
  transition: width 0.4s ease;
  border-radius: 9999px;
`;

export const StepBody = styled.div`
  min-height: 200px;
  min-width: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.h2`
  font-size: 1.125rem;
  font-weight: 600;
  margin: 1rem 0;
`;

export const Description = styled.p`
  font: ${Config.variants.c01_m};
  margin-bottom: 1rem;
  color: ${colors.gray_300};
`

export const Input = styled.input`
  width: 100%;
  border: 1px solid ${colors.gray_100};
  border-radius: 8px;
  padding: 0.5rem;
  margin-bottom: 1rem;
`;

export const ErrorMsg = styled.p`
  color: red;
  font-size: 0.8rem;
  margin-bottom: 1rem;
`;

export const Textarea = styled.textarea`
  width: 100%;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  padding: 0.5rem;
  min-height: 120px;
`;

export const Stars = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const StarButton = styled.button<{ selected: boolean }>`
  font-size: 2rem;
  border: none;
  background:none;
  color: ${({ selected }) => (selected ? `${colors.red_300}` : `${colors.gray_200}`)};
  cursor: pointer;
`;

export const WeatherWrap = styled.div`
  display: flex;
  gap: 1.5rem;
  margin: 1rem 0;
`;

export const WeatherLabel = styled.label`
  display: block;
  cursor: pointer;
  user-select: none;

  input[type="radio"] {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
    pointer-events: none;
  }

  span {
    display: block;
    padding: .5rem .5rem;
    border-radius: 10px;
    border: 1px solid ${colors.gray_200 ?? "#e6e6e6"};
    background: ${colors.white ?? "#fff"};
    font-size: 14px;
    text-align: center;
    color: ${colors.gray_500 ?? "#222"};
    transition: background-color 160ms ease, color 160ms ease, border-color 160ms ease, transform 120ms ease;
  }

  input[type="radio"]:checked + span {
    background: ${colors.blue_500 ?? "#007bff"};
    color: ${colors.white ?? "#fff"};
    border-color: ${colors.blue_500 ?? "#007bff"};
    transform: translateY(-1px);
  }

  input[type="radio"]:focus + span {
    box-shadow: 0 0 0 4px rgba(0, 123, 255, 0.12);
  }
`;

export const DateWrap = styled.div`
  width: 100%;
  margin: 1rem 0;
`;

export const Flex = styled.div`
  width: 100%;
  display: flex;
  gap: 0.5rem;
`;

export const DateText = styled.div`
  width: 150px;
  font: ${Config.variants.t02_m};
  align-items: center;
`;

export const TagGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
`;

export const TagLabel = styled.label`
  display: block;
  width: 100%;
  cursor: pointer;
  user-select: none;

  input[type="checkbox"] {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
    pointer-events: none;
  }

  span {
    display: block;
    width: 100%;
    padding: 0.75rem 1rem;
    border-radius: 10px;
    border: 1px solid ${colors.gray_200 ?? "#e6e6e6"};
    background: ${colors.white ?? "#fff"};
    text-align: center;
    font-size: 14px;
    color: ${colors.gray_500 ?? "#222"};
  }

  input[type="checkbox"]:checked + span {
    background: ${colors.blue_500 ?? "#007bff"};
    color: ${colors.white ?? "#fff"};
    border-color: ${colors.blue_500 ?? "#007bff"};
    transform: translateY(-1px);
  }
`;

export const PreviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-top: 16px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr); // 태블릿 이하에서는 2칸
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr; // 모바일에서는 1칸
  }
`;

export const Complete = styled.div`
  text-align: center;
  font-size: 1.1rem;
`;

export const Nav = styled.div`
  display: flex;
  width: 132px;
  justify-content: space-between;
  margin-top: 2rem;
`;

export const Button = styled.button`
  background: ${colors.blue_500};
  color: white;
  padding: 0.5rem 1.2rem;
  border: none;
  border-radius: 8px;
  font: ${Config.variants.t02_m};
  cursor: pointer;
  &:disabled {
    background: #9ca3af;
    cursor: not-allowed;
  }
`;

export const LButton = styled.button`
  background: ${colors.white};
  padding: 0.5rem 1.2rem;
  border: none;
  border-radius: 8px;
  font: ${Config.variants.t02_m};
  cursor: pointer;
  &:disabled {
    background: #9ca3af;
    cursor: not-allowed;
  }
`;

export const Submit = styled.p`
  margin: 0 auto;

`