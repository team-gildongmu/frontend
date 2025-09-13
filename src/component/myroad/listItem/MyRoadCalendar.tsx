import "react-calendar/dist/Calendar.css";
import React, { useState } from "react";
import Calendar from "react-calendar";

import styled from "styled-components";

import Modal from "@/component/common/Modal";
import colors from "@/styles/Colors";
import { Font } from "@/styles/Typography";
import { Button } from "@/styles/BaseStyledTags";
import { useRouter } from "next/navigation";
import { colorPalette } from "@/component/common/ColorPalette";

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
  const router = useRouter();

  const [selectedDate, setSelectedDate] = useState<Value>(new Date());

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

  const handleDateChange = (value: Value) => {
    setSelectedDate(value);
  };

  const handleConfirm = () => {
    console.log("선택된 날짜:", selectedDate);
    onClose();
  };

  // ID 기반으로 일관된 색상 생성
  const getColorById = (id: number) => {
    return colorPalette[id % colorPalette.length];
  };

  // 가데이터
  const reviewData = [
    {
      id: 1,
      startDate: "2025-09-10",
      endDate: "2025-09-12",
      title: "제주도 여행",
      reviewId: "12",
    },
    {
      id: 2,
      startDate: "2025-09-13",
      endDate: "2025-09-15",
      title: "부산 해변 투어",
      reviewId: "13",
    },
    {
      id: 3,
      startDate: "2025-09-16",
      endDate: "2025-09-18",
      title: "경주 역사 탐방",
      reviewId: "14",
    },
    {
      id: 4,
      startDate: "2025-09-20",
      endDate: "2025-09-22",
      title: "강릉 바다 여행",
      reviewId: "15",
    },
  ];

  // 선택된 날짜에 해당하는 후기 찾기
  const getSelectedReview = () => {
    if (!selectedDate || Array.isArray(selectedDate)) return null;

    const selectedDateStr = selectedDate.toISOString().split("T")[0];

    return reviewData.find(
      (review) =>
        selectedDateStr >= review.startDate && selectedDateStr <= review.endDate
    );
  };

  const selectedReview = getSelectedReview();

  // 날짜 범위에 해당하는 후기들 찾기
  const getReviewsInRange = (startDate: string, endDate: string) => {
    return reviewData.filter(
      (review) =>
        (review.startDate >= startDate && review.startDate <= endDate) ||
        (review.endDate >= startDate && review.endDate <= endDate) ||
        (review.startDate <= startDate && review.endDate >= endDate)
    );
  };

  // 캘린더 타일에 후기 표시
  const getTileContent = ({ date }: { date: Date }) => {
    const dateStr = date.toISOString().split("T")[0];
    const reviews = getReviewsInRange(dateStr, dateStr);

    if (reviews.length === 0) return null;

    // 첫 번째 후기의 색상 사용
    const primaryColor = getColorById(reviews[0].id);

    return (
      <ReviewIndicator>
        <ReviewBar color={primaryColor} />
        {reviews.length > 1 && (
          <ReviewCount color={primaryColor}>+{reviews.length}</ReviewCount>
        )}
      </ReviewIndicator>
    );
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
          </DateHeader>
          <Font typo="t02_m" color="black" style={{ marginTop: "8px" }}>
            {formatSelectedDate(selectedDate)}
          </Font>

          {selectedReview ? (
            <ReviewCard color={getColorById(selectedReview.id)}>
              <ReviewHeader>
                <ReviewIcon>✈️</ReviewIcon>
                <ReviewTitle color={getColorById(selectedReview.id)}>
                  {selectedReview.title}
                </ReviewTitle>
              </ReviewHeader>
              <ReviewDateRange>
                <DateIcon>📅</DateIcon>
                {selectedReview.startDate} ~ {selectedReview.endDate}
              </ReviewDateRange>
              <ReviewDescription>
                이 여행의 상세한 후기를 확인해보세요
              </ReviewDescription>
              <ReviewDetailButton
                color={getColorById(selectedReview.id)}
                onClick={() => {
                  console.log(
                    `후기 상세 페이지로 이동: ${selectedReview.reviewId}`
                  );
                  router.push(`/mind/${selectedReview.reviewId}`);
                }}
              >
                <ButtonIcon>👀</ButtonIcon>
                상세 후기 보기
              </ReviewDetailButton>
            </ReviewCard>
          ) : (
            <EmptyState>
              <EmptyIcon>🗓️</EmptyIcon>
              <EmptyText>선택한 날짜에 여행이 없습니다</EmptyText>
              <EmptySubText>다른 날짜를 선택해보세요</EmptySubText>
            </EmptyState>
          )}
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
    border-radius: 12px;
    transition: all 0.3s ease;
    margin: 2px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    min-height: 60px;
    position: relative;
    overflow: hidden;
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

const ReviewCard = styled.div<{ color: string }>`
  margin-top: 20px;
  padding: 20px;
  background: white;
  border-radius: 12px;
  border: 2px solid ${(props) => props.color};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const ReviewHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
`;

const ReviewIcon = styled.div`
  font-size: 20px;
`;

const ReviewTitle = styled.div<{ color: string }>`
  font-size: 16px;
  font-weight: 600;
  color: ${(props) => props.color};
`;

const ReviewDateRange = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: ${colors.gray_500};
  margin-bottom: 12px;
  font-weight: 500;
`;

const DateIcon = styled.div`
  font-size: 14px;
`;

const ReviewDescription = styled.div`
  font-size: 14px;
  color: ${colors.gray_500};
  margin-bottom: 16px;
  line-height: 1.5;
`;

const ReviewDetailButton = styled.button<{ color: string }>`
  width: 100%;
  padding: 10px 16px;
  background: ${(props) => props.color};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }
`;

const ButtonIcon = styled.div`
  font-size: 16px;
`;

const EmptyState = styled.div`
  margin-top: 20px;
  padding: 32px 20px;
  text-align: center;
  background: ${colors.gray_100};
  border-radius: 12px;
  border: 1px dashed ${colors.gray_300};
`;

const EmptyIcon = styled.div`
  font-size: 32px;
  margin-bottom: 12px;
  opacity: 0.6;
`;

const EmptyText = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: ${colors.gray_500};
  margin-bottom: 6px;
`;

const EmptySubText = styled.div`
  font-size: 12px;
  color: ${colors.gray_500};
`;

const ReviewIndicator = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ReviewBar = styled.div<{ color: string }>`
  width: 8px;
  height: 8px;
  background: ${(props) => props.color};
  border-radius: 50%;
  position: relative;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const ReviewCount = styled.div<{ color: string }>`
  position: absolute;
  top: -6px;
  right: -6px;
  background: ${(props) => props.color};
  color: white;
  font-size: 9px;
  font-weight: 600;
  padding: 1px 4px;
  border-radius: 8px;
  min-width: 14px;
  text-align: center;
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
