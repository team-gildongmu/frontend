import React, { useState } from "react";

import { CenterColumn, Row } from "@/styles/BaseComponents";
import { Font } from "@/styles/Typography";
import colors from "@/styles/Colors";
import Icon from "@/component/common/IconifyIcon";

export default function Category() {
  const [selectedCategory, setSelectedCategory] = useState({ id: 1 });

  const getCategories = () => [
    {
      id: 1,
      name: "#힐링",
      icon: "tdesign:feel-at-ease-filled",
    },
    {
      id: 2,
      name: "#도심속",
      icon: "mdi:city",
    },
    {
      id: 3,
      name: "#혼자만의 시간",
      icon: "streamline-ultimate:single-woman-home-bold",
    },
    {
      id: 4,
      name: "#드라이브",
      icon: "material-symbols:unpaved-road",
    },
    {
      id: 5,
      name: "#캠핑",
      icon: "ph:tent-fill",
    },
    {
      id: 6,
      name: "#가짜데이터1",
      icon: "ph:tent-fill",
    },
    {
      id: 7,
      name: "#가짜데이터2",
      icon: "ph:tent-fill",
    },
    {
      id: 8,
      name: "#가짜데이터3",
      icon: "ph:tent-fill",
    },
    {
      id: 9,
      name: "#가짜데이터4",
      icon: "ph:tent-fill",
    },
  ];

  const categories = getCategories();

  return (
    <Row
      height="47px"
      width="100%"
      borderY={`1px solid ${colors.gray_300}`}
      px="15px"
      gridGap="6px"
      overflow="auto"
      position="sticky"
      top="0"
      zIndex="10"
      backgroundColor="white"
    >
      {categories.map((category) => (
        <CenterColumn
          width="fit-content"
          height="auto"
          minWidth="fit-content"
          flexShrink={0}
          key={category.id}
          onClick={() => setSelectedCategory(category)}
          style={{ cursor: "pointer" }}
        >
          <Icon
            icon={category.icon}
            width={20}
            height={20}
            color={
              selectedCategory.id === category.id
                ? colors.blue_500
                : colors.gray_300
            }
            mb="4px"
          />

          <Font
            typo="c01_m"
            color="gray_300"
            $active={selectedCategory.id === category.id}
          >
            {category.name}
          </Font>
        </CenterColumn>
      ))}
    </Row>
  );
}
