/**
 * Z-Index 관리
 *
 * 애플리케이션 전체에서 사용되는 z-index 값들을  관리합니다.
 */

export const Z_INDEX = {
  // 기본 콘텐츠 레이어
  BASE: 0,
  CONTENT: 1,
  TAB: 10,

  // 네비게이션 및 헤더
  HEADER: 20,
  FOOTER: 20,

  MODAL: 200,
  MODAL_BAR: 500,
} as const;

export type ZIndexLevel = (typeof Z_INDEX)[keyof typeof Z_INDEX];
