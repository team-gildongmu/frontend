import React, { useState } from "react";

import { CenterColumn, Row } from "@/styles/BaseComponents";
import { Font } from "@/styles/Typography";
import colors from "@/styles/Colors";

export default function Category() {
  const categories = [
    {
      id: 1,
      name: "# 힐링",
    },
    {
      id: 2,
      name: "# 도심속",
    },
    {
      id: 3,
      name: "# 혼자만의 시간",
    },
    {
      id: 4,
      name: "# 드라이브",
    },
    {
      id: 5,
      name: "# 캠핑",
    },
    {
      id: 6,
      name: "# 가짜데이터1",
    },
    {
      id: 7,
      name: "# 가짜데이터2",
    },
    {
      id: 8,
      name: "# 가짜데이터3",
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
        <CenterColumn width="fit-content" height="36px" key={category.id}>
          <Font
            typo="c02_m"
            color="gray_300"
            onClick={() => setSelectedCategory(category)}
            $active={selectedCategory.id === category.id}
          >
            {category.name}
          </Font>
        </CenterColumn>
      ))}
    </Row>
  );
}
