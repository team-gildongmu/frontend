export type Origin = { mapX: number; mapY: number };

export type Lang = "ko" | "en" | "ja";

export type StartSessionRequest = {
  origin?: Origin;
  days?: number;
  mode?: "walk" | "drive" | "transit";
  tags?: string[];
  lang?: Lang;
};

export type StartSessionResponse = {
  session_id: string;
};

export type MessageRequest = {
  message: string;
  origin?: Origin | null;
  days?: number | null;
  mode?: "walk" | "drive" | "transit" | null;
  tags?: string[] | null;
  lang?: Lang;
};

export type Coords = { mapx: number | null; mapy: number | null };

export type Segment = {
  type: "POI" | "MEAL";
  title: string;
  desc: string;
  reason: string;
  images: string[];
  coords: Coords;
  provider: "tourapi" | "google";
  source: string;
};

export type DayPlan = {
  day: number;
  segments: Segment[];
};

export type Stay = {
  type: "STAY";
  title: string;
  desc: string;
  reason: string;
  images: string[];
  coords: Coords;
  provider: "tourapi" | "google";
  source: string;
};

export type Plan = {
  title: string;
  subtitle: string;
  keywords?: string[];
  theme?: string[]; // ← 서버에서 tags를 theme로 복사해서 내려줌
  days: DayPlan[];
  stays?: Stay[];
  summary?: string;
};

export type MessageResponse = {
  plan: Plan;
  status: { step: string; message: string };
};

export type StateHistoryUser = { role: "user"; text: string; ts: number };
export type StateHistoryAssistant = { role: "assistant"; plan: Plan; ts: number };
export type StateSnapshot = { history?: Array<StateHistoryUser | StateHistoryAssistant> };
export type StateResponse = { state: StateSnapshot };

const BASE =
  process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/$/, "")

async function apiFetch<T>(
  path: string,
  opts: RequestInit & { token?: string } = {}
): Promise<T> {
  const { token, headers, ...rest } = opts;
  const res = await fetch(`${BASE}${path}`, {
    ...rest,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(headers || {}),
    },
  });
  if (!res.ok) {
    let msg = `${res.status} ${res.statusText}`;
    try {
      const j = await res.json();
      msg = j?.detail || msg;
    } catch {}
    throw new Error(msg);
  }
  return res.json();
}

export async function startSession(
  body: StartSessionRequest,
  token: string
): Promise<StartSessionResponse> {
  const lang = body.lang || "ko";
  return apiFetch<StartSessionResponse>("/ai/session/start", {
    method: "POST",
    body: JSON.stringify(body),
    token,
    headers: lang ? { "Accept-Language": lang } : undefined,
  });
}

export async function sendMessage(
  sessionId: string,
  body: MessageRequest,
  token: string
): Promise<MessageResponse> {
  const lang = body.lang || "ko";
  return apiFetch<MessageResponse>(`/ai/session/${sessionId}/message`, {
    method: "POST",
    body: JSON.stringify(body),
    token,
    headers: lang ? { "Accept-Language": lang } : undefined,
  });
}

export function openStatusStream(sessionId: string, token: string): EventSource {
  // SSE는 헤더를 못 보내므로 ?token= 사용 (백엔드가 지원하도록 구현됨)
  const url = `${BASE}/ai/session/${sessionId}/events?token=${encodeURIComponent(
    token
  )}`;
  return new EventSource(url);
}

export async function getState(
  sessionId: string,
  token: string
): Promise<StateResponse> {
  return apiFetch<StateResponse>(`/ai/session/${sessionId}/state`, {
    method: "GET",
    token,
  });
}
