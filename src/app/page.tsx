import HomeScreen from "@/screen/home/HomeScreen";

type Props = {
  searchParams: Promise<{ tab?: string }>;
};

export default async function Home({ searchParams }: Props) {
  const resolvedSearchParams = await searchParams;

  return <HomeScreen searchParams={resolvedSearchParams} />;
}
