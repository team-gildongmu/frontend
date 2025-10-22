import { useState, useEffect } from "react";

interface KakaoMapsGlobal {
  maps: {
    load: (cb: () => void) => void;
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

let kakaoPromise: Promise<KakaoMapsGlobal> | null = null;

export default function useKakao(): boolean {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const w = window as unknown as { kakao?: KakaoMapsGlobal };
    if (w.kakao?.maps) {
      setIsReady(true);
      return;
    }

    if (kakaoPromise === null) {
      kakaoPromise = new Promise((resolve, reject) => {
        const key = process.env.NEXT_PUBLIC_KAKAO_JS_KEY;
        if (!key) {
          console.error("❌ NEXT_PUBLIC_KAKAO_JS_KEY 가 설정되지 않았습니다.");
          return reject(new Error("Kakao key missing"));
        }

        const script = document.createElement("script");
        script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${key}&libraries=services,clusterer&autoload=false`;
        script.async = true;
        document.head.appendChild(script);

        script.onload = () => {
          const w = window as unknown as { kakao?: KakaoMapsGlobal };
          w.kakao?.maps.load(() => {
            resolve(w.kakao!);
          });
        };
        script.onerror = () => {
          kakaoPromise = null; // 실패 시 재시도 가능하도록
          reject(new Error("Kakao SDK load error"));
        };
      });
    }

    kakaoPromise.then(() => {
      setIsReady(true);
    }).catch(e => {
      console.error(e);
    });

  }, []);

  return isReady;
}