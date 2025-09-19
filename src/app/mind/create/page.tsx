import MindCreateScreen from "@/screen/mind/MindCreateScreen";

interface Props {
  searchParams: { travel_log_id?: string };
}

export default function MindCreate({ searchParams }: Props) {
  const travelLogId = searchParams.travel_log_id
    ? Number(searchParams.travel_log_id)
    : undefined;

  if (!travelLogId) {
    return <div>잘못된 접근입니다.</div>;
  }

  return <MindCreateScreen params={travelLogId} />;
}