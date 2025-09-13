import Empty from "@/component/common/Empty";
import ListItem from "@/component/myroad/list/ListItem";
import useGetLogListQuery from "@/queries/travel/useGetLogList";
import { Grid } from "@/styles/BaseComponents";
import React from "react";

export default function LogContainer() {
  const { data: logList, isLoading } = useGetLogListQuery();

  if (logList?.length === 0 || isLoading) {
    return <Empty text="아직 작성된 여행 로그가 없습니다." />;
  }

  return (
    <Grid
      width="100%"
      height="100%"
      gridTemplateColumns="repeat(2, 1fr)"
      gridGap="4px"
    >
      {logList?.map((item, index) => (
        <ListItem
          key={`log-${item.travel_log_id}-${index}`}
          listItemData={item}
          isMain={true}
        />
      ))}
    </Grid>
  );
}
