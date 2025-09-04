import { Row } from "@/styles/BaseComponents";
import colors from "@/styles/Colors";
import { Font } from "@/styles/Typography";
import React from "react";
import { styled } from "styled-components";
import { useRouter, useSearchParams } from "next/navigation";

interface TabProps {
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
}

export default function Tab({ selectedTab, setSelectedTab }: TabProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const tabs = [
    { label: "후기", value: "review" },
    { label: "확정로그", value: "log" },
    { label: "스탬프", value: "stamp" },
  ];

  const onClickTab = (label: string, value: string) => {
    setSelectedTab(label);

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
      zIndex="10"
      backgroundColor="white"
    >
      {tabs.map((tab) => (
        <TabItem
          key={tab.value}
          typo="c01_m"
          color="gray_300"
          onClick={() => onClickTab(tab.label, tab.value)}
          $active={selectedTab === tab.label}
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
