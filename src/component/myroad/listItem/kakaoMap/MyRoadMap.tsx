import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import styled from "styled-components";
import Modal from "@/component/common/Modal";
import { Button, Div } from "@/styles/BaseStyledTags";
import MapSelectedLoactionModal from "../MapSelectedLoactionModal";
import { useTranslation } from "react-i18next";
import useGetLogMapInfoQuery from "@/queries/travel/useLogMapInfo";
import { colorPalette } from "@/component/common/ColorPalette";
import { buildMarkerEl } from "@/component/myroad/listItem/kakaoMap/BuildMarkerEl";
import { TravelLocation } from "@/types/travel";

// Kakao Maps 타입을 kakao.d.ts에서 가져옴
type KakaoMap = kakao.maps.Map;
type KakaoPolyline = kakao.maps.Polyline;
type KakaoCustomOverlay = kakao.maps.CustomOverlay;
import { Z_INDEX } from "@/styles/ZIndex";
import { CenterRow } from "@/styles/BaseComponents";

interface MyRoadMapProps {
  isOpen: boolean;
  onClose: () => void;
  myroadid: number;
}

interface NormalizedLocation {
  id: number;
  lat: number;
  lng: number;
  title: string;
  type: string;
  day: number;
  order: number; // 일자 내 순서
}

type ViewMode = "SOLO" | "ALL";

export default function MyRoadMap({
  isOpen,
  onClose,
  myroadid,
}: MyRoadMapProps) {
  const { t } = useTranslation();
  const { data: MapInfo } = useGetLogMapInfoQuery(myroadid);

  // 일자별 정규화
  const { byDay, allList, dayKeys, locationMap } = useMemo(() => {
    const byDay: Record<number, NormalizedLocation[]> = {};
    let all: NormalizedLocation[] = [];
    const locationMap: Record<number, TravelLocation> = {};
    const raw = MapInfo?.locations || {};
    const _dayKeys = Object.keys(raw)
      .map((d) => Number(d))
      .filter((n) => !Number.isNaN(n))
      .sort((a, b) => a - b);

    _dayKeys.forEach((day) => {
      const arr = (raw[String(day)] || []).map(
        (loc: TravelLocation, idx: number) => {
          // locationMap에 원본 데이터 저장
          locationMap[loc.travel_location_id] = loc;
          return {
            id: loc.travel_location_id,
            lat: loc.latitude,
            lng: loc.longitude,
            title: loc.title,
            type: loc.location_type,
            day,
            order: idx + 1,
          };
        }
      );
      byDay[day] = arr;
      all = all.concat(arr);
    });

    return { byDay, allList: all, dayKeys: _dayKeys, locationMap };
  }, [MapInfo]);

  const mapDivRef = useRef<HTMLDivElement>(null);
  const mapObjRef = useRef<KakaoMap | null>(null);
  const overlaysRef = useRef<KakaoCustomOverlay[]>([]);
  const polylinesRef = useRef<KakaoPolyline[]>([]);

  const [viewMode, setViewMode] = useState<ViewMode>("SOLO");
  const [activeDay, setActiveDay] = useState<number | null>(null);
  const [selectedLocation, setSelectedLocation] =
    useState<NormalizedLocation | null>(null);

  // 초기 활성 일자 설정
  useEffect(() => {
    if (dayKeys.length > 0 && activeDay === null) {
      setActiveDay(dayKeys[0]);
    }
  }, [dayKeys, activeDay]);

  // 숫자 좌표 계산
  const initialCenterCoord = useMemo(() => {
    const first =
      (dayKeys.length > 0 && byDay[dayKeys[0]] && byDay[dayKeys[0]][0]) ||
      allList[0];
    return first
      ? { lat: first.lat, lng: first.lng }
      : { lat: 37.5665, lng: 126.978 };
  }, [byDay, dayKeys, allList]);

  const clearMapDrawings = () => {
    overlaysRef.current.forEach((o) => o.setMap(null));
    polylinesRef.current.forEach((p) => p.setMap(null));
    overlaysRef.current = [];
    polylinesRef.current = [];
  };

  const drawMapContent = useCallback(
    (map: KakaoMap) => {
      const showDays: number[] = (() => {
        if (viewMode === "ALL") {
          return dayKeys;
        }
        if (activeDay !== null) {
          return [activeDay];
        }
        if (dayKeys.length > 0) {
          return [dayKeys[0]];
        }
        return [];
      })();

      if (showDays.length === 0) return;

      const bounds = new window.kakao.maps.LatLngBounds();

      showDays.forEach((day, idx) => {
        const color = colorPalette[(day - 1) % colorPalette.length];
        const dayList = byDay[day] || [];

        dayList.forEach((loc) => {
          const position = new window.kakao.maps.LatLng(loc.lat, loc.lng);
          bounds.extend(position);

          const el = buildMarkerEl(String(loc.order), color, day);
          el.addEventListener("click", () => setSelectedLocation(loc));

          const overlay = new window.kakao.maps.CustomOverlay({
            content: el,
            position,
            yAnchor: 1,
            zIndex: 100 + loc.order + idx * 1000,
          });
          overlay.setMap(map);
          overlaysRef.current.push(overlay);
        });

        if (dayList.length >= 2) {
          const path = dayList.map(
            (loc) => new window.kakao.maps.LatLng(loc.lat, loc.lng)
          );
          const polyline = new window.kakao.maps.Polyline({
            path,
            strokeWeight: 4,
            strokeColor: color,
            strokeOpacity: 0.9,
            strokeStyle: "solid",
          });
          polyline.setMap(map);
          polylinesRef.current.push(polyline);
        }
      });

      if (!bounds.isEmpty()) {
        map.setBounds(bounds, 32, 32, 32, 32);
      }

      setTimeout(() => window.kakao.maps.event.trigger(map, "resize"), 0);
    },
    [viewMode, activeDay, byDay, dayKeys, setSelectedLocation]
  );

  // 지도 생성
  useEffect(() => {
    if (!isOpen || !mapDivRef.current || !window.kakao) return;
    window.kakao.maps.load(() => {
      const center = new window.kakao.maps.LatLng(
        initialCenterCoord.lat,
        initialCenterCoord.lng
      );
      const map = new window.kakao.maps.Map(mapDivRef.current!, {
        center,
        level: 6,
      });
      mapObjRef.current = map;
      setTimeout(() => window.kakao.maps.event.trigger(map, "resize"), 0);

      // 지도 생성 완료 후 즉시 그리기 실행
      setTimeout(() => {
        clearMapDrawings();
        drawMapContent(map);
      }, 100);
    });
  }, [isOpen, initialCenterCoord, drawMapContent]);

  // 지도 그리기 (activeDay나 viewMode 변경 시)
  useEffect(() => {
    const map = mapObjRef.current;
    if (!map || !window.kakao) return;

    drawMapContent(map);
  }, [viewMode, activeDay, byDay, dayKeys, drawMapContent]);

  // 닫힐 때 초기화
  useEffect(() => {
    if (!isOpen) {
      clearMapDrawings();
      mapObjRef.current = null;
      setSelectedLocation(null);
      setViewMode("SOLO");
      setActiveDay(dayKeys[0] ?? null);
    }
  }, [isOpen, dayKeys]);

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title={t("myroad.map.title")}
        width="100%"
        height="100%"
        maxWidth="780px"
      >
        <TopBar gridGap="20px">
          <ModeSwitch>
            <ModeBtn
              $active={viewMode === "SOLO"}
              onClick={() => {
                setViewMode("SOLO");
              }}
            >
              {t("myroad.map.solo")}
            </ModeBtn>
            <ModeBtn
              $active={viewMode === "ALL"}
              onClick={() => {
                setViewMode("ALL");
              }}
            >
              {t("myroad.map.all")}
            </ModeBtn>
          </ModeSwitch>
          <DayChips>
            {dayKeys.map((d) => (
              <Chip
                key={d}
                $active={activeDay === d}
                $color={colorPalette[(d - 1) % colorPalette.length]}
                onClick={() => {
                  setActiveDay(d);
                }}
                title={t("myroad.map.day", { day: d })}
              >
                {t("myroad.map.day", { day: d })}
              </Chip>
            ))}
          </DayChips>
        </TopBar>

        <MapContainer ref={mapDivRef} />
      </Modal>

      {selectedLocation && (
        <MapSelectedLoactionModal
          selectedLocation={{
            id: selectedLocation.id,
            lat: selectedLocation.lat,
            lng: selectedLocation.lng,
            title: selectedLocation.title,
            description: locationMap[selectedLocation.id]?.description || "",
            image: locationMap[selectedLocation.id]?.image_link || "",
          }}
          setSelectedLocation={(location) => {
            if (location) {
              setSelectedLocation({
                id: location.id,
                lat: location.lat,
                lng: location.lng,
                title: location.title,
                type: "attraction", // 기본값
                day: 1, // 기본값
                order: 1, // 기본값
              });
            } else {
              setSelectedLocation(null);
            }
          }}
        />
      )}
    </>
  );
}

const MapContainer = styled(Div)`
  width: 100%;
  height: 100%;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
`;

const TopBar = styled(CenterRow)`
  position: absolute;
  z-index: ${Z_INDEX.MODAL_BAR};
  top: 100px;
`;

const DayChips = styled(CenterRow)`
  gap: 6px;
  flex-wrap: wrap;
  pointer-events: auto;
`;

const Chip = styled(Button)<{ $active?: boolean; $color?: string }>`
  padding: 6px 10px;
  border-radius: 999px;
  border: 1px solid ${({ $color }) => $color ?? "#ddd"};
  background: ${({ $active, $color }) => ($active ? $color ?? "#333" : "#fff")};
  color: ${({ $active }) => ($active ? "#fff" : "#333")};
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
`;

const ModeSwitch = styled(CenterRow)`
  display: inline-flex;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 999px;
  overflow: hidden;
  pointer-events: auto;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
`;

const ModeBtn = styled(Button)<{ $active?: boolean }>`
  padding: 8px 14px;
  font-size: 12px;
  font-weight: 700;
  color: ${({ $active }) => ($active ? "#fff" : "#374151")};
  background: ${({ $active }) => ($active ? "#111827" : "transparent")};
  border: none;
  cursor: pointer;
`;
