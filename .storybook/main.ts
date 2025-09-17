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
    name: "@storybook/nextjs",
    options: {
      nextConfigPath: "../next.config.js",
    },
  },
  env: (config) => ({
    ...config,
    NEXT_PUBLIC_KAKAO_JS_KEY: "mock-kakao-key",
    NEXT_PUBLIC_BASE_URL: "http://localhost:3000",
    NEXT_PUBLIC_KAKAO_RESTAPI_KEY: "mock-kakao-restapi-key",
    NEXT_PUBLIC_KAKAO_REDIRECT_URL: "http://localhost:3000/oauth/kakao",
  }),
  staticDirs: [
    "../public",
  ],
};

export default config;
