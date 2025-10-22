import MindCreateScreen from "@/screen/mind/MindCreateScreen";

type PageProps  = Promise<{id: string}>

export default async function MindCreate({ params }: {params:  PageProps}){
    const {id} = await params;
    return (
        <MindCreateScreen params={Number(id)}/>
    )
}
