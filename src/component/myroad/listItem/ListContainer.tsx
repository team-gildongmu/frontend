import { Column } from "@/styles/BaseComponents";
import React from "react";
import TagWrapper from "@/component/myroad/list/TagWrapper";
import { Font } from "@/styles/Typography";
import useGetLogDetailQuery from "@/queries/travel/useGetLogDetail";
import LoadingSpinner from "@/component/common/LoadingSpinner";
import Empty from "@/component/common/Empty";
import styled from "styled-components";
import colors from "@/styles/Colors";
import DayRouteTimeline from "@/component/myroad/listItem/DayRouteTimeline";
import { useTranslation } from "react-i18next";

export default function ListContainer({ myroadid }: { myroadid: number }) {
  const { t } = useTranslation();
  const { data: listItemData, isLoading } = useGetLogDetailQuery(myroadid);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!listItemData) {
    return <Empty text={t("myroad.loadingData")} />;
  }

  return (
    <Column
      width="100%"
      gridGap="24px"
      minHeight="100dvh"
      backgroundColor="gray_50"
    >
      <HeaderSection>
        <Column width="100%" gridGap="12px">
          <Font typo="t01_bold_m" color="black" textAlign="left" width="100%">
            {listItemData.title}
          </Font>
          <TagWrapper tags={listItemData.keywords} />
        </Column>
      </HeaderSection>

      <ContentSection>
        <SectionTitle>
          <Font typo="t01_m" color="black" textAlign="left" width="100%">
            {t("myroad.recommendedRoute")}
          </Font>
        </SectionTitle>

        {Object.entries(listItemData.locations || {}).map(
          ([day, locations]) => (
            <DaySection key={day}>
              <DayHeader>
                <Font typo="l01_bold_m" color="black" textAlign="left">
                  {day}
                  {t("myroad.daySuffix")}
                </Font>
              </DayHeader>

              <DayRouteTimeline locations={locations} />
            </DaySection>
          )
        )}
      </ContentSection>

      <SummarySection>
        <SummaryHeader>
          <Font typo="t01_m" color="black" textAlign="left" width="100%">
            {t("myroad.summary")}
          </Font>
        </SummaryHeader>
        <SummaryContent>
          <Font typo="c04_m" color="black" textAlign="left">
            {listItemData.summary}
          </Font>
        </SummaryContent>
      </SummarySection>
    </Column>
  );
}

const HeaderSection = styled(Column)`
  gap: 16px;
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
`;

const ContentSection = styled(Column)`
  gap: 20px;
`;

const SectionTitle = styled(Column)`
  background: white;
  padding: 16px 20px;
  border-radius: 8px;
  border-left: 4px solid ${colors.blue_500};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const DaySection = styled(Column)`
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
`;

const DayHeader = styled(Column)`
  margin-bottom: 16px;
  padding-bottom: 8px;
  border-bottom: 1px solid ${colors.gray_200};
`;

const SummarySection = styled(Column)`
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
`;

const SummaryHeader = styled(Column)`
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid ${colors.gray_200};
`;

const SummaryContent = styled(Column)`
  background: ${colors.gray_50};
  padding: 16px;
  border-radius: 8px;
  line-height: 1.6;
`;
