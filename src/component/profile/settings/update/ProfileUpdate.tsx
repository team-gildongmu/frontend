"use client"

import { useRef } from "react";
import * as P from "./ProfileUpdate.styles"
import ProfileImage from "../../user-profile/ProfileImage";

type Props = {
  avatarPreview?: string | null;
  onImageSelected: (file: File | null) => void;
  comment: string;
  onCommentChange: (text: string) => void;
}

export default function ProfileUpdate({
  avatarPreview,
  onImageSelected,
  comment,
  onCommentChange,
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
          {avatarPreview ? (
            <P.AvatarImg src={avatarPreview} alt="avatar preview" />
          ) : (
            <ProfileImage userInfo={2} image=""/>
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
        <P.SmallLabel>여행 길잡이 멘트 (한 줄)</P.SmallLabel>
        <P.CommentInput
          type="text"
        //   플레이스 홀더 부분 기존 사용자 멘트 가져오기 (있으면)
          placeholder="한 줄 멘트를 입력하세요 (예: 천천히 걸어야 비로소 보이는 것들이 있다.)"
          maxLength={80}
          value={comment}
          onChange={(e) => onCommentChange(e.target.value)}
        />
      </P.Right>
    </P.Section>
  );
}