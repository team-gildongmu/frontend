"use client";

import React from "react";

import { Column } from "@/styles/BaseComponents";

import Category from "@/component/myroad/list/Category";
import ListItemContainer from "@/component/myroad/list/ListItemContainer";

export default function MyRoadScreen() {
  return (
    <Column width="100%" height="100%">
      <Category />
      <ListItemContainer />
    </Column>
  );
}
