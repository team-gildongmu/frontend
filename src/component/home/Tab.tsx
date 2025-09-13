import { Row } from "@/styles/BaseComponents";
import colors from "@/styles/Colors";
import { Font } from "@/styles/Typography";
import React from "react";
import { styled } from "styled-components";
import { useRouter, useSearchParams } from "next/navigation";
import { Z_INDEX } from "@/styles/ZIndex";
import { useTranslation } from "react-i18next";

interface TabProps {
  setSelectedTab: (tab: string) => void;
}

export default function Tab({ setSelectedTab }: TabProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t } = useTranslation();

  const currentTab = searchParams.get("tab") || "review";

  const tabs = [
    { label: t("tabs.review"), value: "review" },
    { label: t("tabs.log"), value: "log" },
    { label: t("tabs.stamp"), value: "stamp" },
  ];

  const onClickTab = (value: string) => {
    setSelectedTab(value);

    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", value);
    router.replace(`?${params.toString()}`);
  };
  return (
    <Row
      width="100%"
      pt="25px"
      px="20px"
      gridGap="4px"
      overflow="auto"
      position="sticky"
      top="0"
      zIndex={Z_INDEX.TAB}
      backgroundColor="white"
    >
      {tabs.map((tab) => (
        <TabItem
          key={tab.value}
          typo="c01_m"
          color="gray_300"
          onClick={() => onClickTab(tab.value)}
          $active={currentTab === tab.value}
        >
          {tab.label}
        </TabItem>
      ))}
    </Row>
  );
}

const TabItem = styled(Font)<{ $active: boolean }>`
  width: fit-content;
  height: 100%;
  padding: 4px;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  transition: all 0.2s ease;

  ${({ $active }) =>
    $active &&
    `
    border-bottom: 2px solid ${colors.blue_500};
    color: ${colors.blue_500};
  `}

  &:hover {
    color: ${colors.blue_500};
  }
`;
