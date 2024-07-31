export function update(word: string) {
  return {
    type: "UPDATE",
    payload: { word },
  };
}
export function deleteWord() {
  return {
    type: "DELETE",
  };
}

export function check() {
  return {
    type: "CHECK_ANSWER",
  };
}
