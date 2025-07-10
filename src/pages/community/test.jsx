import React from "react";
import { Link } from "react-router-dom";

//헤더
function BasicMenu({ children }) {
  return (
    <>
      <nav className="flex justify-between w-full items-center mx-auto bg-purple-500">
        <div className="container flex justify-between w-[1020px] items-center mx-auto py-4">
          <ul className="flex gap-11 text-white px-3">
            <li>
              <Link
                to={"/"}
                className={`${
                  location.pathname.startsWith("/intro") ? "underline" : ""
                }`}
              >
                식단분석
              </Link>
            </li>
            <li className="relative group">
              <Link
                to={"/report"}
                className={`${
                  location.pathname.startsWith("/report") ? "underline" : ""
                }`}
              >
                리포트
              </Link>
              <div className="absolute hidden group-hover:block bg-white shadow-md p-2 rounded w-[120px]">
                <span className="flex flex-col text-black items-center gap-3">
                  <Link to="/search/place">하루습관</Link>
                  <Link to="/search/food">영양습관</Link>
                </span>
              </div>
            </li>
            <li className="relative group">
              <Link
                to={"/community"}
                className={`${
                  location.pathname.startsWith("/course") ? "text-blue-700" : ""
                }`}
              >
                커뮤니티
              </Link>
              <div className="absolute hidden group-hover:block bg-white shadow-md p-2 rounded w-[120px]">
                <span className="flex flex-col text-black items-center gap-3">
                  <Link to="/course/list">핫이슈</Link>
                  <Link to="/course/builder">자유게시판</Link>
                </span>
              </div>
              <main>{children}</main>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default BasicMenu;
