"use client"

import SettingHeader from "@/component/profile/settings/list/SettingHeader"
import { AccountActions } from "@/component/profile/settings/update/AccountActions";
import ProfileUpdate from "@/component/profile/settings/update/ProfileUpdate"
import { SubmitButton } from "@/component/profile/settings/update/SubmitButton";
import UserInfoForm from "@/component/profile/settings/update/UserInfoForm";
import { useEffect, useState } from "react";
import { styled } from "styled-components";

const PageWrap = styled.main`
  min-height: 80vh;
  display: flex;
  flex-direction: column;
`;


export default function ProfileUpdateScreen(){
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const [comment, setComment] = useState<string>("천천히 걸어야 비로소 보이는 것들이 있다.");
  const [nickname, setNickname] = useState<string>("길동무 친구들");
  const [userId, setUserId] = useState<string>("abc@kakaoemail.com"); // 예: 아이디(이메일)

  useEffect(() => {
    if (!avatarFile) {
      setAvatarPreview(null);
      return;
    }
    const url = URL.createObjectURL(avatarFile);
    setAvatarPreview(url);
    return () => {
      URL.revokeObjectURL(url);
    };
  }, [avatarFile]);

  // 변경사항 체크(간단)
  const hasChange =
    !!avatarFile || comment !== "천천히 걸어야 비로소 보이는 것들이 있다." || nickname !== "길동무 친구들";

  const handleSubmit = () => {
    // TODO: 실제 API 호출 (FormData로 avatarFile과 텍스트 필드 전송)
    const payload = {
      nickname,
      userId,
      comment,
      // avatarFile: avatarFile (파일은 FormData로)
    };
    console.log("submit payload", payload, avatarFile);
    alert("변경 요청이 콘솔에 출력됩니다. (실제 API 연결 필요)");
  };

  const handleWithdraw = () => {
    if (confirm("정말로 회원탈퇴 하시겠습니까?")) {
      // TODO: 회원탈퇴 API 호출
      alert("회원탈퇴 처리 (샘플)");
    }
  };

    return (
       <PageWrap>
        <SettingHeader />
        <ProfileUpdate 
            avatarPreview={avatarPreview}
            onImageSelected={(file) => setAvatarFile(file)}
            comment={comment}
            onCommentChange={setComment}/>
        <UserInfoForm 
            nickname={nickname}
            userId={userId}
            onChange={(field, value) => {
            if (field === "nickname") setNickname(value);
            if (field === "userId") setUserId(value);
            }}/>
        <AccountActions onWithdraw={handleWithdraw} />
        <SubmitButton disabled={!hasChange} onClick={handleSubmit} />
       </PageWrap>
    )
}