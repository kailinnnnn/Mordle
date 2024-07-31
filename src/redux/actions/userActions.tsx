import { createAsyncThunk } from "@reduxjs/toolkit";

export const updateUserScore = createAsyncThunk(
  "user/updateUserScore",
  async (userId: string, { getState }) => {
    const state: any = getState();
    const newScore = state.user.score + 1;

    const response = await fetch("/api/users", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        score: newScore,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to update user score");
    }

    return newScore;
  }
);
