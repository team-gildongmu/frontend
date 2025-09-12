"use client";
import React from "react";
import styled from "styled-components";

const Wrap = styled.div`
  padding: 8px 24px;
  margin-top: 8px;
`;

const WithdrawButton = styled.button`
  font-size: 14px;
  color: #666;
  text-decoration: underline;
  background: none;
  border: none;
  cursor: pointer;
`;

export function AccountActions({ onWithdraw }: { onWithdraw?: () => void }) {
  return (
    <Wrap>
      <WithdrawButton onClick={onWithdraw}>회원탈퇴</WithdrawButton>
    </Wrap>
  );
}