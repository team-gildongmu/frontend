"use client";

import React, { useState } from "react";

import { Column } from "@/styles/BaseComponents";

import Category from "@/component/myroad/list/Category";
import ListItemContainer from "@/component/myroad/list/ListItemContainer";

export default function MyRoadScreen() {
  const [selectedCategory, setSelectedCategory] = useState({ name: "자연" });

  return (
    <Column width="100%" height="100%">
      <Category
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <ListItemContainer selectedCategory={selectedCategory} />
    </Column>
  );
}
