import { Row } from "@/styles/BaseComponents";
import { Div } from "@/styles/BaseStyledTags";
import colors from "@/styles/Colors";
import { Font } from "@/styles/Typography";
import React from "react";

export default function TagWrapper({ tags }: { tags: string[] }) {
  return (
    <Row width="100%" flexWrap="wrap" gridGap="5px">
      {tags.map((tag, index) => (
        <Div
          key={index}
          backgroundColor={colors.yellow_300}
          borderRadius="10px"
          padding="4px"
          flexShrink="0"
        >
          <Font typo="c02_m" color="blue_500">
            {tag}
          </Font>
        </Div>
      ))}
    </Row>
  );
}
