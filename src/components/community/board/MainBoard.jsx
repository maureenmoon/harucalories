import React, { useState } from "react";
import { Link } from "react-router-dom";

function MainBoard() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "다이어트 정보 공유",
      writer: "홍길동",
      date: "2025.07.10",
    },
    {
      id: 2,
      title: "다이어트 정보 공유",
      writer: "홍길동",
      date: "2025.07.10",
    },
    {
      id: 3,
      title: "다이어트 정보 공유",
      writer: "홍길동",
      date: "2025.07.10",
    },
    {
      id: 4,
      title: "다이어트 정보 공유",
      writer: "홍길동",
      date: "2025.07.10",
    },
    {
      id: 5,
      title: "다이어트 정보 공유",
      writer: "홍길동",
      date: "2025.07.10",
    },
    {
      id: 6,
      title: "다이어트 정보 공유",
      writer: "홍길동",
      date: "2025.07.10",
    },
    {
      id: 7,
      title: "다이어트 정보 공유",
      writer: "홍길동",
      date: "2025.07.10",
    },
    {
      id: 8,
      title: "다이어트 정보 공유",
      writer: "홍길동",
      date: "2025.07.10",
    },
    {
      id: 9,
      title: "다이어트 정보 공유",
      writer: "홍길동",
      date: "2025.07.10",
    },
    {
      id: 10,
      title: "다이어트 정보 공유",
      writer: "홍길동",
      date: "2025.07.10",
    },
  ]);
  const [search, setSearch] = useState("");

  const filteredPosts = posts.filter((post) => post.title.includes(search));

  return (
    <div className="w-[1020px] mx-auto">
      <div className="container w-[1020px] pt-4 md:pt-8 pb-4 flex flex-col items-center text-gray-500 md:flex-row md:items-start mt-4">
        <Link to="/community" className="hidden md:block mb-3 ">
          <p className="text-[18px] md:text-xl font-semibold hover:underline cursor-pointer">
            커뮤니티>
          </p>
        </Link>
        <h1 className="text-[18px] md:text-xl font-semibold text-center md:text-left mt-0 md:mt-0">
          자유게시판
        </h1>
      </div>

      {/* 검색 */}
      <div className="flex items-center mb-5 justify-end">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="검색할 제목을 입력하세요"
          className="input input-bordered input-sm w-[300px] mr-2"
        />
        <button className="btn btn-sm bg-purple-500 text-white">검색</button>
      </div>

      {/* 테이블 */}
      <table className="table w-full text-center">
        <thead>
          <tr className="bg-purple-500 text-white">
            <th className="w-[10%]">번호</th>
            <th className="w-[50%]">제목</th>
            <th className="w-[20%]">작성자</th>
            <th className="w-[20%]">작성일</th>
          </tr>
        </thead>
        <tbody className="border-b border-gray-100">
          {filteredPosts.map((post) => (
            <tr key={post.id} className="hover">
              <td>{post.id}</td>
              <td className="text-left pl-3">
                <Link
                  to={`/community/board/writeview/${post.id}`}
                  className="hover:underline"
                >
                  {post.title}
                </Link>
              </td>
              <td>{post.writer}</td>
              <td>{post.date}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 하단 버튼/페이지 */}
      <div className="flex justify-end">
        <Link to="/community/board/write">
          <button className="btn btn-sm bg-purple-500 text-white mt-5">
            글쓰기
          </button>
        </Link>
      </div>
      <div className="flex  items-center mt-8 mb-14 justify-center">
        <div className="join">
          <button className="join-item btn btn-sm">«</button>
          <button className="join-item btn btn-sm">1</button>
          <button className="join-item btn btn-sm">2</button>
          <button className="join-item btn btn-sm">3</button>
          <button className="join-item btn btn-sm">»</button>
        </div>
      </div>
    </div>
  );
}

export default MainBoard;
