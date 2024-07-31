import { User } from "../../utils/types";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { getUsers } from "../../utils/api.service";

interface RankingProps {
  sortedUsers: User[];
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  const users = await getUsers({});
  const sortedUsers = users.data.sort((a: User, b: User) => b.score - a.score);

  return {
    props: {
      sortedUsers,
    },
  };
};

export default function Ranking({ sortedUsers }: RankingProps) {
  const router = useRouter();
  const handleBackToGame = () => {
    router.push("/");
  };

  return (
    <div className="flex flex-col items-center gap-8 w-full">
      <button
        className="bg-amber-500 text-slate-200 py-1 px-2 mt-8 rounded-md mx-auto"
        onClick={handleBackToGame}
      >
        BACK TO GAME
      </button>
      <div className="bg-slate-200/80 rounded-2xl p-6 mx-16 gap-4 w-2/3">
        <div className="grid grid-cols-3 font-bold text-center">
          <h1>Rank</h1>
          <h1>Name</h1>
          <h1>Score</h1>
        </div>
        {sortedUsers.map((user, index) => (
          <div key={user._id} className="grid grid-cols-3 text-center">
            <h1>{index + 1}</h1>
            <h1>{user.name}</h1>
            <h1>{user.score}</h1>
          </div>
        ))}
      </div>
    </div>
  );
}
