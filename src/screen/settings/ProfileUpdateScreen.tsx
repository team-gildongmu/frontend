"use client";

import SettingHeader from "@/component/profile/settings/list/SettingHeader";
import { AccountActions } from "@/component/profile/settings/update/AccountActions";
import ProfileUpdate from "@/component/profile/settings/update/ProfileUpdate";
import { SubmitButton } from "@/component/profile/settings/update/SubmitButton";
import UserInfoForm from "@/component/profile/settings/update/UserInfoForm";
import useDeleteProfileMutation from "@/queries/profile/useDeleteProfileMutation";
import useGetMyProfile from "@/queries/profile/useGetMyProfile";
import usePatchProfileMutation from "@/queries/profile/usePatchProfileMutation";
import { MyProfileRequest } from "@/types/profile";
import { useEffect, useState } from "react";
import { styled } from "styled-components";

const PageWrap = styled.main`
  min-height: 80vh;
  display: flex;
  flex-direction: column;
`;

export default function ProfileUpdateScreen() {
  const { data } = useGetMyProfile();

  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [intro, setIntro] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    if (data) {
      setIntro(data.intro ?? "");
      setNickname(data.nickname ?? "");
      setEmail(data.email ?? "");
    }
  }, [data]);

  console.log("user data", data);

  const { mutate: patchProfile } = usePatchProfileMutation();
  const { mutate: deleteProfile } = useDeleteProfileMutation();

  const hasChange =
    !!photoUrl ||
    intro !== (data?.intro ?? "") ||
    nickname !== (data?.nickname ?? "")

  const handleSubmit = () => {
    const payload: Partial<MyProfileRequest> = {};
     if (nickname !== (data?.nickname ?? "")) payload.nickname = nickname;
    if (photoUrl !== (data?.profile_photo_url ?? "")) payload.profile_photo_url = photoUrl;
    if (intro !== (data?.intro ?? "")) payload.intro = intro;

    patchProfile(payload, {
      onSuccess: () => {
        alert("프로필이 성공적으로 수정되었습니다.");
      },
      onError: (error) => {
        console.error(error);
        alert("프로필 수정 중 오류가 발생했습니다.");
      },
    });
  };

  const handleWithdraw = () => {
    if (window.confirm("정말로 회원탈퇴 하시겠습니까?")) {
      deleteProfile(undefined, {
        onSuccess: () => {
          alert("회원탈퇴가 완료되었습니다.");
        },
        onError: (error) => {
          console.error(error);
          alert("회원탈퇴 중 오류가 발생했습니다.");
        },
      });
    }
  };

  return (
    <PageWrap>
      <SettingHeader />
      <ProfileUpdate
        profilePreview={photoUrl}
        onImageSelected={(file) => setPhotoUrl(file)}
        intro={intro}
        onIntroChange={setIntro}
      />
      <UserInfoForm
        nickname={nickname}
        email={email}
        onChange={(field, value) => {
          if (field === "nickname") setNickname(value);
        }}
      />
      <AccountActions onWithdraw={handleWithdraw} />
      <SubmitButton disabled={!hasChange} onClick={handleSubmit} />
    </PageWrap>
  );
}