// 여행 로그 리스트 응답
export type TravelLogItem = {
  images: string[];
  keywords: string[];
  subtitle: string;
  summary: string;
  title: string;
  travel_log_id: number;
};

// 여행 로그 상세 응답

// 여행 위치 상세 정보
export type TravelLocation = {
  travel_location_id: number;
  title: string;
  longitude: number;
  latitude: number;
  location_type: string;
  description: string;
  travel_day: number;
  image_link: string;
};

// 여행 로그 상세 정보
export type TravelLogDetail = {
  travel_log_id: number;
  title: string;
  subtitle: string;
  summary: string;
  keywords: string[];
  images: string[];
  locations: {
    [key: string]: TravelLocation[];
  };
};

// 여행 로그 지도 정보 응답
export type TravelLogMapInfo = {
  travel_log_id: number;
  locations: {
    [key: string]: MapTravelLocation[];
  };
};

// 여행 리뷰 리스트 응답
export type TravelReviewItem = {
  travel_review_id: number;
  title: string;
  ai_rating: string;
  start_date: string;
  end_date: string;
  weather: string;
  image: string[];
  note: string;
  tags: string[];
  user_nickname: string;
  user_photo: string;
};

// 여행 리뷰 캘린더 응답
export type TravelCalendarReviewItem = {
  travel_review_id: number;
  title: string;
  start_date: string;
  end_date: string;
};

// 지도용 여행 위치 정보
export type MapTravelLocation = {
  travel_location_id: number;
  title: string;
  longitude: number;
  latitude: number;
  location_type: string;
  description: string;
  image: string;
};
