import { render } from "@testing-library/react";
import SnapshotComponent from "./SnapshotComponent";

it("Snapshotテスト", () => {
  const { container } = render(<SnapshotComponent text="React" />);
  // 一回目の実行時は、スナップショットが存在しないので、スナップショットが作成されます。snapshotフォルダにスナップショットが作成され、このファイルは次回以降のテスト実行時に比較対象となるので、git管理下に置くことをおすすめします。
  expect(container).toMatchSnapshot();
});

// snapshotテストでスナップショットの更新は、-- -u オプションを付けて実行することで行うことができます。
