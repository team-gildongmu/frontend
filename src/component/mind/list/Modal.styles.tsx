import colors from "@/styles/Colors";
import { Config } from "@/styles/FontVariants";
import { styled } from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalWrap = styled.div`
  width: 400px;
  padding: 30px 20px;
  background-color: ${colors.white};
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ModalContent = styled.div`
  font: ${Config.variants.l01_bold_m};
  color: ${colors.black};
  text-align: center;
`;

export const ModalConfirm = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 24px;
`;

export const ConfirmBtn = styled.button`
  border: none;
  background-color: ${colors.red_500};
  padding: 8px 16px;
  color: ${colors.white};
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: ${colors.red_300};
  }
`;

export const RejectBtn = styled.button`
  border: none;
  background-color: ${colors.gray_200};
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: ${colors.gray_300};
  }
`;