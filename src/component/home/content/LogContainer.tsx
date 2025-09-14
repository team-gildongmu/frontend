import Empty from "@/component/common/Empty";
import LoadingSpinner from "@/component/common/LoadingSpinner";
import ListItem from "@/component/myroad/list/ListItem";
import useGetLogListQuery from "@/queries/travel/useGetLogList";
import { Grid } from "@/styles/BaseComponents";
import React from "react";
import { useTranslation } from "react-i18next";

export default function LogContainer() {
  const { t } = useTranslation();
  const { data: logList, isLoading } = useGetLogListQuery();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (logList?.length === 0) {
    return <Empty text={t("log.noLogs")} />;
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
