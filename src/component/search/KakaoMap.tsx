// src/component/search/KakaoMap.tsx
"use client";

import { useEffect, useRef } from "react";
import useKakao from "@/hooks/useKakao";
import colors from "@/styles/Colors";
import { it } from "node:test";

export type LatLng = { lat: number; lng: number };
export type MapMarker = {
  position: LatLng;
  title?: string;
  type?: "MY" | "POI" | "STAY" | "MEAL";
  image?: string;
};

type Props = {
  center: LatLng;
  markers?: MapMarker[];
  height?: string | number;
  showMyLocation?: boolean;
  myLocation?: LatLng | null;
  onLocateClick?: () => void;
};

declare global {
  interface Window {
    kakao: any;
  }
}

const COLORS: Record<NonNullable<MapMarker["type"]>, string> = {
  POI: "#60a5fa",  // 장소
  MEAL: "#f59e0b", // 맛집
  STAY: "#22c55e", // 숙박
  MY: "#9ca3af",   // 내 위치
};

const FALLBACK_IMG = "/search/default_img.png";

function markerImageDataURL(hex: string) {
  const svg = encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='36' height='36' viewBox='0 0 36 36'>
      <g fill='none' fill-rule='evenodd'>
        <path d='M18 35s10-9.3 10-18A10 10 0 0 0 8 17c0 8.7 10 18 10 18z' fill='${hex}'/>
        <circle cx='18' cy='17' r='4.5' fill='#fff'/>
      </g>
    </svg>`
  );
  return `data:image/svg+xml;charset=UTF-8,${svg}`;
}

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

  // 여행 코스 마커(갈아끼움)
  const markerObjsRef = useRef<any[]>([]);

  // 내 위치 마커(영구 유지)
  const myMarkerRef = useRef<any | null>(null);
  const myMarkerBoundRef = useRef(false);

  // 호버 오버레이(공용 1개 재사용) + hide 타이머
  const hoverOverlayRef = useRef<any | null>(null);
  const hoverTimerRef = useRef<any | null>(null);

  const initTriedRef = useRef(false);

  useEffect(() => {
    if (!ready || !mapRef.current || initTriedRef.current) return;

    const { kakao } = window as any;
    const init = () => {
      const centerLatLng = new kakao.maps.LatLng(center.lat, center.lng);
      const map = new kakao.maps.Map(mapRef.current!, { center: centerLatLng, level: 5 });
      mapObjRef.current = map;
      initTriedRef.current = true;
      applyMarkers();
      applyMyLocation();
    };

    if (typeof kakao?.maps?.LatLng !== "function" && typeof kakao?.maps?.load === "function") {
      kakao.maps.load(() => {
        if (typeof kakao?.maps?.LatLng !== "function") return console.warn("[KakaoMap] LatLng not ready");
        init();
      });
      return;
    }
    if (!kakao?.maps?.LatLng) return console.warn("[KakaoMap] LatLng not ready");
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready]);

  // center 이동
  useEffect(() => {
    if (!mapObjRef.current || !ready) return;
    const { kakao } = window as any;
    mapObjRef.current.setCenter(new kakao.maps.LatLng(center.lat, center.lng));
  }, [center, ready]);

  // 마커 갱신 (코스만)
  useEffect(() => {
    if (!mapObjRef.current || !ready) return;
    applyMarkers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [markers, ready]);

  // 내 위치 갱신/유지
  useEffect(() => {
    if (!mapObjRef.current || !ready) return;
    applyMyLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myLocation, showMyLocation, ready]);

  function getMarkerImageByType(type: NonNullable<MapMarker["type"]>) {
    const { kakao } = window as any;
    const size = new kakao.maps.Size(36, 36);
    const offset = new kakao.maps.Point(18, 34);
    return new kakao.maps.MarkerImage(markerImageDataURL(COLORS[type]), size, { offset });
  }

  function clearCourseMarkers() {
    markerObjsRef.current.forEach((m) => m.setMap(null));
    markerObjsRef.current = [];
  }

  function buildOverlayContent(item: MapMarker) {
    const isMy = item.type === "MY";
    const wrap = document.createElement("div");
    Object.assign(wrap.style, {
      pointerEvents: "auto",
      background: isMy ? "#1f2937" : "#fff",          
      border: isMy ? "1px solid #111827" : "1px solid #e5e7eb",
      borderRadius: "10px",
      boxShadow: "0 8px 24px rgba(0,0,0,.12)",
      overflow: "hidden",
      width: isMy ? "min-width" : "220px",               
      userSelect: "none",
      marginBottom: isMy ? "18px" : 0
    } as CSSStyleDeclaration);

    if (item.type !== "MY") {
      const img = document.createElement("img");
      img.src = item.image || FALLBACK_IMG;
      img.alt = item.title || "";
      Object.assign(img.style, {
        width: "100%",
        height: "120px",
        objectFit: "cover",
        display: "block",
        background: "#f3f4f6",
      } as CSSStyleDeclaration);
      img.onerror = () => { img.src = FALLBACK_IMG; };
      wrap.appendChild(img);
    }

    const text = document.createElement("div");
    text.textContent = item.type === "MY" ? "내 위치" : (item.title || "");
    Object.assign(text.style, {
      padding: "8px 10px",
      fontSize: "13px",
      fontWeight: "700",
      color: isMy? "#ffffff": "#111",
    } as CSSStyleDeclaration);
    wrap.appendChild(text);

    // 깜빡임 방지: 카드 위에 있을 때는 hide 타이머 취소
    wrap.addEventListener("mouseenter", () => {
      if (hoverTimerRef.current) { clearTimeout(hoverTimerRef.current); hoverTimerRef.current = null; }
    });
    wrap.addEventListener("mouseleave", () => scheduleHideOverlay());

    return wrap;
  }

  function showOverlay(item: MapMarker, markerObj: any) {
    const { kakao } = window as any;
    const map = mapObjRef.current;
    if (!map) return;

    if (hoverTimerRef.current) { clearTimeout(hoverTimerRef.current); hoverTimerRef.current = null; }

    const content = buildOverlayContent(item);
    if (!hoverOverlayRef.current) {
      hoverOverlayRef.current = new kakao.maps.CustomOverlay({
        position: markerObj.getPosition(),
        content,
        xAnchor: 0.5,
        yAnchor: 1.2, // 위로 살짝 띄움
        zIndex: 100,
      });
    } else {
      hoverOverlayRef.current.setContent(content);
      hoverOverlayRef.current.setPosition(markerObj.getPosition());
    }
    hoverOverlayRef.current.setMap(map);
  }

  function scheduleHideOverlay() {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    hoverTimerRef.current = setTimeout(() => {
      if (hoverOverlayRef.current) hoverOverlayRef.current.setMap(null);
    }, 120);
  }

  function applyMarkers() {
    const { kakao } = window as any;
    const map = mapObjRef.current;
    if (!map || !kakao?.maps?.Marker) return;

    // 코스 마커만 초기화 (내 위치 마커 유지)
    clearCourseMarkers();

    if (!markers.length) return;

    const bounds = new kakao.maps.LatLngBounds();

    markers.forEach((m) => {
      const pos = new kakao.maps.LatLng(m.position.lat, m.position.lng);
      const type = (m.type ?? "POI") as NonNullable<MapMarker["type"]>;
      const marker = new kakao.maps.Marker({
        position: pos,
        title: m.title,
        image: getMarkerImageByType(type),
      });
      marker.setMap(map);
      markerObjsRef.current.push(marker);
      bounds.extend(pos);

      // 호버 이벤트(코스)
      kakao.maps.event.addListener(marker, "mouseover", () => showOverlay(m, marker));
      kakao.maps.event.addListener(marker, "mouseout", () => scheduleHideOverlay());
    });

    if (markers.length > 1) {
      map.setBounds(bounds);
    } else {
      const only = markers[0];
      const pos = new kakao.maps.LatLng(only.position.lat, only.position.lng);
      map.setCenter(pos);
      map.setLevel(5);
    }
  }

  function applyMyLocation() {
    const { kakao } = window as any;
    const map = mapObjRef.current;
    if (!map || !showMyLocation || !myLocation) {
      if (myMarkerRef.current) { myMarkerRef.current.setMap(null); myMarkerRef.current = null; }
      myMarkerBoundRef.current = false;
      return;
    }

    const pos = new kakao.maps.LatLng(myLocation.lat, myLocation.lng);
    if (!myMarkerRef.current) {
      myMarkerRef.current = new kakao.maps.Marker({
        position: pos,
        title: "내 위치",
        image: getMarkerImageByType("MY"),
      });
      myMarkerRef.current.setMap(map);

      // 호버 이벤트(내 위치) — 중복 바인딩 방지
      if (!myMarkerBoundRef.current) {
        kakao.maps.event.addListener(myMarkerRef.current, "mouseover", () =>
          showOverlay({ position: myLocation, title: "내 위치", type: "MY" }, myMarkerRef.current)
        );
        kakao.maps.event.addListener(myMarkerRef.current, "mouseout", () => scheduleHideOverlay());
        myMarkerBoundRef.current = true;
      }
    } else {
      myMarkerRef.current.setPosition(pos);
      if (!myMarkerRef.current.getMap()) myMarkerRef.current.setMap(map);
    }
  }

  const handleLocate = () => {
    onLocateClick?.();
    const { kakao } = window as any;
    const map = mapObjRef.current;
    if (map && myLocation) {
      const pos = new kakao.maps.LatLng(myLocation.lat, myLocation.lng);
      map.setCenter(pos);
      map.setLevel(5);
      applyMyLocation();
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

      {/* 내 위치 버튼 (기존 스타일 유지) */}
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

      {/* 우측 범례(legend) */}
      <div
        style={{
          position: "absolute",
          left: 12,
          top: 12, // 내 위치 버튼 아래
          zIndex: 25,
          background: "#fff",
          border: "1px solid #e5e7eb",
          boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
          borderRadius: 12,
          padding: "8px 10px",
          minWidth: 110,
          fontSize: 12,
          color: "#111",
          userSelect: "none",
        }}
      >
        {[
          { label: "장소", color: COLORS.POI },
          { label: "맛집", color: COLORS.MEAL },
          { label: "숙박", color: COLORS.STAY },
          { label: "내 위치", color: COLORS.MY },
        ].map((it) => (
          <div
            key={it.label}
            style={{ display: "flex", alignItems: "center", gap: 8, margin: "4px 0" }}
          >
            {/* 아이콘 자체에 색을 입힘 */}
            <i
              className="bi bi-geo-alt-fill"
              style={{ fontSize: 16, lineHeight: 1, color: it.color }}
            />
            <span style={{ fontSize: 13, color: "#111" }}>{it.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
