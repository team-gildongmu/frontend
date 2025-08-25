// 카카오 로그인 응답 타입
export type KakaoLoginResponse = {
  accessToken: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
};
