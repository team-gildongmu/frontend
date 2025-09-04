import React, { useState } from "react";

import { Column } from "@/styles/BaseComponents";
import BannerSection from "@/component/home/BannerSection";
import Tab from "@/component/home/Tab";

export default function HomeScreen() {
  const [selectedTab, setSelectedTab] = useState("후기");
  return (
    <Column width="100%" height="100%">
      <BannerSection />
      <Tab selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
    </Column>
  );
}
