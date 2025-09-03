import MindDetail from "@/component/mind/detail/MindDetail";

interface Props {
  id: number;
}

export default function MindDetailScreen({id}: Props) {
  return(
    <>
        <MindDetail id={id}/>
    </>
    )
}
