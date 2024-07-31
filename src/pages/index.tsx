import Header from "../components/Header";
import Board from "../components/Board";
import SetName from "../components/SetName";
import Result from "../components/Result";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/reducers/userReducer";
import { GameState } from "../redux/reducers/boardReducer";
import { useEffect, useState } from "react";
import { RootState, AppDispatch } from "../redux/store";
import { getUsers, updateUser } from "../utils/api.service";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user);
  const boardState = useSelector((state: RootState) => state.board);
  const [isUserExist, setIsUserExist] = useState<boolean | null>(null);

  useEffect(() => {
    const userName = localStorage.getItem("userName");
    if (userName) {
      getUsers({ name: userName }).then((res) => {
        const user = res.data[0];
        dispatch(setUser(user));
        setIsUserExist(true);
      });
    }
  }, [dispatch]);

  useEffect(() => {
    if (boardState.status === GameState.Win) {
      const newUser = { ...user, score: user.score + 1 };
      updateUser(newUser);
    }
  }, [boardState.status, user]);

  if (isUserExist === null) {
    return null;
  }

  return (
    <div className="flex flex-col gap-2">
      {!isUserExist && <SetName />}
      {boardState.status !== GameState.Playing && <Result />}
      <Header />
      <Board />
    </div>
  );
}
