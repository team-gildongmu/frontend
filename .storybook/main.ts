import type { StorybookConfig } from "@storybook/nextjs";

const config: StorybookConfig = {
  stories: [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    "@chromatic-com/storybook",
    "@storybook/addon-docs",
    "@storybook/addon-onboarding",
    "@storybook/addon-a11y",
  ],
  framework: {
    name: "@storybook/nextjs", // Webpack 기반 Next.js Storybook 설정
    options: {},
  },
  staticDirs: [
    "../public",
  ],
};

export default config;
