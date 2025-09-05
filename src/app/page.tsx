import HomeScreen from "@/screen/home/HomeScreen";

type Props = {
  searchParams: { tab?: string }
}

export default function Home({ searchParams }: Props) {
  return <HomeScreen searchParams={searchParams} />;
}