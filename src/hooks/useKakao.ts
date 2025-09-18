"use client";

let kakaoPromise: Promise<any> | null = null;

export default function useKakao(): boolean {
  // 간단하게: window.kakao.maps 존재 여부를 boolean으로 노출
  if (typeof window === "undefined") return false;

  if (window.kakao?.maps) return true;

  if (!kakaoPromise) {
    kakaoPromise = new Promise((resolve, reject) => {
      const key = process.env.NEXT_PUBLIC_KAKAO_JS_KEY;
      if (!key) {
        console.error("❌ NEXT_PUBLIC_KAKAO_JS_KEY 가 설정되지 않았습니다.");
        reject(new Error("Kakao key missing"));
        return;
      }

      const LIBS = "services,clusterer";
      const src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${key}&libraries=${LIBS}&autoload=false`;

      const ready = () => {
        if (window.kakao?.maps?.load) {
          window.kakao.maps.load(() => resolve(window.kakao));
        } else if (window.kakao?.maps) {
          resolve(window.kakao);
        } else {
          const start = Date.now();
          const t = setInterval(() => {
            if (window.kakao?.maps?.load) {
              clearInterval(t);
              window.kakao.maps.load(() => resolve(window.kakao));
            } else if (window.kakao?.maps) {
              clearInterval(t);
              resolve(window.kakao);
            } else if (Date.now() - start > 10000) {
              clearInterval(t);
              reject(new Error("Kakao SDK load timeout"));
            }
          }, 60);
        }
      };

      let script = document.querySelector<HTMLScriptElement>(
        'script[data-kakao-maps-sdk="true"]'
      );
      if (!script) {
        script = document.createElement("script");
        script.src = src;
        script.async = true;
        script.defer = true;
        script.dataset.kakaoMapsSdk = "true";
        script.addEventListener("load", ready);
        script.addEventListener("error", () => reject(new Error("Kakao SDK load error")));
        document.head.appendChild(script);
      } else {
        ready();
      }
    });

    kakaoPromise.catch((e) => {
      console.error(e);
      kakaoPromise = null; // 실패 시 다음 렌더에서 재시도
    });
  }

  // 상태를 re-render 없이도 바로 쓰기 위해 단순 boolean 반환
  return !!(window as any).kakao?.maps;
}
