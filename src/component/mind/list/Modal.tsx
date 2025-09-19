"use client";

import * as C from "./Modal.styles";

interface ModalProps {
  message: string;
  onConfirm: () => void;
  onClose: () => void;
}

export default function Modal({ message, onConfirm, onClose }: ModalProps) {
  return (
    <C.Overlay>
      <C.ModalWrap>
        <C.ModalContent>{message}</C.ModalContent>
        <C.ModalConfirm>
          <C.ConfirmBtn onClick={onConfirm}>확인</C.ConfirmBtn>
          <C.RejectBtn onClick={onClose}>취소</C.RejectBtn>
        </C.ModalConfirm>
      </C.ModalWrap>
    </C.Overlay>
  );
}