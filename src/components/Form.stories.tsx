import Form from "./Form";
import type { Meta, StoryObj } from "@storybook/react";
import { within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";
import { userEvent } from "@storybook/testing-library";

const meta = {
  title: "Form",
  component: Form,
} as Meta<typeof Form>;

export default meta;

type Story = StoryObj<typeof Form>;

export const Default: Story = {};

export const Testing: Story = {
  // play functionを用いると、インタラクションテスト（コンポーネントやUIを操作するテスト）を行うことができる
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("textbox");
    await expect(input).toHaveTextContent("");
    await userEvent.type(input, "Hello World");
    await expect(canvas.getByDisplayValue("Hello World")).toBeInTheDocument();
  },
};
