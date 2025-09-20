"use client";

import { useSearchParams } from "next/navigation";
import MindCreateScreen from "@/screen/mind/MindCreateScreen";

export default function MindCreatePage() {
  const searchParams = useSearchParams();
  const travelLogId = searchParams?.get("travel_log_id")
    ? Number(searchParams.get("travel_log_id"))
    : undefined;

  if (!travelLogId) {
    return <div>잘못된 접근입니다.</div>;
  }

  return <MindCreateScreen params={travelLogId} />;
}