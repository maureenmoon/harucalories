import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../slices/loginSlice";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Only use Redux state - no more mixed logic
  const { user, isLoggedIn } = useSelector((state) => state.login);

  const handleLogout = () => {
    // Clear Redux (this will also clear localStorage tokens)
    dispatch(logout());
    // Redirect
    navigate("/");
  };

  return (
    <div className="flex justify-between w-full items-center mx-auto bg-white px-3">
      <div className="container flex justify-between w-[1020px] py-2 items-center mx-auto">
        <h1>
          <Link to="/">
            <img
              src="/images/main_icon.png"
              alt="main icon"
              className="w-full max-w-[90%] h-auto md:max-w-[600px] sm:max-w-[90%] object-contain"
            />
          </Link>
        </h1>

        <ul className="flex gap-3 items-center text-sm">
          {isLoggedIn ? (
            <>
              <li>
                <Link
                  to="/mypage"
                  className="font-semibold text-purple-500 hover:underline"
                >
                  {user?.nickname} 님, 반갑습니다!
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="text-sm text-gray-400 hover:underline"
                >
                  로그아웃
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link to="/member/login">
                <p className="text-sm text-gray-400 hover:underline">로그인</p>
              </Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Header;
