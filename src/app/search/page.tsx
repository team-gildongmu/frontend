// src/app/search/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import useUserLocation from "@/hooks/useUserLocation";
import KakaoMap, { MapMarker } from "@/component/search/KakaoMap";
import ChatSheet, { Plan } from "@/component/search/ChatSheet";

export default function SearchPage() {
  const { location } = useUserLocation();
  const [plan, setPlan] = useState<Plan | null>(null);

  useEffect(() => {
    console.log("[Page] location =", location || null);
  }, [location]);

  const markers: MapMarker[] = useMemo(() => {
    const out: MapMarker[] = [];
    if (plan?.days) {
      plan.days.forEach((d) =>
        d.segments.forEach((s) => {
          const { mapx, mapy } = s.coords || {};
          if (typeof mapx === "number" && typeof mapy === "number") {
            out.push({ 
              position: { lat: mapy, lng: mapx }, 
              title: s.title,
              type: s.type || "POI",
              image: s.image || undefined 
            });
          }
        })
      );
    }
    if (plan?.stays) {
      plan.stays.forEach((s) => {
        const { mapx, mapy } = s.coords || {};
        if (typeof mapx === "number" && typeof mapy === "number") {
          out.push({ 
            position: { lat: mapy, lng: mapx }, 
            title: s.title,
            type: "STAY",
            image: s.image || undefined 
          });
        }
      });
    }
    if (!out.length && location) {
      out.push({ 
        position: { lat: location.lat, lng: location.lng }, 
        title: "내 위치",
        type: "MY" 
      });
    }
    console.log("[Page] current markers =", out);
    return out;
  }, [plan, location?.lat, location?.lng]);

  const center = location
    ? { lat: location.lat, lng: location.lng }
    : { lat: 37.5665, lng: 126.978 };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <KakaoMap
        center={center}
        markers={markers}
        height="100%"
        showMyLocation={true}
        myLocation={location ? { lat: location.lat, lng: location.lng } : null}
        onLocateClick={() => console.log("[Map] center to my location")}
      />

      {/* 지도 위 채팅 시트 */}
      <ChatSheet
        center={location ? { lat: location.lat, lng: location.lng } : null}
        onPlan={setPlan}
      />
    </div>
  );
}
