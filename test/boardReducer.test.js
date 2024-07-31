import boardReducer, { initialState } from "../src/redux/reducers/boardReducer";

jest.mock("../../utils/answerCompare");
jest.mock("../../utils/wordBank", () => ({
  wordBank: ["apple", "bagle", "barry"],
}));

describe("boardReducer", () => {
  it("handles UPDATE action", () => {
    const action = { type: "UPDATE", payload: { word: "A" } };
    const expectedState = { ...initialState, words: ["A", "", "", "", ""] };
    expect(boardReducer(initialState, action)).toEqual(expectedState);
  });

  it("handle DELETE action", () => {
    const updateAction = { type: "UPDATE", payload: { word: "A" } };
    const updatedState = boardReducer(initialState, updateAction);
    const deleteAction = { type: "DELETE", payload: { index: 0 } };
    const expectedStateAfterDelete = {
      ...initialState,
      words: ["", "", "", "", ""],
    };
    expect(boardReducer(updatedState, deleteAction)).toEqual(
      expectedStateAfterDelete
    );
  });
});
