import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AsyncComponent from "./AsyncComponent";

const user = userEvent.setup();

describe("AsyncComponent", () => {
  it("ボタンをクリックすると非同期処理が実行される", async () => {
    render(<AsyncComponent />);
    expect(screen.getByText("Initial text")).toBeInTheDocument();

    const buttonElement = screen.getByRole("button");

    await user.click(buttonElement);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
    // timeout: 3000ms で interval: 50ms の間隔でチェック（コールバック関数が実行される）
    await waitFor(
      () => {
        expect(screen.getByText("Updated text")).toBeInTheDocument();
      },
      { interval: 50, timeout: 3000 }
    );
  });
});
