"use client";

import { CenterColumn } from "@/styles/BaseComponents";
import { Font } from "@/styles/Typography";
import useUserLocation from "@/hooks/useUserLocation";

export default function LocationSimple() {
  const { location, error } = useUserLocation();

  if (error) return <p>{error}</p>;
  if (!location) return <p>위치 정보를 불러오는 중...</p>;

  return (
    <CenterColumn>
      <Font typo="t01_bold_m">
        위도: {location.lat}, 경도: {location.lng} <br />
      </Font>
      <Font typo="m01_m" color="blue_500">
        ({location.source === "gps" ? "정확한 GPS" : "IP 기반 대략적 위치"})
      </Font>
    </CenterColumn>
  );
}
