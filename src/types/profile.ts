// 유저 프로필 조회
export type MyProfileResponse = {
  nickname: string,
  email: string,
  intro: string,
  profile_photo_url: string,
};


// 유저 프로필 수정
export type MyProfileRequest = {
  nickname?: string,
  intro?: string,
  profile_photo?: string,
};
