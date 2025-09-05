"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { Column } from "@/styles/BaseComponents";

import BannerSection from "@/component/home/BannerSection";
import Tab from "@/component/home/Tab";
import LogContainer from "@/component/home/content/LogContainer";
import StampContainer from "@/component/home/content/StampContainer";
import ReviewContainer from "@/component/home/content/ReviewContainer";

export default function HomeScreen() {
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab") || "review";

  const [selectedTab, setSelectedTab] = useState(currentTab);

  useEffect(() => {
    setSelectedTab(currentTab);
  }, [currentTab]);

  const renderContent = () => {
    switch (selectedTab) {
      case "review":
        return <ReviewContainer />;
      case "log":
        return <LogContainer />;
      case "stamp":
        return <StampContainer />;
      default:
        return <ReviewContainer />;
    }
  };

  return (
    <Column width="100%">
      <BannerSection />
      <Tab setSelectedTab={setSelectedTab} />
      <Column px="10px" pb="20px" width="100%" pt="8px">
        {renderContent()}
      </Column>
    </Column>
  );
}
