import React from "react";
import type { Meta } from "@storybook/nextjs";
import colors from "@/styles/Colors";

const meta: Meta = {
  title: "Foundations/Colors",
};

export default meta;

export const AllTypes = () => {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}>
      {Object.entries(colors).map(([name, value]) => (
        <div key={name} style={{ width: "120px", textAlign: "center" }}>
          <div
            style={{
              backgroundColor: value,
              width: "100%",
              height: "80px",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          />
          <div style={{ marginTop: "8px", fontSize: "14px" }}>{name}</div>
          <div style={{ color: "#888", fontSize: "12px" }}>{value}</div>
        </div>
      ))}
    </div>
  );
};
