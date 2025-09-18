// 유저 프로필 조회
export type MyProfileResponse = {
  nickname: string,
  email: string,
  intro: string,
  profile_photo: string | null,
};


// 유저 프로필 수정
export type MyProfileRequest = {
  email: string,
  nickname: string | null,
  intro: string | null,
  profile_photo: File | null,
};

export type PatchProfileRequest = {
  nickname?: string;
  intro?: string;
  profile_photo?: File;
}