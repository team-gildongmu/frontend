import Icon from "@/component/common/IconifyIcon";
import { Row } from "@/styles/BaseComponents";
import { Font } from "@/styles/Typography";
import colors from "@/styles/Colors";
import React from "react";
import { useRouter } from "next/navigation";

interface TopInfoProps {
  title: string;
  detailId: string;
}

export default function TopInfo({ title, detailId }: TopInfoProps) {
  const router = useRouter();
  const onClickDetail = () => {
    router.push(`/myroad/${detailId}`);
  };
  return (
    <Row
      width="100%"
      alignItems="center"
      gridGap="4px"
      justifyContent="space-between"
    >
      <Font
        typo="t01_bold_m"
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
      <Row
        alignItems="center"
        gridGap="4px"
        backgroundColor={colors.gray_100}
        borderRadius="999px"
        padding="4px"
        flexShrink="0"
        onClick={onClickDetail}
        style={{ cursor: "pointer" }}
      >
        <Font typo="c01_m" color="blue_500">
          상세코스
        </Font>
        <Icon
          icon="line-md:logout"
          width={10}
          height={10}
          color={colors.blue_500}
        />
      </Row>
    </Row>
  );
}
