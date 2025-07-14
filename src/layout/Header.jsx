import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Header() {
  const email = useSelector((state) => {
    return state.loginSlice.email;
  });
  const nickname = useSelector((state) => {
    return state.loginSlice.nickname;
  });
  return (
    <div className="flex justify-between w-full items-center mx-auto bg-white px-3">
      <div className="container flex justify-between w-[1020px] py-2 items-center mx-auto">
        <h1>
          <Link to="/">
            <img
              src="./images/main_icon.png"
              alt=""
              className="w-full max-w-[90%] h-auto md:max-w-[600px] sm:max-w-[90%] h-auto object-contain"
            />
          </Link>
        </h1>
        <ul className="flex gap-3 items-center text-sm">
          <li>
            <Link
              to="/mypage"
              className="font-semibold text-purple-500 hover:underline"
            >
              {nickname}
            </Link>
            님, 반갑습니다!
          </li>

          {email ? (
            <li>
              <p className="text-sm text-gray-400 hover:underline">로그아웃</p>
            </li>
          ) : (
            <li>
              <Link to={"../member/login"}>
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
