import { renderHook, act } from "@testing-library/react";
import useCounter from "./useCounter";

describe("useCounter", () => {
  it("increment", () => {
    const { result } = renderHook(() => useCounter(1));
    expect(result.current.count).toBe(1);

    // Hookのステート更新は普通に呼び出しても、テスト内では更新されないので、
    // act関数を利用する必要がある。
    act(() => {
      result.current.increment();
    });
    expect(result.current.count).toBe(2);
  });

  it("decrement", () => {
    const { result } = renderHook(() => useCounter(1));
    expect(result.current.count).toBe(1);

    // Hookのステート更新は普通に呼び出しても、テスト内では更新されないので、
    // act関数を利用する必要がある。
    act(() => {
      result.current.decrement();
    });
    expect(result.current.count).toBe(0);
  });
});
