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
  
  export type StampDetectLocation = {
    id: number;
    title: string;
    distance_km: number;
    latitude: number;
    longitude: number;
  };

  export type StampDetectResponse = {
    stamps: StampDetectLocation[];
  };