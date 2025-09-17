import type { Meta, StoryObj } from "@storybook/nextjs";
import { Header } from "./Header";

const meta = {
  title: "Component/Header",
  component: Header,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    // Mock API calls
    mockData: [
      {
        url: "/api/*",
        method: "GET",
        status: 200,
        response: {},
      },
    ],
  },
  args: {},
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithMockUser: Story = {
  args: {},
  parameters: {
    // Mock authenticated state
    cookies: {
      "_gildongmu_auth_token": "mock-token",
    },
  },
};
