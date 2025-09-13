// 쿠키 가져오기 함수 (브라우저 환경에서만 작동)
const getCookie = (name?: string) => {
  if (typeof document !== "undefined") {
    const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
    return match ? match[2] : null;
  }
  return null;
};

// 쿠키 저장 유틸 (브라우저 환경에서만 작동)
const setCookie = (name: string, value: string, days: number = 365) => {
  if (typeof document === "undefined") return;
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + days);
  document.cookie = `${name}=${value}; path=/; expires=${expirationDate.toUTCString()}`;
};

export { getCookie, setCookie };
