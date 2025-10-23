"use client"
import MindUpdateDetail from "@/component/mind/detail/MindUpdateDetail";

interface Props {
  id: number;
}

export default function MindUpdateScreen({id}: Props) {
  return <MindUpdateDetail review_id={id}/>
}
