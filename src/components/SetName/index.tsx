import { useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/reducers/userReducer";
import { createUser } from "../../utils/api.service";

const SetName = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const disableKeydownListener = (e: KeyboardEvent) => {
      e.stopPropagation();
    };

    const inputElement = inputRef.current;

    if (inputElement) {
      inputElement.addEventListener("keydown", disableKeydownListener);
      inputElement.addEventListener("blur", () => {
        inputElement.removeEventListener("keydown", disableKeydownListener);
      });
    }

    return () => {
      if (inputElement) {
        inputElement.removeEventListener("keydown", disableKeydownListener);
      }
    };
  }, []);

  const handleCreateUser = async () => {
    if (inputRef.current) {
      const userName = inputRef.current.value;
      createUser(userName).then((res) => {
        dispatch(setUser(res.data));
        localStorage.setItem("userName", res.data.name);
      });
    }
  };

  return (
    <div className="w-full h-full absolute z-50 bg-slate-900/90 flex items-center justify-center">
      <div className="w-96 rounded-2xl p-8 gap-4 bg-slate-200 flex flex-col items-center justify-center">
        SET YOUR NAME{" "}
        <input type="text" ref={inputRef} className="rounded-md" />
        <button
          className="bg-slate-400 text-slate-50 px-3 py-2 rounded-md mt-3"
          onClick={handleCreateUser}
        >
          START
        </button>
      </div>
    </div>
  );
};

export default SetName;
