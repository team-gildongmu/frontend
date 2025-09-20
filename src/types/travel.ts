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

// 여행 리뷰 디테일 응답값
export type TravelReviewDetail = {
  travel_review_id: number;
  title: string;
  ai_rating: number;
  start_date: string;
  end_date: string;
  weather: keyof typeof WEATHER_LABELS;
  mood: number;
  tags: string[]; 
  note: string;
  images: string[];
};


// 여행 리뷰 업로드 데이터
export type TravelReviewPost = {
    travel_log_id: number;
    title: string;
    ai_rating: number;
    started_at: string;
    finished_at: string;
    weather: keyof typeof WEATHER_LABELS;
    mood: number;
    tag: string[]; 
    note: string;
    song: string;
    picture?: File[];
}

// 여행 리뷰 수정 데이터
export type TravelReviewPut = {
    review_id: number;
    title: string;
    ai_rating: number;
    started_at: string;
    finished_at: string;
    weather: keyof typeof WEATHER_LABELS;
    mood: number;
    tag: string[]; 
    note: string;
    song: string;
    picture?: File[];
}

export type WeatherType = "sunny" | "cloudy" | "rainy" | "snowy";

export type ReviewTagType =
  | "clean_and_comfy"
  | "tasty_food"
  | "healing"
  | "beautiful_view"
  | "want_to_come_again"
  | "kind_staff"
  | "quiet_and_relaxing"
  | "nice_atmosphere"
  | "special_memory"
  | "good_for_photos";

  export const WEATHER_LABELS: Record<WeatherType, string> = {
    sunny: "맑음",
    cloudy: "흐림",
    rainy: "비",
    snowy: "눈",
  };
  
  export const REVIEW_TAG_LABELS: Record<ReviewTagType, string> = {
    clean_and_comfy: "깨끗하고 편안해요",
    tasty_food: "음식이 맛있어요",
    healing: "힐링하기 좋아요",
    beautiful_view: "경치가 아름다워요",
    want_to_come_again: "다시 오고 싶어요",
    kind_staff: "직원들이 친절해요",
    quiet_and_relaxing: "조용하고 여유로워요",
    nice_atmosphere: "분위기가 좋아요",
    special_memory: "특별한 추억이 생겨요",
    good_for_photos: "사진 찍기 좋아요",
  };
  
