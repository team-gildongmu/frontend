"use client"
import Description from "@/component/profile/user-profile/Description";
import ProfileHeader from "@/component/profile/user-profile/ProfileHeader";
import Stats from "@/component/profile/user-profile/Stats";

interface Props {
  id: number;
}

export default function ProfileScreen({id}: Props) {
    const userInfo = 2
    console.log("id 확인", id)
  return(
    <div>
        <ProfileHeader userInfo={userInfo} />
        <Stats userInfo={userInfo}/>
        <Description />

        {/* TODO: 여기에 캘린더 부분 넣으면 됩니다! */}
    </div>
    )
}
