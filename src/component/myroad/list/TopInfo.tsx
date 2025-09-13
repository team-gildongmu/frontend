import Icon from "@/component/common/IconifyIcon";
import { Column, Row } from "@/styles/BaseComponents";
import { Font } from "@/styles/Typography";
import colors from "@/styles/Colors";
import React from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

interface TopInfoProps {
  title: string;
  detailId: number;
  subtitle: string;
  isMain?: boolean;
}

export default function TopInfo({ title, detailId, subtitle, isMain }: TopInfoProps) {
  const router = useRouter();
  const { t } = useTranslation();
  const onClickDetail = () => {
    router.push(`/myroad/${detailId}`);
  };
  return (
    <Row
      width="100%"
      alignItems="center"
      gridGap={isMain ? "2px" : "4px"}
      justifyContent="space-between"
    >
      <Column width="100%" flexWrap="wrap" gridGap={isMain ? "3px" : "none"}>
        <Font
          typo={isMain ? "t02_m" : "t01_bold_m"}
          color="black"
          overflow="hidden"
          display="-webkit-box"
          style={{
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            wordBreak: "break-word",
            whiteSpace: "normal",
            textOverflow: "ellipsis",
          }}
        >
          {title}
        </Font>
        {isMain && (
          <Font
            typo="c03_m"
            color="black"
            overflow="hidden"
            display="-webkit-box"
            style={{
              WebkitLineClamp: 1,
              WebkitBoxOrient: "vertical",
              wordBreak: "break-word",
              whiteSpace: "normal",
              textOverflow: "ellipsis",
            }}
          >
            {subtitle}
          </Font>
        )}
      </Column>

      <Row
        alignItems="center"
        gridGap={isMain ? "2px" : "4px"}
        backgroundColor={colors.gray_100}
        borderRadius="999px"
        padding={isMain ? "2px 4px" : "4px"}
        flexShrink="0"
        onClick={onClickDetail}
        style={{ cursor: "pointer" }}
      >
        <Font typo={isMain ? "c03_m" : "c01_m"} color="blue_500">
          {t("myroad.detailCourse")}
        </Font>
        <Icon
          icon="line-md:logout"
          width="10"
          height="10"
          color={colors.blue_500}
        />
      </Row>
    </Row>
  );
}
