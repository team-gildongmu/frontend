"use client";
import ReviewCalendar from "@/component/profile/ReviewCalendar";
import Description from "@/component/profile/user-profile/Description";
import ProfileHeader from "@/component/profile/user-profile/ProfileHeader";
import Stats from "@/component/profile/user-profile/Stats";
import useGetMyProfile from "@/queries/profile/useGetMyProfile";

export default function ProfileScreen() {
  const { data } = useGetMyProfile();
  if(data == undefined) return;

  return (
    <div>
      <ProfileHeader nickname={data.nickname} />
      <Stats />
      <Description nickname={data.nickname} intro={data.intro}/>
      <ReviewCalendar />
    </div>
  );
}
