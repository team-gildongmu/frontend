import React from "react";
import type { Meta } from "@storybook/nextjs";
import { fonts } from "@/styles/Fonts";

const meta: Meta = {
  title: "Foundations/Fonts",
};

export default meta;

const { noto_100, noto_300, noto_500, nunito_500 } = fonts;

export const AllTypes = () => {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
      <div style={{ width: "200px", textAlign: "center" }}>
        <p className={noto_100.className}>Noto 100: 가나다라마바사</p>
      </div>
      <div style={{ width: "200px", textAlign: "center" }}>
        <p className={noto_300.className}>Noto 300: 가나다라마바사</p>
      </div>
      <div style={{ width: "200px", textAlign: "center" }}>
        <p className={noto_500.className}>Noto 500: 가나다라마바사</p>
      </div>
      <div style={{ width: "200px", textAlign: "center" }}>
        <p className={nunito_500.className}>Nunito 500: ABCDEFG</p>
      </div>
    </div>
  );
};