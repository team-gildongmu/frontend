import { Icon as IconifyIcon } from "@iconify/react";
import styled from "styled-components";
import { ITagProps } from "@/styles/BaseStyledTags";

const StyledIcon = styled(IconifyIcon)<ITagProps>``;

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
