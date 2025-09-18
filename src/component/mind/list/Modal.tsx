import * as C from "./Modal.styles" 

interface ModalProps {
  onClose: () => void
  targetId: number
}

export default function Modal({ onClose, targetId }: ModalProps) {
  const deleteText = "정말로 삭제하시겠습니까?"

  const handleDelete = async () => {
    try {
    //   await axios.delete(`/api/your-resource/${targetId}`)
      alert("삭제가 완료되었습니다.")
      onClose();
    } catch (error) {
      console.error(error)
      alert("삭제에 실패했습니다.")
    }
  }

  return (
    <C.ModalWrap>
      <C.ModalContent>{deleteText}</C.ModalContent>
      <C.ModalConfirm>
        <C.ConfirmBtn onClick={handleDelete}>확인</C.ConfirmBtn>
        <C.RejectBtn onClick={onClose}>취소</C.RejectBtn>
      </C.ModalConfirm>
    </C.ModalWrap>
  )
}