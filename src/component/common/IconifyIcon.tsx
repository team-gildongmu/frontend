import { Icon as IconifyIcon } from "@iconify/react";
import styled from "styled-components";
import { ITagProps } from "@/styles/BaseStyledTags";

// styled-system과 호환되는 Icon 컴포넌트
const StyledIcon = styled(IconifyIcon)<ITagProps>`
  /* styled-system props가 자동으로 적용됩니다 */
`;

interface IconProps extends ITagProps {
  icon: string;
  width?: number | string;
  height?: number | string;
  color?: string;
}

export default function Icon({
  icon,
  width = 24,
  height = 24,
  color,
  ...props
}: IconProps) {
  return (
    <StyledIcon
      icon={icon}
      width={width}
      height={height}
      style={{ color }}
      {...props}
    />
  );
}
