"use client";
import ReviewCalendar from "@/component/profile/ReviewCalendar";
import Description from "@/component/profile/user-profile/Description";
import ProfileHeader from "@/component/profile/user-profile/ProfileHeader";
import Stats from "@/component/profile/user-profile/Stats";

interface Props {
  id: number;
}

export default function ProfileScreen({ id }: Props) {
  const userInfo = 2;
  console.log("id 확인", id);

  return (
    <div>
      <ProfileHeader userInfo={userInfo} />
      <Stats />
      <Description />
      <ReviewCalendar />
    </div>
  );
}
