import React from "react";
import type { Meta } from "@storybook/nextjs-vite";
import fonts from "@/styles/Fonts";

const meta: Meta = {
  title: "Foundations/Fonts",
};

export default meta;

export const AllTypes = () => {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}>
      {Object.entries(fonts).map(([name]) => (
        <div key={name} style={{ width: "120px", textAlign: "center" }}></div>
      ))}
    </div>
  );
};
