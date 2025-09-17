"use client";

import { useEffect, useRef, useState } from "react";
import colors from "@/styles/Colors";
import useAuth from "@/hooks/useAuth";
import {
  startSession,
  openStatusStream,
  sendMessage,
  type Plan as ApiPlan,
} from "@/api/search/ai";

export type ChatMsg = { 
    role: "user" | "assistant"; 
    text?: string; 
    ts?: number,
    plan?: Plan;
};

export type LatLng = { lat: number; lng: number };
export type Plan = {
  title: string;
  subtitle: string;
  keywords?: string[];
  days: {
    segments: {
      type?: "POI" | "MEAL";
      title: string;
      desc?: string;
      reason?: string;
      images?: string[];
      coords: { mapx: number; mapy: number };
      provider?: "tourapi" | "google";
      source?: string;
    }[];
  }[];
  stays?: {
    title: string;
    desc?: string;
    images?: string[];
    coords: { mapx: number; mapy: number };
    provider?: "tourapi" | "google";
    source?: string;
  }[];
  summary?: string;
  theme?: string | string[];
};

type Props = {
  center: LatLng | null;        // 현재 사용자 좌표(없으면 null)
  onPlan?: (plan: Plan) => void; // 플랜 생성되면 부모로 전달
};

export default function ChatSheet({ center, onPlan }: Props) {
  const { getUserToken } = useAuth();
  const token = getUserToken();

  // 시트 높이(드래그)
  const MIN_H = 220;
  const MAX_H =
    typeof window !== "undefined" ? Math.floor(window.innerHeight * 0.95) : 700;
  const [height, setHeight] = useState<number>(MIN_H);
  const dragRef = useRef(false);

// 랜덤 안내 멘트 목록
const GREETINGS = [
"오늘은 어떤 기분이세요? 신나게 놀고 싶으세요, 아니면 푹 쉬면서 힐링하고 싶으세요?",
"가고 싶은 장소가 있나요? 없다면 근처에서 알짜 코스도 추천해드릴 수 있어요 😊",
"먹방, 힐링, 액티비티! 지금 땡기는 여행 테마가 뭐예요?",
"오늘 하루, 어디서 어떻게 보내고 싶으세요? 제가 딱 맞는 코스를 짜드릴게요 ✨",
"친구랑 놀고 싶으세요? 혼자 힐링하고 싶으세요? 분위기만 말해주셔도 추천해드려요!",
] as const;

const pickGreeting = () =>
  GREETINGS[Math.floor(Math.random() * GREETINGS.length)];

  // 채팅
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState<ChatMsg[]>([
    {
      role: "assistant",
      text: pickGreeting(),
      ts: Date.now(), // ✅ number 로 통일
    },
  ]);

  // 진행 상태 (DONE 표시 X, RESULT 오면 로더 숨김)
  const [running, setRunning] = useState<null | { step: string; message: string }>(null);

  // 결과가 생겼는지 여부(버튼 노출 제어)
  const [hasPlan, setHasPlan] = useState(false);

  // 세션
  const [sessionId, setSessionId] = useState<string | null>(null);
  const sseRef = useRef<EventSource | null>(null);

  // 메시지 영역 스크롤
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const scrollToBottom = () => {
    requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    });
  };
  useEffect(scrollToBottom, [msgs.length, running?.step]);

  // 드래그 핸들
  useEffect(() => {
    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!dragRef.current) return;
      const clientY =
        "touches" in e ? (e as TouchEvent).touches[0].clientY : (e as MouseEvent).clientY;
      const newH = Math.min(MAX_H, Math.max(MIN_H, window.innerHeight - clientY));
      setHeight(newH);
    };
    const stop = () => (dragRef.current = false);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", stop);
    window.addEventListener("touchmove", onMove);
    window.addEventListener("touchend", stop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", stop);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", stop);
    };
  }, []);

  // SSE 연결
  const ensureSSE = (sid: string) => {
    if (sseRef.current) return;
    const es = openStatusStream(sid, token ?? "");
    sseRef.current = es;

    es.addEventListener("message", (ev: MessageEvent) => {
      try {
        const data = JSON.parse(ev.data);
        const step: string = (data.step || "").toUpperCase();
        const message: string = data.message || "";

        if (step === "DONE") return; // 표시 X
        if (step === "RESULT") {
          setRunning(null); // 결과 준비 끝 → 로더 숨김
          return;
        }
        // ANALYZE / TOURAPI / PLAN
        setRunning({ step, message });
      } catch {
        /* ignore */
      }
    });

    es.addEventListener("error", () => {
      console.warn("[SSE] error → closing");
      es.close();
      sseRef.current = null;
    });

    console.log("[SSE] connected:", sid);
  };

  // 언마운트 시 SSE 해제
  useEffect(() => {
    return () => {
      if (sseRef.current) {
        sseRef.current.close();
        sseRef.current = null;
      }
    };
  }, []);

  // API Plan → 우리 Plan
  const normalizePlan = (p: ApiPlan): Plan => ({
    title: p.title,
    subtitle: p.subtitle,
    keywords: p.keywords,
    theme: p.theme as any,
    days: (p.days || []).map((d: any) => ({
      segments: (d.segments || []).map((s: any) => ({
        type: s.type,
        title: s.title,
        desc: s.desc,
        reason: s.reason,
        images: s.images,
        coords: s.coords,
      })),
    })),
    stays: (p.stays || []).map((s: any) => ({
      title: s.title,
      desc: s.desc,
      images: s.images,
      coords: s.coords,
    })),
    summary: p.summary,
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const q = input.trim();
    const now = Date.now();

    // 사용자 메시지
    setMsgs((m) => [...m, { role: "user", text: q, ts: now }]);
    setInput("");

    try {
      // 새 입력마다 "결과 준비됨" 플래그 초기화
      setHasPlan(false);

      // 세션 없으면 시작
      let sid = sessionId;
      if (!sid) {
        const origin = center ? { mapX: center.lng, mapY: center.lat } : undefined;
        const { session_id } = await startSession({ origin }, token ?? "");
        sid = session_id;
        setSessionId(session_id);
        console.log("[Search] session started:", session_id, " center=", origin);
        ensureSSE(session_id);
      }

      // 로딩 시작
      setRunning({ step: "WAIT", message: "준비 중…" });

      // 질문 보내기
      const origin = center ? { mapX: center.lng, mapY: center.lat } : undefined;
      const res = await sendMessage(sid!, { message: q, origin }, token ?? "");

      // 결과 수신
      setRunning(null);
      const plan = normalizePlan(res.plan);
      onPlan?.(plan);
      setHasPlan(true); // ✅ 결과가 생겼을 때만 버튼 노출
      // 어시스턴트 안내 한 줄
      setMsgs((m) => [...m, { role: "assistant", plan, ts: Date.now() }]);
    } catch (err: any) {
      console.error(err);
      setRunning(null);
      setMsgs((m) => [
        ...m,
        {
          role: "assistant",
          text: `문제가 발생했어요. 잠시 후 다시 시도해 주세요.\n(${String(
            err?.message || "Unknown error"
          )})`,
          ts: Date.now(),
        },
      ]);
    }
  };

  const disabled = !!running; // 로딩 중엔 입력 비활성화

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        height,
        zIndex: 20,
        display: "flex",
        flexDirection: "column",
        backdropFilter: "blur(4px)",
        WebkitBackdropFilter: "blur(4px)",
      }}
    >
      {/* 카드 형태 시트 */}
      <div
        style={{
          margin: "0 auto",
          width: "100%",
          height: "100%",
          background: colors.blue_300,
          borderRadius: "16px 16px 0 0",
          boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* 드래그 핸들 */}
        <div
          onMouseDown={() => (dragRef.current = true)}
          onTouchStart={() => (dragRef.current = true)}
          style={{
            height: 18,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "ns-resize",
            background: "transparent",
          }}
        >
          <div
            style={{
              width: 42,
              height: 4,
              borderRadius: 4,
              background: "rgba(0,0,0,0.2)",
            }}
          />
        </div>

        {/* 메시지 영역 */}
        <div
          ref={scrollRef}
          className="noScrollbars" 
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "8px 14px 8px 14px",
          }}
        >
          {msgs.map((m, idx) =>
            m.plan ? (
              <AssistantPlanBubble key={idx} plan={m.plan} ts={m.ts} />
            ) : (
              <Bubble key={idx} role={m.role} text={m.text || ""} ts={m.ts} />
            )
          )}

          {/* 진행 상태 애니메이션 + 텍스트(교체) */}
          {running && running.step !== "DONE" && running.step !== "RESULT" && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "12px 0 16px 0",
              }}
            >
              <LoaderDots color={colors.blue_500} />
              <div
                style={{
                  marginTop: 10,
                  fontSize: 14,
                  color: "#555",
                  textAlign: "center",
                }}
              >
                {running.message}
              </div>
            </div>
          )}

          {/* 플랜 생기면 액션 버튼(왼쪽 정렬) */}
          {hasPlan && !running && (
            <div style={{ display: "flex", justifyContent: "flex-start" }}>
              <PlanActions
                onFix={() => alert("루트 확정! (추후 POST 연동)")}
                onRevise={() => setInput("숙소는 좀 더 저렴한 곳으로 바꿔줘")}
              />
            </div>
          )}
        </div>

        {/* 입력 바 */}
        <div style={{ padding: 12, borderTop: "1px solid #e9e9e9", background: "#fff" }}>
          <form onSubmit={onSubmit} style={{ display: "flex", gap: 8 }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="무엇을 도와드릴까요? (예) 홍대에서 2일코스 + 맛집 추천해줘"
              style={{
                flex: 1,
                height: 44,
                padding: "0 12px",
                borderRadius: 12,
                border: "1px solid #d7d7d7",
                outline: "none",
              }}
              disabled={disabled}
            />
            <button
              type="submit"
              disabled={disabled}
              style={{
                height: 44,
                padding: "0 14px",
                borderRadius: 12,
                border: "none",
                background: disabled ? "#c7c7c7" : "#1e90ff",
                color: "#fff",
                fontWeight: 600,
                cursor: disabled ? "not-allowed" : "pointer",
              }}
            >
              보내기
            </button>
          </form>
        </div>
      </div>

      {/* 스크롤바 숨기기 */}
      <style jsx>{`
        .noScrollbars {
          scrollbar-width: none; /* Firefox */
        }
        .noScrollbars::-webkit-scrollbar {
          display: none; /* Chrome/Safari */
        }
      `}</style>
    </div>
  );
}

/* --- UI 컴포넌트들 --- */

function Bubble({
  role,
  text,
  ts,
}: {
  role: "user" | "assistant";
  text: string;
  ts?: number; 
}) {
  const isUser = role === "user";
  const bg = isUser ? colors.yellow_300 : colors.blue_500;
  const color = isUser ? "#333" : "#fff";

  return (
    <div
      style={{
        display: "flex",
        justifyContent: isUser ? "flex-end" : "flex-start",
        padding: "6px 0",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: isUser ? "row-reverse" : "row",
          alignItems: "flex-end",
          gap: 8,
          maxWidth: "90%",
        }}
      >
        {/* 말풍선 */}
        <div
          style={{
            maxWidth: "70vw",
            background: bg,
            color,
            borderRadius: 12,
            padding: "10px 12px",
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
            boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
          }}
        >
          {text}
        </div>

        {/* 시간(버블 바깥, 유저=왼쪽 / 어시스턴트=오른쪽) */}
        {!!ts && (
          <div
            style={{
              color: "#9a9a9a",
              fontSize: 11,
              whiteSpace: "nowrap",
              margin: "0 6px",
            }}
          >
            {formatKTime(ts)}
          </div>
        )}
      </div>
    </div>
  );
}

function PlanActions({ onFix, onRevise }: { onFix: () => void; onRevise: () => void }) {
  return (
    <div style={{ marginTop: 10, display: "flex", gap: 8 }}>
      <button
        onClick={onFix}
        style={{
          height: 40,
          padding: "0 14px",
          borderRadius: 12,
          border: "1px solid #0b62e6",
          background: "#0b62e6",
          color: "#fff",
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        루트 확정하기
      </button>
      <button
        onClick={onRevise}
        style={{
          height: 40,
          padding: "0 14px",
          borderRadius: 12,
          border: "1px solid #d0d0d0",
          background: "#fff",
          color: "#333",
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        루트 수정하기
      </button>
    </div>
  );
}

function AssistantPlanBubble({ plan, ts }: { plan: Plan; ts?: number }) {
  const stamp = ts ? formatKTime(ts) : "";

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-start",
        padding: "8px 0",
      }}
    >
      <div
        style={{
          maxWidth: "88vw",
          borderRadius: 12,
          background: colors.blue_500, // 어시스턴트 버블 배경
          color: "#fff",
          boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
          overflow: "hidden",
        }}
      >
        <div style={{ padding: "12px 14px 10px 14px" }}>
          {/* 타이틀 */}
          <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 4 }}>
            {plan.title}
          </div>
          <div style={{ fontSize: 14, opacity: 0.9, marginBottom: 10 }}>
            {plan.subtitle}
          </div>

          {/* 일자별 섹션 */}
          {plan.days?.map((d, idx) => (
            <div
              key={`day-${idx}`}
              style={{
                background: "rgba(255,255,255,0.2)",
                borderRadius: 10,
                padding: "10px 12px",
                marginTop: 8,
              }}
            >
              <div style={{ fontWeight: 700, marginBottom: 6 }}>
                Day {idx + 1}
              </div>

              <div style={{ display: "grid", gap: 8 }}>
                {d.segments?.map((s, i) => (
                  <RowLine
                    key={i}
                    label={s.type === "MEAL" ? "맛집" : "장소"}
                    color={s.type === "MEAL" ? "#f59e0b" : "#60a5fa"}
                    title={s.title}
                    provider={s.provider}
                  />
                ))}
              </div>
            </div>
          ))}

          {/* 숙박 */}
          {!!plan.stays?.length && (
            <div
              style={{
                marginTop: 10,
                background: "rgba(255,255,255,0.2)",
                borderRadius: 10,
                padding: "10px 12px",
              }}
            >
              <div style={{ fontWeight: 700, marginBottom: 6 }}>
                숙박 추천
              </div>
              <ol style={{ paddingLeft: 18, margin: 0, display: "grid", gap: 6 }}>
                {plan.stays.map((s, i) => (
                  <li key={i} style={{ lineHeight: 1.35 }}>
                    <span style={{ marginRight: 6 }}>{s.title}</span>
                    <ProviderChip provider={s.provider} />
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* 요약 */}
          {!!plan.summary && (
            <div
              style={{
                marginTop: 10,
                lineHeight: 1.45,
                background: "rgba(255,255,255,0.2)",
                padding: "10px 12px",
                borderRadius: 10,
              }}
            >
              <div style={{ fontWeight: 700, marginBottom: 6 }}>
                ✨ 요약
              </div>
              {plan.summary}
            </div>
          )}
        </div>
      </div>

      {/* 타임스탬프(버블 바깥, 우하단 정렬) */}
      {stamp && (
        <div
          style={{
            color: "#9a9a9a",
            fontSize: 11,
            marginLeft: 6,
            alignSelf: "flex-end",
          }}
        >
          {stamp}
        </div>
      )}
    </div>
  );
}

function LoaderDots({ color = "#555" }: { color?: string }) {
  return (
    <div style={{ display: "inline-flex", gap: 6, alignItems: "flex-end" }}>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: color,
            display: "inline-block",
            animation: `bounce 1.2s ${i * 0.15}s infinite`,
          }}
        />
      ))}
      <style>{`
        @keyframes bounce {
          0%   { transform: translateY(0);     opacity: .35; }
          35%  { transform: translateY(-7px);  opacity: 1;   }
          70%  { transform: translateY(0);     opacity: .35; }
          100% { transform: translateY(0);     opacity: .35; }
        }
      `}</style>
    </div>
  );
}

function RowLine({
  label,
  color,
  title,
  provider,
}: {
  label: string;
  color: string;
  title: string;
  provider?: "tourapi" | "google";
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "auto 1fr auto",
        gap: 10,
        alignItems: "center",
      }}
    >
      <span
        style={{
          padding: "2px 8px",
          borderRadius: 999,
          background: "#fff",
          color: "#111",
          fontSize: 12,
          fontWeight: 700,
        }}
      >
        {label}
      </span>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: color,
            display: "inline-block",
          }}
        />
        <span style={{ fontSize: 15 }}>{title}</span>
      </div>
      <ProviderChip provider={provider} />
    </div>
  );
}

function ProviderChip({ provider }: { provider?: "tourapi" | "google" }) {
  if (!provider) return null;
  const isTour = provider === "tourapi";
  return (
    <span
      style={{
        fontSize: 11,
        padding: "2px 6px",
        borderRadius: 6,
        background: "#f1f5f9",
        color: "#334155",
        fontWeight: 700,
        whiteSpace: "nowrap",
      }}
      title={isTour ? "KTO(TourAPI) 데이터" : "Google 데이터"}
    >
      {isTour ? "TourAPI" : "Google"}
    </span>
  );
}

function formatKTime(ts: number) {
  const d = new Date(ts);
  const y = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  let h = d.getHours();
  const m = String(d.getMinutes()).padStart(2, "0");
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;
  return `${y}.${mm}.${dd} ${ampm} ${h}:${m}`;
}
