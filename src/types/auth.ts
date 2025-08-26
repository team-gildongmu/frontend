// 카카오 로그인 응답 타입
export type KakaoLoginResponse = {
  access_token: string;
  is_new_user: boolean;
  refresh_token: string;
  user_id: number;
  user_name: string;
};
