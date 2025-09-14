"use client";

import React from "react";

import { Column } from "@/styles/BaseComponents";

import ListItem from "@/component/myroad/list/ListItem";
import useGetLogListQuery from "@/queries/travel/useGetLogList";
import Empty from "@/component/common/Empty";
import LoadingSpinner from "@/component/common/LoadingSpinner";
import { useTranslation } from "react-i18next";

export default function ListItemContainer() {
  const { t } = useTranslation();
  const { data: logList, isLoading } = useGetLogListQuery();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (logList?.length === 0) {
    return <Empty text={t("log.noLogs")} />;
  }

  return (
    <Column
      width="100%"
      height="100%"
      gridGap="20px"
      p="15px"
      overflow="auto"
      justifyContent="flex-start"
      alignItems="center"
    >
      {logList?.map((item) => (
        <ListItem key={item.travel_log_id} listItemData={item} />
      ))}
    </Column>
  );
}
