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
    [key: string]: TravelLocation[];
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
};

// 여행 리뷰 캘린더 응답
export type TravelCalendarReviewItem = {
  travel_review_id: number;
  title: string;
  start_date: string;
  end_date: string;
};


// 여행 리뷰 디테일 응답값
export type TravelReviewDetail = {
  travel_review_id: number;
  title: string;
  score: number;
  // 사용자 기분 - mood
  mood: number;
  date: string;
  contents: string;
  weather: string;
  image: string;
};


// 여행 리뷰 업로드 데이터
export type TravelReviewPost = {
    travel_log_id: number;
    title: string;
    ai_rating: number;
    started_at: string;
    finished_at: string;
    weather: string;
    mood: number;
    tag: [];
    note: string;
    song: string;
    picture?: File[];
}