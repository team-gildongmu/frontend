"use client";

import { patchProfile } from "@/api/profile";
import SettingHeader from "@/component/profile/settings/list/SettingHeader";
import { AccountActions } from "@/component/profile/settings/update/AccountActions";
import ProfileUpdate from "@/component/profile/settings/update/ProfileUpdate";
import { SubmitButton } from "@/component/profile/settings/update/SubmitButton";
import UserInfoForm from "@/component/profile/settings/update/UserInfoForm";
import useDeleteProfileMutation from "@/queries/profile/useDeleteProfileMutation";
import useGetMyProfile from "@/queries/profile/useGetMyProfile";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { styled } from "styled-components";

const PageWrap = styled.main`
  min-height: 80vh;
  display: flex;
  flex-direction: column;
`;

export default function ProfileUpdateScreen() {
  const { data } = useGetMyProfile();
  const router = useRouter();

  const [photoUrl, setPhotoUrl] = useState<File | null>(null);
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
  
  const { mutate: deleteProfile } = useDeleteProfileMutation();
  

  if(data == undefined) return ;

  const hasChange =
    !!photoUrl ||
    intro !== (data?.intro ?? null) ||
    nickname !== (data?.nickname ?? null)


  const handleSubmit = () => {
    if (!data) return;

    const formData = new FormData();
    if (nickname) formData.append("nickname", nickname);
    if (intro) formData.append("intro", intro);
    if (photoUrl instanceof File) formData.append("profile_photo", photoUrl);

    patchProfile(formData);
    router.push("/profile")
    
  };

  const handleWithdraw = () => {
    if (window.confirm("정말로 회원탈퇴 하시겠습니까?")) {
      deleteProfile();
    } else {
      router.push('/');
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