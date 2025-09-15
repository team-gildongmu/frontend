import colors from "@/styles/Colors";
import styled from "styled-components";

export const Container = styled.div`
  max-width: 987px;
  margin: 0 auto;
  padding: 2rem;
  background: ${colors.blue_300};
  border-radius: 20px;
`;

export const Stepper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
`;

export const Step = styled.div<{ active: boolean }>`
  flex: 1;
  text-align: center;
  font-size: 0.875rem;
  font-weight: ${({ active }) => (active ? "bold" : "normal")};
  color: ${({ active }) => (active ? `${colors.blue_500}` : `${colors.gray_300}` )};
`;

export const StepBody = styled.div`
  min-height: 200px;
`;

export const Title = styled.h2`
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

export const Input = styled.input`
  width: 100%;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  padding: 0.5rem;
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
  gap: 1rem;
  margin-bottom: 1rem;
  label {
    cursor: pointer;
  }
`;

export const Flex = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const TagGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
`;

export const Complete = styled.div`
  text-align: center;
  font-size: 1.1rem;
`;

export const Nav = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
`;

export const Button = styled.button`
  background: ${colors.blue_300};
  color: white;
  padding: 0.5rem 1.2rem;
  border-radius: 8px;
  font-size: 0.9rem;
  cursor: pointer;
  &:disabled {
    background: #9ca3af;
    cursor: not-allowed;
  }
`;