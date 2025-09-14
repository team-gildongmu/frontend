import React from "react";
import ReviewItem from "./reviewItem/ReviewItem";
import { Grid } from "@/styles/BaseComponents";
import useGetReviewListQuery from "@/queries/travel/useGetReviewList";
import LoadingSpinner from "@/component/common/LoadingSpinner";
import Empty from "@/component/common/Empty";
import { TravelReviewItem } from "@/types/travel";

export default function ReviewContainer() {
  const { data: reviewItemData, isLoading } = useGetReviewListQuery();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (reviewItemData?.length === 0) {
    return <Empty text="리뷰가 없습니다." />;
  }

  return (
    <Grid width="100%" height="100%" gridTemplateColumns="repeat(2, 1fr)">
      {reviewItemData?.map((item: TravelReviewItem, index: number) => (
        <ReviewItem
          key={`review-${item.travel_review_id}-${index}`}
          reviewItemData={item}
        />
      ))}
    </Grid>
  );
}
