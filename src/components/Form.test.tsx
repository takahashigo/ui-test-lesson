import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Form from "./Form";

// userEventを使うためのセットアップ
const user = userEvent.setup();

describe("Form", () => {
  it("初期状態ではテキストは空欄", () => {
    render(<Form />);

    // const inputElement = screen.getByRole("textbox");
    const inputElement = screen.getByPlaceholderText("Enter text");

    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveValue("");
  });

  it("入力したテキストがサブミットされる", async () => {
    const alertSpy = jest.spyOn(window, "alert").mockReturnValue();

    render(<Form />);

    // const inputElement = screen.getByRole("textbox");
    const inputElement = screen.getByPlaceholderText("Enter text");

    // userEventは非同期処理なので、awaitをつける
    await user.type(inputElement, "Test Text");

    // expect(inputElement).toHaveValue("Test Text");
    // getByDisplayValueは、input要素のvalue属性の値を取得する
    expect(screen.getByDisplayValue("Test Text")).toBeInTheDocument();

    const submitButtonElement = screen.getByRole("button");
    await user.click(submitButtonElement);

    expect(alertSpy).toHaveBeenCalledWith("submitted: Test Text");

    // spyの状態を元に戻す
    alertSpy.mockRestore();
  });
});
