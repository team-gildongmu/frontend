import MindDetailScreen from "@/screen/mind/MindDetailScreen";

type PageProps  = Promise<{id: string}>

export default async function MindDetail({ params }: {params:  PageProps}) {
  const {id} = await params;
  return <MindDetailScreen id={Number(id)}/>;
}
