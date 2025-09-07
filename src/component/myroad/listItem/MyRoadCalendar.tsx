import "react-calendar/dist/Calendar.css";
import React, { useState } from "react";
import Calendar from "react-calendar";

import styled from "styled-components";

import Modal from "@/component/common/Modal";
import colors from "@/styles/Colors";
import { Font } from "@/styles/Typography";
import { Button } from "@/styles/BaseStyledTags";

interface Schedule {
  id: string;
  title: string;
  time: string;
  color: string;
}

interface MyRoadCalendarProps {
  isOpen: boolean;
  onClose: () => void;
}

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function MyRoadCalendar({
  isOpen,
  onClose,
}: MyRoadCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Value>(new Date());
  const [schedules, setSchedules] = useState<Record<string, Schedule[]>>({});
  const [isAddingSchedule, setIsAddingSchedule] = useState(false);
  const [newSchedule, setNewSchedule] = useState({
    title: "",
    time: "",
    color: "#4285f4",
  });

  const formatSelectedDate = (date: Value): string => {
    if (!date) return "날짜를 선택해주세요";
    if (Array.isArray(date)) return "날짜 범위 선택";

    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
    });
  };

  const getDateKey = (date: Date): string => {
    return date.toISOString().split("T")[0];
  };

  const handleDateChange = (value: Value) => {
    setSelectedDate(value);
    setIsAddingSchedule(false);
  };

  const handleAddSchedule = () => {
    if (
      !selectedDate ||
      Array.isArray(selectedDate) ||
      !newSchedule.title.trim()
    )
      return;

    const dateKey = getDateKey(selectedDate);
    const schedule: Schedule = {
      id: Date.now().toString(),
      title: newSchedule.title.trim(),
      time: newSchedule.time,
      color: newSchedule.color,
    };

    setSchedules((prev) => ({
      ...prev,
      [dateKey]: [...(prev[dateKey] || []), schedule],
    }));

    setNewSchedule({ title: "", time: "", color: "#4285f4" });
    setIsAddingSchedule(false);
  };

  const handleDeleteSchedule = (scheduleId: string) => {
    if (!selectedDate || Array.isArray(selectedDate)) return;

    const dateKey = getDateKey(selectedDate);
    setSchedules((prev) => ({
      ...prev,
      [dateKey]: (prev[dateKey] || []).filter((s) => s.id !== scheduleId),
    }));
  };

  const getTileContent = ({ date }: { date: Date }) => {
    const dateKey = getDateKey(date);
    const daySchedules = schedules[dateKey] || [];

    if (daySchedules.length === 0) return null;

    return (
      <ScheduleDots>
        {daySchedules.slice(0, 3).map((schedule, index) => (
          <ScheduleDot key={index} color={schedule.color} />
        ))}
        {daySchedules.length > 3 && (
          <MoreDot>+{daySchedules.length - 3}</MoreDot>
        )}
      </ScheduleDots>
    );
  };

  const getSelectedDateSchedules = (): Schedule[] => {
    if (!selectedDate || Array.isArray(selectedDate)) return [];
    const dateKey = getDateKey(selectedDate);
    return schedules[dateKey] || [];
  };

  const handleConfirm = () => {
    console.log("선택된 날짜:", selectedDate);
    console.log("전체 일정:", schedules);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="날짜 선택"
      width="90%"
      height="90%"
      maxWidth="780px"
    >
      <CalendarWrapper>
        <Calendar
          onChange={handleDateChange}
          value={selectedDate}
          locale="ko-KR"
          formatDay={(locale, date) => date.getDate().toString()}
          formatShortWeekday={(locale, date) => {
            const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
            return weekdays[date.getDay()];
          }}
          next2Label={null}
          prev2Label={null}
          showNeighboringMonth={true}
          formatMonth={(locale, date) => {
            const months = [
              "1월",
              "2월",
              "3월",
              "4월",
              "5월",
              "6월",
              "7월",
              "8월",
              "9월",
              "10월",
              "11월",
              "12월",
            ];
            return months[date.getMonth()];
          }}
          tileContent={getTileContent}
        />

        <SelectedDateInfo>
          <DateHeader>
            <Font typo="c01_m" color="blue_500">
              선택된 날짜
            </Font>
            <AddScheduleButton
              onClick={() => setIsAddingSchedule(!isAddingSchedule)}
            >
              + 일정 추가
            </AddScheduleButton>
          </DateHeader>
          <Font typo="t02_m" color="black" style={{ marginTop: "8px" }}>
            {formatSelectedDate(selectedDate)}
          </Font>

          {isAddingSchedule && (
            <ScheduleForm>
              <FormRow>
                <ScheduleInput
                  type="text"
                  placeholder="일정 제목"
                  value={newSchedule.title}
                  onChange={(e) =>
                    setNewSchedule((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                />
              </FormRow>
              <FormRow>
                <ScheduleInput
                  type="time"
                  value={newSchedule.time}
                  onChange={(e) =>
                    setNewSchedule((prev) => ({
                      ...prev,
                      time: e.target.value,
                    }))
                  }
                />
                <ColorPicker
                  type="color"
                  value={newSchedule.color}
                  onChange={(e) =>
                    setNewSchedule((prev) => ({
                      ...prev,
                      color: e.target.value,
                    }))
                  }
                />
              </FormRow>
              <FormButtons>
                <SmallButton onClick={() => setIsAddingSchedule(false)}>
                  취소
                </SmallButton>
                <SmallButton primary onClick={handleAddSchedule}>
                  추가
                </SmallButton>
              </FormButtons>
            </ScheduleForm>
          )}

          <ScheduleList>
            {getSelectedDateSchedules().map((schedule) => (
              <ScheduleItem key={schedule.id}>
                <ScheduleColor color={schedule.color} />
                <ScheduleContent>
                  <ScheduleTitle>{schedule.title}</ScheduleTitle>
                  {schedule.time && (
                    <ScheduleTime>{schedule.time}</ScheduleTime>
                  )}
                </ScheduleContent>
                <DeleteButton onClick={() => handleDeleteSchedule(schedule.id)}>
                  ×
                </DeleteButton>
              </ScheduleItem>
            ))}
          </ScheduleList>
        </SelectedDateInfo>

        <ActionButtons>
          <ActionButton variant="secondary" onClick={onClose}>
            취소
          </ActionButton>
          <ActionButton variant="primary" onClick={handleConfirm}>
            확인
          </ActionButton>
        </ActionButtons>
      </CalendarWrapper>
    </Modal>
  );
}

const CalendarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 20px;

  /* Calendar 전체 컨테이너 */
  .react-calendar {
    width: 100%;
    max-width: 100%;
    background: white;
    border: none;
    font-family: Arial, Helvetica, sans-serif;
    line-height: 1.125em;
  }

  /* 상단 네비게이션 */
  .react-calendar__navigation {
    display: flex;
    height: 44px;
    margin-bottom: 1em;
  }

  .react-calendar__navigation button {
    min-width: 44px;
    background: none;
    border: none;
    font-size: 16px;
    font-weight: bold;
    color: ${colors.gray_500};
    cursor: pointer;
    padding: 8px;
    border-radius: 8px;
    transition: all 0.2s ease;
  }

  .react-calendar__navigation button:hover {
    background-color: ${colors.blue_300};
    color: ${colors.blue_500};
  }

  .react-calendar__navigation button:disabled {
    background-color: transparent;
    color: ${colors.gray_200};
    cursor: not-allowed;
  }

  .react-calendar__navigation__label {
    flex: 1;
    text-align: center;
    font-weight: bold;
    font-size: 18px;
  }

  /* 월/년 뷰 */
  .react-calendar__month-view__weekdays {
    text-align: center;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 0.75em;
    color: ${colors.gray_300};
    margin-bottom: 8px;
  }

  .react-calendar__month-view__weekdays__weekday {
    padding: 0.5em;
    border-bottom: 1px solid ${colors.gray_100};
  }

  /* 날짜 버튼 */
  .react-calendar__tile {
    max-width: 100%;
    padding: 8px 4px;
    background: none;
    border: none;
    text-align: center;
    line-height: 16px;
    font-size: 14px;
    color: ${colors.black};
    cursor: pointer;
    border-radius: 8px;
    transition: all 0.2s ease;
    margin: 2px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    min-height: 50px;
    position: relative;
  }

  .react-calendar__tile:hover {
    background-color: ${colors.blue_300};
    color: ${colors.blue_500};
  }

  /* 선택된 날짜 */
  .react-calendar__tile--active {
    background: ${colors.blue_500} !important;
    color: white !important;
    font-weight: bold;
  }

  .react-calendar__tile--active:hover {
    background: ${colors.blue_500} !important;
  }

  /* 오늘 날짜 */
  .react-calendar__tile--now {
    background: ${colors.yellow_300};
    color: ${colors.black};
    font-weight: bold;
  }

  .react-calendar__tile--now:hover {
    background: ${colors.yellow_500};
  }

  /* 다른 달 날짜 */
  .react-calendar__month-view__days__day--neighboringMonth {
    color: ${colors.gray_200};
  }

  /* 주말 */
  .react-calendar__month-view__days__day--weekend {
    color: ${colors.red_300};
  }

  /* 월 뷰의 날짜 그리드 확실히 표시되도록 */
  .react-calendar__month-view__days {
    display: grid !important;
    grid-template-columns: repeat(7, 1fr);
    gap: 2px;
  }
`;

const SelectedDateInfo = styled.div`
  padding: 16px;
  background: ${colors.blue_300};
  border-radius: 12px;
  text-align: center;
  margin-top: auto;
  max-height: 300px;
  overflow-y: auto;
`;

const DateHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AddScheduleButton = styled.button`
  background: ${colors.blue_500};
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${colors.blue_300};
    color: ${colors.blue_500};
  }
`;

const ScheduleForm = styled.div`
  margin-top: 12px;
  padding: 12px;
  background: white;
  border-radius: 8px;
  text-align: left;
`;

const FormRow = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
`;

const ScheduleInput = styled.input`
  flex: 1;
  padding: 8px;
  border: 1px solid ${colors.gray_200};
  border-radius: 6px;
  font-size: 14px;
`;

const ColorPicker = styled.input`
  width: 40px;
  height: 36px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
`;

const FormButtons = styled.div`
  display: flex;
  gap: 8px;
  justify-content: flex-end;
`;

const SmallButton = styled.button<{ primary?: boolean }>`
  padding: 6px 12px;
  border: none;
  border-radius: 6px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s ease;

  ${(props) =>
    props.primary
      ? `
    background: ${colors.blue_500};
    color: white;
    &:hover {
      background: ${colors.blue_300};
      color: ${colors.blue_500};
    }
  `
      : `
    background: ${colors.gray_200};
    color: ${colors.gray_500};
    &:hover {
      background: ${colors.gray_300};
    }
  `}
`;

const ScheduleList = styled.div`
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  text-align: left;
`;

const ScheduleItem = styled.div`
  display: flex;
  align-items: center;
  padding: 8px;
  background: white;
  border-radius: 6px;
  gap: 8px;
`;

const ScheduleColor = styled.div<{ color: string }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  flex-shrink: 0;
`;

const ScheduleContent = styled.div`
  flex: 1;
`;

const ScheduleTitle = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${colors.black};
`;

const ScheduleTime = styled.div`
  font-size: 12px;
  color: ${colors.gray_500};
  margin-top: 2px;
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: ${colors.gray_500};
  font-size: 18px;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.2s ease;

  &:hover {
    background: ${colors.red_300};
    color: ${colors.red_300};
  }
`;

const ScheduleDots = styled.div`
  display: flex;
  gap: 2px;
  margin-top: 4px;
  flex-wrap: wrap;
  justify-content: center;
`;

const ScheduleDot = styled.div<{ color: string }>`
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const MoreDot = styled.div`
  font-size: 8px;
  color: ${colors.gray_500};
  background: ${colors.gray_200};
  border-radius: 6px;
  padding: 1px 3px;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 16px;
`;

const ActionButton = styled(Button)<{ variant?: "primary" | "secondary" }>`
  flex: 1;
  padding: 12px 16px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.2s ease;

  ${(props) =>
    props.variant === "primary"
      ? `
    background: ${colors.blue_500};
    color: white;
    border: none;
    
    &:hover {
      background: ${colors.blue_300};
      color: ${colors.blue_500};
    }
  `
      : `
    background: transparent;
    color: ${colors.gray_500};
    border: 1px solid ${colors.gray_200};
    
    &:hover {
      background: ${colors.gray_100};
    }
  `}
`;
