import { useMutation } from "@tanstack/react-query";
import { createTravelLog } from "@/api/travel";

/** Plan(any) -> 백엔드 /travel/log 스키마로 정규화 (provider/source 보강) */
export function toTravelLogPayload(plan: any) {
  const str = (v: any) => (typeof v === "string" ? v : "");
  const strArr = (v: any) =>
    Array.isArray(v) ? v.filter((x) => typeof x === "string") : [];
  const theme1 = (v: any) =>
    typeof v === "string" ? v : Array.isArray(v) && v.length ? v[0] : "자유여행";
  const hasCoords = (s: any) =>
    s?.coords &&
    typeof s.coords.mapx === "number" &&
    typeof s.coords.mapy === "number";
  const ensureSource = (title?: string, src?: string) =>
    src && src.trim().length > 0
      ? src
      : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(title || "")}`;

  const days = (plan?.days || []).map((d: any) => ({
    segments: (d?.segments || [])
      .filter(hasCoords) // 좌표 없는 건 제거(422 방지)
      .map((s: any) => ({
        type: str(s?.type) || "POI",
        title: str(s?.title),
        desc: str(s?.desc),
        reason: str(s?.reason),
        image: str(s?.image),
        coords: {
          mapx: Number(s.coords.mapx),
          mapy: Number(s.coords.mapy),
        },
        provider: s?.provider || "google",            // ★ 필수 필드 보강
        source: ensureSource(s?.title, s?.source),     // ★ 필수 필드 보강
      })),
  }));

  const stays = Array.isArray(plan?.stays)
    ? plan.stays
        .filter(hasCoords)
        .map((s: any) => ({
          title: str(s?.title),
          desc: str(s?.desc),
          image: str(s?.image),
          coords: {
            mapx: Number(s.coords.mapx),
            mapy: Number(s.coords.mapy),
          },
          provider: s?.provider || "google",            // ★ 필수 필드 보강
          source: ensureSource(s?.title, s?.source),     // ★ 필수 필드 보강
        }))
    : [];

  return {
    title: str(plan?.title),
    subtitle: str(plan?.subtitle),
    keywords: strArr(plan?.keywords),
    theme: theme1(plan?.theme), // 항상 string
    summary: str(plan?.summary),
    days,
    stays, // 당일치기면 []
  };
}

export function useCreateLog() {
  return useMutation({
    mutationFn: async (plan: any) => {
      const payload = toTravelLogPayload(plan);
      // ✅ 최종 전송 페이로드를 콘솔로 확인
      console.log("[POST /travel/log] payload =", payload);
      return createTravelLog(payload);
    },
  });
}