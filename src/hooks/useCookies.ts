// 쿠키 가져오기 함수 (브라우저 환경에서만 작동)
const getCookie = (name?: string): string | null => {
  if (typeof document !== "undefined" && name) {
    try {
      const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
      return match ? decodeURIComponent(match[2]) : null;
    } catch (error) {
      console.error("쿠키 읽기 오류:", error);
      return null;
    }
  }
  return null;
};

// 쿠키 저장 유틸 개선
const setCookie = (name: string, value: string, days: number = 365): void => {
  if (typeof document === "undefined" || !name || !value) return;

  try {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + days);

    // 쿠키 문자열 생성 (인코딩 포함)
    const cookieString = `${name}=${encodeURIComponent(
      value
    )}; path=/; expires=${expirationDate.toUTCString()}; SameSite=Lax`;

    document.cookie = cookieString;
  } catch (error) {
    console.error("쿠키 저장 오류:", error);
  }
};

export { getCookie, setCookie };
