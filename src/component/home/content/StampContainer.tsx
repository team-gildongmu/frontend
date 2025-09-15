import { Grid } from "@/styles/BaseComponents";
import React from "react";
import { useTranslation } from "react-i18next";
import StampItem from "./stampItem/StampItem";
import useGetMyStampsQuery from "@/queries/stamps/useGetMyStamps";
import Empty from "@/component/common/Empty";
import LoadingSpinner from "@/component/common/LoadingSpinner";

export default function StampContainer() {
  const { t } = useTranslation();
  const { data: myStamps, isLoading } = useGetMyStampsQuery();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (myStamps?.stamps.length === 0) {
    return <Empty text={t("stamp.noStamps")} />;
  }
  return (
    <Grid
      width="100%"
      height="100%"
      gridTemplateColumns="repeat(auto-fill, minmax(100px, 1fr))"
      gridGap="15px"
      p="10px"
    >
      {myStamps?.stamps?.map((item) => (
        <StampItem key={item.id} item={item} />
      ))}
    </Grid>
  );
}
