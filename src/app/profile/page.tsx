import ProfileScreen from "@/screen/profile/ProfileScreen";

type PageProps  = Promise<{id: string}>

export default async function Profile({ params }: {params:  PageProps}) {
  const {id} = await params;
  return <ProfileScreen id={Number(id)}/>;
}