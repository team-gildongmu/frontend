import styled from "styled-components";

export const Form = styled.form`
  padding: 0 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 6px;
`;

export const Label = styled.label`
  font-size: 12px;
  color: #666;
`;

export const Input = styled.input<{ readOnly?: boolean }>`
  width: 100%;
  border-radius: 10px;
  background: #f0fff4;
  padding: 12px;
  border: none;
  font-size: 14px;
  color: #222;

  &:read-only {
    opacity: 0.7;
  }
`;