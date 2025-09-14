import "react-calendar/dist/Calendar.css";
import React, { useState } from "react";
import Calendar from "react-calendar";

import styled from "styled-components";

import colors from "@/styles/Colors";
import { Font } from "@/styles/Typography";
import { useRouter } from "next/navigation";
import { colorPalette } from "@/component/common/ColorPalette";
import { useTranslation } from "react-i18next";
import useGetCalendarReviewListQuery from "@/queries/travel/useGetCalendarReviewList";
import { CenterRow, Column, Row } from "@/styles/BaseComponents";
import { Button, Div } from "@/styles/BaseStyledTags";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function ReviewCalendar() {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const { data: calendarReviewList } = useGetCalendarReviewListQuery();
  const [selectedDate, setSelectedDate] = useState<Value>(new Date());

  const getCurrentLocale = () => {
    const currentLang = i18n.language;
    switch (currentLang) {
      case "en":
        return "en-US";
      case "ja":
        return "ja-JP";
      case "ko":
      default:
        return "ko-KR";
    }
  };

  const formatSelectedDate = (date: Value): string => {
    if (!date) return t("myroad.calendar.selectDate");
    if (Array.isArray(date)) return t("myroad.calendar.selectDateRange");

    return date.toLocaleDateString(getCurrentLocale(), {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
    });
  };

  const handleDateChange = (value: Value) => {
    setSelectedDate(value);
  };

  // ID 기반으로 일관된 색상 생성
  const getColorById = (id: number) => {
    if (!colorPalette || colorPalette.length === 0 || !id || id < 0) {
      return "#3B82F6"; // 기본 파란색
    }

    const colorIndex = id % colorPalette.length;
    return colorPalette[colorIndex];
  };

  // 날짜 형식을 YYYYMMDD로 변환하는 함수
  const formatDateToYYYYMMDD = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}${month}${day}`;
  };

  // 선택된 날짜에 해당하는 후기 찾기
  const getSelectedReview = () => {
    if (!selectedDate || Array.isArray(selectedDate)) return null;

    const selectedDateStr = formatDateToYYYYMMDD(selectedDate);

    return calendarReviewList?.find(
      (review) =>
        selectedDateStr >= review.start_date &&
        selectedDateStr <= review.end_date
    );
  };

  const selectedReview = getSelectedReview();

  // 날짜 범위에 해당하는 후기들 찾기
  const getReviewsInRange = (startDate: string, endDate: string) => {
    return calendarReviewList?.filter(
      (review) =>
        (review.start_date >= startDate && review.start_date <= endDate) ||
        (review.end_date >= startDate && review.end_date <= endDate) ||
        (review.start_date <= startDate && review.end_date >= endDate)
    );
  };

  // 캘린더 타일에 후기 표시
  const getTileContent = ({ date }: { date: Date }) => {
    const dateStr = formatDateToYYYYMMDD(date);
    const reviews = getReviewsInRange(dateStr, dateStr);

    if (reviews?.length === 0 || !reviews?.[0]?.travel_review_id) return null;

    // 첫 번째 후기의 색상 사용
    const primaryColor = getColorById(reviews?.[0]?.travel_review_id);

    return (
      <CenterRow position="relative" width="100%" height="100%">
        <ReviewBar color={primaryColor} />
        {reviews?.length > 1 && (
          <ReviewCount color={primaryColor}>+{reviews?.length}</ReviewCount>
        )}
      </CenterRow>
    );
  };

  return (
    <CalendarWrapper width="100%" height="auto" gridGap="20px">
      <Calendar
        onChange={handleDateChange}
        value={selectedDate}
        locale={getCurrentLocale()}
        formatDay={(locale, date) => date.getDate().toString()}
        formatShortWeekday={(locale, date) => {
          const weekdays = t("myroad.calendar.weekdays", {
            returnObjects: true,
          }) as string[];
          return weekdays[date.getDay()];
        }}
        next2Label={null}
        prev2Label={null}
        showNeighboringMonth={true}
        formatMonthYear={(locale, date) => {
          const months = t("myroad.calendar.months", {
            returnObjects: true,
          }) as string[];
          const yearSuffix = t("myroad.calendar.yearSuffix");
          return `${date.getFullYear()}${yearSuffix} ${
            months[date.getMonth()]
          }`;
        }}
        tileContent={getTileContent}
      />

      <SelectedDateInfo>
        <Row width="100%" justifyContent="space-between" alignItems="center">
          <Font typo="t02_m" color="blue_500">
            {t("myroad.calendar.selectedDate")}
          </Font>
        </Row>
        <Font typo="t02_m" color="black" style={{ marginTop: "8px" }}>
          {formatSelectedDate(selectedDate)}
        </Font>

        {selectedReview ? (
          <ReviewCard
            color={getColorById(selectedReview.travel_review_id)}
            gridGap="20px"
          >
            <Column gridGap="5px">
              <Font
                typo="t02_m"
                color={getColorById(selectedReview.travel_review_id)}
                textAlign="start"
              >
                ✈️ {selectedReview.title}
              </Font>
              <Font typo="c02_m" color="gray_500" textAlign="start">
                📅 {selectedReview.start_date} ~ {selectedReview.end_date}
              </Font>
            </Column>
            <Font typo="m01_sb_m" color="gray_500" mb="10px">
              {t("myroad.calendar.reviewDescription")}
            </Font>
            <ReviewDetailButton
              color={getColorById(selectedReview.travel_review_id)}
              onClick={() => {
                router.push(`/mind/${selectedReview.travel_review_id}`);
              }}
            >
              <Font typo="l01_bold_m" color="white">
                👀 {t("myroad.calendar.viewDetailReview")}
              </Font>
            </ReviewDetailButton>
          </ReviewCard>
        ) : (
          <Column
            mt="20px"
            p="32px 20px"
            textAlign="center"
            gridGap="12px"
            borderRadius="12px"
            border="1px dashed"
            backgroundColor="gray_100"
            borderColor="gray_300"
          >
            <Font typo="m01_bold_m">🗓️</Font>
            <Font typo="t01_m" color="gray_500">
              {t("myroad.calendar.noTravelOnDate")}
            </Font>
            <Font typo="t01_m" color="gray_500">
              {t("myroad.calendar.selectOtherDate")}
            </Font>
          </Column>
        )}
      </SelectedDateInfo>
    </CalendarWrapper>
  );
}

const CalendarWrapper = styled(Column)`
  /* Calendar 전체 컨테이너 */
  .react-calendar {
    width: 100%;
    max-width: 100%;
    border: none;
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

  .react-calendar__month-view__days {
    display: grid !important;
    grid-template-columns: repeat(7, 1fr);
    gap: 2px;
  }
`;

const SelectedDateInfo = styled(Column)`
  width: 100%;
  padding: 16px;
  background: ${colors.blue_300};
  border-radius: 12px;
  text-align: center;
  margin-top: auto;
  max-height: 300px;
  overflow-y: auto;
`;

const ReviewCard = styled(Div)<{ color: string }>`
  margin-top: 20px;
  padding: 20px;
  background: white;
  border-radius: 12px;
  border: 2px solid ${(props) => props.color};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const ReviewDetailButton = styled(Button)<{ color: string }>`
  width: 100%;
  padding: 10px 16px;
  background: ${(props) => props.color};
  border-radius: 8px;
`;

const ReviewBar = styled(Div)<{ color: string }>`
  width: 8px;
  height: 8px;
  background: ${(props) => props.color};
  border-radius: 50%;
  position: relative;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const ReviewCount = styled(Div)<{ color: string }>`
  position: absolute;
  bottom: 5px;
  right: 15px;
  background: ${(props) => props.color};
  color: white;
  font-size: 9px;
  font-weight: 600;
  padding: 1px 4px;
  border-radius: 8px;
  min-width: 14px;
  text-align: center;
`;
