// src/component/search/KakaoMap.tsx
"use client";

import { useEffect, useRef } from "react";
import useKakao from "@/hooks/useKakao";
import colors from "@/styles/Colors";

export type LatLng = { lat: number; lng: number };
export type MapMarker = { position: LatLng; title?: string };

type Props = {
  center: LatLng;
  markers?: MapMarker[];
  height?: string | number;
  /** 우하단 “내 위치” 버튼 표시 여부 */
  showMyLocation?: boolean;
  /** 내 위치 좌표(있으면 내 위치로 이동 가능) */
  myLocation?: LatLng | null;
  /** “내 위치” 버튼 클릭 시 콜백(선택) */
  onLocateClick?: () => void;
};

export default function KakaoMap({
  center,
  markers = [],
  height = "100%",
  showMyLocation = true,
  myLocation = null,
  onLocateClick,
}: Props) {
  const ready = useKakao();
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapObjRef = useRef<any>(null);
  const markerObjsRef = useRef<any[]>([]);
  const initTriedRef = useRef(false);

  // ---- 지도 초기화 (kakao 로드 보장 + LatLng 준비 보장)
  useEffect(() => {
    if (!ready || !mapRef.current || initTriedRef.current) return;

    const w = window as any;
    const kakao = w.kakao;
    const init = () => {
      const centerLatLng = new kakao.maps.LatLng(center.lat, center.lng);
      const map = new kakao.maps.Map(mapRef.current!, {
        center: centerLatLng,
        level: 5,
      });
      mapObjRef.current = map;
      // 최초 한 번만
      initTriedRef.current = true;
      // 초기 마커 반영
      applyMarkers();
    };

    // LatLng 준비 전이면 maps.load로 보장
    if (typeof kakao?.maps?.LatLng !== "function" && typeof kakao?.maps?.load === "function") {
      kakao.maps.load(() => {
        if (typeof kakao?.maps?.LatLng !== "function") {
          console.warn("[KakaoMap] kakao.maps.LatLng still missing after load()");
          return;
        }
        init();
      });
      return;
    }

    if (!kakao?.maps?.LatLng) {
      console.warn("[KakaoMap] kakao.maps.LatLng not ready");
      return;
    }

    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready]);

  // ---- center 변경 시 지도 센터 이동
  useEffect(() => {
    if (!mapObjRef.current || !ready) return;
    const w = window as any;
    const { kakao } = w;
    mapObjRef.current.setCenter(new kakao.maps.LatLng(center.lat, center.lng));
  }, [center, ready]);

  // ---- markers 변경 시 마커 갱신
  useEffect(() => {
    if (!mapObjRef.current || !ready) return;
    applyMarkers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [markers, ready]);

  function applyMarkers() {
    const w = window as any;
    const { kakao } = w;
    const map = mapObjRef.current;
    if (!map || !kakao?.maps?.Marker) return;

    // clear
    markerObjsRef.current.forEach((m) => m.setMap(null));
    markerObjsRef.current = [];

    if (!markers.length) return;

    const bounds = new kakao.maps.LatLngBounds();

    markers.forEach((m) => {
      const pos = new kakao.maps.LatLng(m.position.lat, m.position.lng);
      const marker = new kakao.maps.Marker({ position: pos, title: m.title });
      marker.setMap(map);
      markerObjsRef.current.push(marker);
      bounds.extend(pos);
    });

    if (markers.length > 1) {
      map.setBounds(bounds);
    } else {
      // 마커 1개면 그 위치로 제대로 센터 고정
      const only = markers[0];
      const pos = new kakao.maps.LatLng(only.position.lat, only.position.lng);
      map.setCenter(pos);
      map.setLevel(5);
    }
  }

  const handleLocate = () => {
    onLocateClick?.();
    const w = window as any;
    const { kakao } = w;
    const map = mapObjRef.current;
    if (map && myLocation) {
      const pos = new kakao.maps.LatLng(myLocation.lat, myLocation.lng);
      map.setCenter(pos);
      map.setLevel(5);

      // 임시 포커스 마커(겹치면 추가하지 않아도 OK)
      const tmp = new kakao.maps.Marker({ position: pos, title: "내 위치" });
      tmp.setMap(map);
      // 1.5초 후 제거 (선택)
      setTimeout(() => tmp.setMap(null), 1500);
    }
  };

  return (
    <div style={{ position: "relative", width: "100%", height }}>
      <div
        ref={mapRef}
        style={{
          width: "100%",
          height: "100%",
          background: "#eaeaea",
          borderRadius: 8,
        }}
      />

      {showMyLocation && myLocation && (
        <button
          onClick={handleLocate}
          title="내 위치로 이동"
          className="locationBtn"
          style={{
            position: "absolute",
            right: 12,
            top: 12,
            zIndex: 30,

            width: 44,
            height: 44,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 12,
            cursor: "pointer",

            background: colors.blue_400,
            color: colors.white,
            border: `1px solid ${colors.blue_400}`,
            boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
            transition: "transform 0.8s ease, filter .12s ease",
          }}
          onMouseDown={(e) => {(e.currentTarget as HTMLButtonElement).style.transform = "scale(0.97)";}}
          onMouseUp={(e) => {(e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";}}
          onMouseEnter={(e) => {(e.currentTarget as HTMLButtonElement).style.filter = "brightness(1.02)";}}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.filter = "none";
            (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
          }}
        >
          <i className="bi bi-crosshair" style={{ fontSize: 20, lineHeight: 1 }} />
        </button>
      )}
    </div>
  );
}
