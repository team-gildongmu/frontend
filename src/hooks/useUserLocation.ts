import { useEffect, useState } from "react";

type Location = {
  lat: number; // 위도
  lng: number; // 경도
  source: "gps" | "ip"; // gps인지 ip인지 여부
};

/**
 * @hook useUserLocation
 *
 * 사용자의 현재 위치(GPS 또는 IP 기반)를 가져오는 커스텀 훅
 * 1순위: navigator.geolocation.getCurrentPosition() (GPS 기반)
 * 2순위: https://ipapi.co/json/ (IP 기반)
 * 3순위 : 에러문구
 */
export default function useUserLocation() {
  const [location, setLocation] = useState<Location | null>(null);
  const [error, setError] = useState<string | null>(null);

  /**
   * @function fallbackToIP
   *
   * GPS 기반 위치 정보를 가져오지 못했을 때 실행되는 함수 (2순위)
   * 사용자의 IP 주소를 기반으로 대략적인 위도(latitude)와 경도(longitude)를 추정하여 위치 상태를 설정.
   * 참고: IP 기반 위치는 GPS보다 정확도가 낮을 수 있으며, VPN, 프록시 사용 시 실제 위치와 다를 수 있음.
   */
  const fallbackToIP = () => {
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => {
        if (data.latitude && data.longitude) {
          setLocation({
            lat: data.latitude,
            lng: data.longitude,
            source: "ip",
          });
        } else {
          throw new Error("IP 기반 위치 정보 없음");
        }
      })
      .catch((err) => {
        console.error("IP 위치 조회 실패:", err);
        setError("위치 정보를 가져올 수 없습니다.");
      });
  };

  useEffect(() => {
    if (!navigator.geolocation) {
      fallbackToIP();
      return;
    }

    // geo로 GPS 정보 가져오는 부분 (1순위)
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          source: "gps",
        });
      },
      (err) => {
        console.error("GPS 실패:", err);
        fallbackToIP();
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  }, []);

  return { location, error };
}
