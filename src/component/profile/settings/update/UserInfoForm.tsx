"use client"
import * as P from "./UserInfoForm.styles"

type Props = {
  nickname: string;
  userId: string;
  onChange: (field: "nickname" | "userId", value: string) => void;
}

export default function UserInfoForm({ nickname, userId, onChange }: Props) {
  return (
    <P.Form onSubmit={(e) => e.preventDefault()}>
      <div>
        <P.Label>닉네임</P.Label>
        <P.Input
          type="text"
          value={nickname}
          onChange={(e) => onChange("nickname", e.target.value)}
          placeholder="닉네임을 입력하세요"
        />
      </div>

      <div>
        <P.Label>아이디</P.Label>
        <P.Input
          type="text"
          value={userId}
          readOnly
          onChange={(e) => onChange("userId", e.target.value)}
        />
      </div>
    </P.Form>
  );
}