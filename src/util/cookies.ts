import { Cookies } from "react-cookie";
//TODO 타입 수정 및 next cookies api 사용
const cookies = new Cookies();

/**
 * 쿠키값 가져오기
 *
 * @param {string} name - 가져올 쿠키의 이름
 * @returns {string | undefined} 쿠키 값 (없을 경우 `undefined` 반환)
 *
 */
export const getCookie = (name: string) => {
  return cookies.get(name);
};

/**
 * 쿠키를 설정
 *
 * @param {string} name - 저장할 쿠키의 이름
 * @param {string} value - 저장할 쿠키의 값
 * @param {CookieSetOptions} [options] - 쿠키 설정 옵션 (예: `expires`, `path`, `domain`, `secure`, `httpOnly`)
 *
 */
export const setCookie = (name: string, value: string, options?: object) => {
  return cookies.set(name, value, { ...options });
};

/**
 * 쿠키 삭제
 *
 * @param {string} name - 삭제할 쿠키의 이름
 * @param {string} domain - 쿠키의 도메인
 * @param {string} path - 쿠키 경로
 *
 */
export const removeCookie = (name: string, domain: string, path: string) => {
  return cookies.remove(name, { domain: domain, path: path });
};
