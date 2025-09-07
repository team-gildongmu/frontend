import React, { ReactNode } from "react";
import styled from "styled-components";
import Icon from "@/component/common/IconifyIcon";
import { Button } from "@/styles/BaseStyledTags";
import { CenterColumn } from "@/styles/BaseComponents";
import { Z_INDEX } from "@/styles/ZIndex";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  width?: string;
  height?: string;
  maxWidth?: string;
  maxHeight?: string;
  closeOnOverlayClick?: boolean;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  width,
  height,
  maxWidth,
  maxHeight,
  closeOnOverlayClick = true,
}: ModalProps) {
  if (!isOpen) return null;

  const handleOverlayClick = () => {
    if (closeOnOverlayClick) {
      onClose();
    }
  };

  return (
    <FullScreenOverlay onClick={handleOverlayClick}>
      <ModalContainer
        width={width}
        height={height}
        maxWidth={maxWidth}
        maxHeight={maxHeight}
        onClick={(e) => e.stopPropagation()}
      >
        <Header>
          {title && <Title>{title}</Title>}
          <CloseButton onClick={onClose}>
            <Icon icon="mdi:close" width="24" height="24" color="#666" />
          </CloseButton>
        </Header>
        <Content>{children}</Content>
      </ModalContainer>
    </FullScreenOverlay>
  );
}

const FullScreenOverlay = styled(CenterColumn)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: ${Z_INDEX.MODAL};
`;

const ModalContainer = styled.div<{
  width?: string;
  height?: string;
  maxWidth?: string;
  maxHeight?: string;
}>`
  position: relative;
  width: ${(props) => props.width || "90%"};
  max-width: ${(props) => props.maxWidth || "400px"};
  height: ${(props) => props.height || "80%"};
  max-height: ${(props) => props.maxHeight || "none"};
  background-color: white;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #333;
`;

const CloseButton = styled(Button)`
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const Content = styled.div`
  flex: 1;
  overflow: auto;
`;
