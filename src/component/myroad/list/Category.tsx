import React, { useState } from "react";

import { CenterColumn, Row } from "@/styles/BaseComponents";
import { Font } from "@/styles/Typography";
import colors from "@/styles/Colors";
import Icon from "@/component/common/IconifyIcon";

export default function Category() {
  const categories = [
    {
      id: 1,
      name: "# 힐링",
      icon: "ph:leaf-fill",
    },
    {
      id: 2,
      name: "# 도심속",
      icon: "ph:buildings-fill",
    },
    {
      id: 3,
      name: "# 혼자만의 시간",
      icon: "ph:person-fill",
    },
    {
      id: 4,
      name: "# 드라이브",
      icon: "ph:car-fill",
    },
    {
      id: 5,
      name: "# 캠핑",
      icon: "ph:tent-fill",
    },
    {
      id: 6,
      name: "# 가짜데이터1",
      icon: "ph:star-fill",
    },
    {
      id: 7,
      name: "# 가짜데이터2",
      icon: "ph:heart-fill",
    },
    {
      id: 8,
      name: "# 가짜데이터3",
      icon: "ph:lightning-fill",
    },
  ];

  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  return (
    <Row
      height="47px"
      width="100%"
      border={`1px solid ${colors.gray_300}`}
      px="30px"
      gridGap="6px"
      overflow="auto"
    >
      {categories.map((category) => (
        <CenterColumn
          width="fit-content"
          height="auto"
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
            typo="c02_m"
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
