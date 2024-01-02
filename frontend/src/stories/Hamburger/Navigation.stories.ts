import type { Meta, StoryObj } from "@storybook/react";
import { Navigation } from "./Navigation";

const meta = {
  title: "Example/Hamburger/MenuItem",
  component: Navigation,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
} satisfies Meta<typeof Navigation>;

export default meta;
type Story = StoryObj<typeof meta>;

