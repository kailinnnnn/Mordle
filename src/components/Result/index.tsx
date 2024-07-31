import { useState, useEffect } from "react";
import { User } from "../../utils/types";
import { clearBoard } from "../../redux/reducers/boardReducer";
import { useSelector, useDispatch } from "react-redux";
import { correctAnswer } from "../../utils/answerCompare";
import ReactLoading from "react-loading";

const Result = () => {
  const board = useSelector((state: any) => state.board);
  const dispatch = useDispatch();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`/api/users`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const users = await response.json();
        const sortedUsers = users.sort((a: User, b: User) => b.score - a.score);
        setUsers(sortedUsers);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  const gameStatusBackgroundColor =
    board.status === "Win" ? "bg-emerald-500" : "bg-amber-600";

  const initGameStatus = () => {
    dispatch(clearBoard());
  };

  return (
    <div className="w-full h-full absolute z-50 bg-slate-900/90 flex items-center justify-center">
      {users ? (
        <div
          className={`w-96 rounded-2xl p-6 gap-4 flex flex-col items-center justify-center  bg-slate-200 `}
        >
          <div className="h-8 rounded-md text-emerald-500 text-center text-sm px-2 font-bold leading-8 ">
            {board.status === "Win"
              ? "You Win!"
              : "You Lose! The answer is " + correctAnswer}
          </div>
          <div className="bg-slate-200/40 w-full px-4 pb-4">
            <div className="grid grid-cols-3 gap-4 font-bold  text-center ">
              <h1>Rank</h1>
              <h1>Name</h1>
              <h1>Score</h1>
            </div>
            {users.map((user, index) => (
              <div
                key={user._id}
                className="grid grid-cols-3 gap-4  text-center "
              >
                <h1>{index + 1}</h1>
                <h1>{user.name}</h1>
                <h1>{user.score}</h1>
              </div>
            ))}
          </div>

          <button
            className="bg-amber-500 text-slate-200 py-1 px-2 rounded-md"
            onClick={initGameStatus}
          >
            AGAIN
          </button>
        </div>
      ) : (
        <ReactLoading type="spin" color="#9d6cff" height={"5%"} width={"5%"} />
      )}
    </div>
  );
};

export default Result;
