import { Font } from "@/styles/Typography";
import React from "react";

export default function Description({ description }: { description: string }) {
  return (
    <Font
      typo="c02_s"
      color="black"
      overflow="hidden"
      m="5px 0"
      display="-webkit-box"
      style={{
        WebkitLineClamp: 2,
        WebkitBoxOrient: "vertical",
        wordBreak: "break-word",
        whiteSpace: "normal",
        textOverflow: "ellipsis",
      }}
    >
      {description}
    </Font>
  );
}
