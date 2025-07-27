import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../slices/loginSlice";
import axios from "../../api/authIssueUserApi/axiosInstance";

const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const doLogout = () => {
    console.log("�� Logging out...");

    // Clear all tokens and data
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    localStorage.removeItem("loginUser"); // Remove legacy data too

    // Clear axios headers
    delete axios.defaults.headers.common["Authorization"];

    // Update Redux (this will also clear localStorage)
    dispatch(logout());

    navigate("/member/login");
  };

  return doLogout;
};

export default useLogout;
