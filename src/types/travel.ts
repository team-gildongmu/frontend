// 스탬프 응답 값
export type Stamp = {
  id: number;
  title: string;
  is_stamped: boolean;
  stamped_at: string | null;
  latitude: number;
  longitude: number;
};

export type MyStampsResponse = {
  stamps: Stamp[];
};

// 여행 로그 리스트 응답
export type TravelLogItem = {
  images: string[];
  keywords: string[];
  subtitle: string;
  summary: string;
  title: string;
  travel_log_id: number;
};
