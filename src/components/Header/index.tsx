import { useRouter } from "next/router";
import { useSelector } from "react-redux";

export default function Header() {
  const userState = useSelector((state: any) => state.user);
  const router = useRouter();

  const handleRankClick = () => {
    router.push("/ranking");
  };

  return (
    <header className="w-full p-8 mb-5 flex">
      <h1 className="text-slate-200 text-center font-mono text-xl m-auto">
        MORDLE
      </h1>
      <div className="absolute right-10 flex">
        {/* <p>My Score :{userState.score} </p> */}
        <i
          className="fa-solid fa-ranking-star text-slate-200 pr-4"
          onClick={handleRankClick}
        ></i>
        <i className="fa-regular fa-circle-question text-slate-200"></i>
      </div>
    </header>
  );
}
