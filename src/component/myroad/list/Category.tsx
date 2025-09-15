import React from "react";
import { useTranslation } from "react-i18next";

import { CenterColumn, Row } from "@/styles/BaseComponents";
import { Font } from "@/styles/Typography";
import colors from "@/styles/Colors";
import Icon from "@/component/common/IconifyIcon";
import { Z_INDEX } from "@/styles/ZIndex";
import { getCategories } from "@/hooks/useMyRoadCategory";

export default function Category({
  selectedCategory,
  setSelectedCategory,
}: {
  selectedCategory: { name: string };
  setSelectedCategory: (category: { name: string }) => void;
}) {
  const { t } = useTranslation();
  const categories = getCategories();

  return (
    <Row
      height="47px"
      width="100%"
      borderY={`1px solid ${colors.gray_300}`}
      px="15px"
      gridGap="10px"
      overflow="auto"
      position="sticky"
      top="0"
      zIndex={Z_INDEX.TAB}
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
              selectedCategory.name === category.name
                ? colors.blue_500
                : colors.gray_300
            }
            mb="4px"
          />

            <Font
              typo="c01_m"
              color="gray_300"
              $active={selectedCategory.name === category.name}
            >
              #{t(`myroad.categories.${category.displayName}`)}
            </Font>
        </CenterColumn>
      ))}
    </Row>
  );
}
