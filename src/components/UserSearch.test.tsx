import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UserSearch } from "./UserSearch";
import axios from "axios";

const user = userEvent.setup();

// axiosのモックを作成
jest.mock("axios");
const mockedAxios = jest.mocked(axios);

describe("UserSearch", () => {
  beforeEach(() => {
    // axiosのモックをリセット
    mockedAxios.get.mockReset();
  });

  it("入力フィールドに値を入力し、検索ボタンをクリックすると適切なAPIリクエストが発生する", async () => {
    // mockデータの準備
    const userData = { id: 1, name: "test" };
    mockedAxios.get.mockResolvedValue({ data: userData });

    render(<UserSearch />);
    const inputElement = screen.getByRole("textbox");
    await user.type(inputElement, userData.name);
    const buttonElement = screen.getByRole("button");
    await user.click(buttonElement);

    // axiosのモックが呼ばれたか確認
    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    expect(mockedAxios.get).toHaveBeenCalledWith("/api/users?query=test");
  });

  it("APIから取得したユーザー情報が正しく画面に表示される", async () => {
    // mockデータの準備
    const userData = { id: 1, name: "test" };
    mockedAxios.get.mockResolvedValue({ data: userData });

    render(<UserSearch />);
    const inputElement = screen.getByRole("textbox");
    await user.type(inputElement, userData.name);
    const buttonElement = screen.getByRole("button");
    await user.click(buttonElement);

    // ユーザー名が表示されているか確認(APIのリクエストは時間がかかるので、waitForを使ってアサーションをリトライする)
    await waitFor(async () => {
      const userNameElement = screen.getByText(userData.name);
      expect(userNameElement).toBeInTheDocument();
    });
  });
});

// TODO UIコンポーネントのテストの順序
// 1. テストの準備（モックの準備など）
// 2. テスト対象のコンポーネントをレンダリングする
// 3. DOM要素の取得
// 4. ユーザーの操作
// 5. アサーション
