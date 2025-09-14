import React from "react";
import styled, { keyframes } from "styled-components";
import { CenterColumn } from "@/styles/BaseComponents";
import Icon from "@/component/common/IconifyIcon";
import colors from "@/styles/Colors";

interface LoadingSpinnerProps {
  text?: string;
}

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const SpinningIcon = styled(Icon)`
  animation: ${spin} 1s linear infinite;
`;

export default function LoadingSpinner({}: LoadingSpinnerProps) {
  return (
    <CenterColumn width="100%" height="100%" gridGap="12px" py="20px">
      <SpinningIcon
        icon="mdi:loading"
        width="40"
        height="40"
        color={colors.blue_500}
      />
    </CenterColumn>
  );
}
