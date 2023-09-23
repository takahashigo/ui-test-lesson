import Button from "./Button";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Button",
  component: Button,
  argTypes: {
    label: {
      options: ["Primaryボタン", "Noramlボタン"],
      control: { type: "select" },
    },
  },
} as Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    label: "Primaryボタン",
    primary: true,
    onClick: () => alert("Primaryボタンがクリックされました"),
  },
};

export const Normal: Story = {
  args: {
    label: "Noramlボタン",
    primary: false,
    onClick: () => alert("Noramlボタンがクリックされました"),
  },
};
