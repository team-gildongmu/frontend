"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Column } from "@/styles/BaseComponents";
import BannerSection from "@/component/home/BannerSection";
import Tab from "@/component/home/Tab";
import LogContainer from "@/component/home/content/LogContainer";
import StampContainer from "@/component/home/content/StampContainer";
import ReviewContainer from "@/component/home/content/ReviewContainer";

type Props = {
  searchParams: { tab?: string };
};

export default function HomeScreen({ searchParams }: Props) {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState("review");

  useEffect(() => {
    const tab = searchParams.tab || "review";
    setSelectedTab(tab);

    if (!searchParams.tab) {
      router.replace("/?tab=review");
    }
  }, [searchParams.tab, router]);

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
