import MindUpdateScreen from "@/screen/mind/MindUpdateScreen";

type PageProps  = Promise<{id: string}>

export default async function MindUpdate( { params }: {params:  PageProps}) {
  const {id} = await params;
  return <MindUpdateScreen id={Number(id)}/>;
}
