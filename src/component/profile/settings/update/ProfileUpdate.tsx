"use client"

import { useRef } from "react";
import * as P from "./ProfileUpdate.styles"
import ProfileImage from "../../user-profile/ProfileImage";

type Props = {
  profilePreview?: File | null;
  onImageSelected: (file: File | null) => void;
  intro: string;
  onIntroChange: (text: string) => void;
}

export default function ProfileUpdate({
  profilePreview,
  onImageSelected,
  intro,
  onIntroChange,
}: Props) {
  const fileRef = useRef<HTMLInputElement | null>(null);

  const handleAvatarClick = () => {
    fileRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    onImageSelected(file);
  };

  return (
    <P.Section>
      <div>
        <P.AvatarButton onClick={handleAvatarClick} aria-label="프로필 사진 업로드">
          {profilePreview ? (
            <P.AvatarImg src={profilePreview} alt="profilePreview" />
          ) : (
            <ProfileImage image=""/>
          )}
          <P.CameraOverlay>사진 변경</P.CameraOverlay>
        </P.AvatarButton>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
      </div>

      <P.Right>
        <P.SmallLabel>여행 길잡이 멘트</P.SmallLabel>
        <P.CommentInput
          type="text"
          placeholder="한 줄 멘트를 입력하세요"
          maxLength={80}
          value={intro}
          onChange={(e) => onIntroChange(e.target.value)}
        />
      </P.Right>
    </P.Section>
  );
}