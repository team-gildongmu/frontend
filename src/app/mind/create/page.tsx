import MindCreateScreen from "@/screen/mind/MindCreateScreen";
import { useRouter } from "next/router";

interface MindCreatePageProps {
  searchParams: { logId: number };
}

export default function MindCreate({ searchParams }: MindCreatePageProps) {
    const logId = searchParams.logId
    return (
        <MindCreateScreen params={logId}/>
    )
}
