import React from "react";
import Calendar from "react-calendar";
import styled from "styled-components";
import Modal from "@/component/common/Modal";

const CalendarWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

interface MyRoadCalendarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MyRoadCalendar({
  isOpen,
  onClose,
}: MyRoadCalendarProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="캘린더 등록"
      width="90%"
      height="80%"
      maxWidth="500px"
    >
      <CalendarWrapper>
        <Calendar />
      </CalendarWrapper>
    </Modal>
  );
}
