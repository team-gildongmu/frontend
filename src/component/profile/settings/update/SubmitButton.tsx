"use client";
import colors from "@/styles/Colors";
import React from "react";
import styled from "styled-components";

const Wrap = styled.div`
  padding: 20px 24px;
  margin-top: auto;
`;

const Button = styled.button<{ disabled?: boolean }>`
  width: 100%;
  border-radius: 10px;
  background: ${(p) => (p.disabled ? "#ddd" : `${colors.blue_500}`)};
  padding: 12px;
  color: ${(p) => (p.disabled ? `${colors.gray_300}` : `${colors.white}`)};
  font-weight: 600;
  border: none;
  cursor: ${(p) => (p.disabled ? "not-allowed" : "pointer")};
`;

export function SubmitButton({
  disabled,
  onClick,
}: {
  disabled?: boolean;
  onClick?: () => void;
}) {
  return (
    <Wrap>
      <Button disabled={disabled} onClick={onClick}>
        변경하기
      </Button>
    </Wrap>
  );
}