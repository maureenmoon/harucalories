import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../slices/loginSlice";

export default function useInitAuth() {
  const dispatch = useDispatch();

  useEffect(() => {
    const storedUser = localStorage.getItem("loginUser");
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      dispatch(login(parsed));
    }
  }, []);
}
