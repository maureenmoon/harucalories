import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function MainBoard() {
  const [posts, setPosts] = useState(() => {
    const stored = localStorage.getItem("posts");
    return stored ? JSON.parse(stored) : [];
  });

  const [searchInput, setSearchInput] = useState(""); // 사용자가 입력 중인 검색어
  const [searchKeyword, setSearchKeyword] = useState(""); // 버튼 누른 뒤 확정된 키워드

  const handleSearch = () => {
    setSearchKeyword(searchInput.trim());
  };

  useEffect(() => {
    const existing = localStorage.getItem("posts");
    if (!existing) {
      const dummyPosts = [
        {
          id: 1,
          title: "다이어트 정보 공유",
          content: "다이어트 너무 힘들다",
          writer: "홍길동",
          date: "2025. 07. 10",
        },
        {
          id: 2,
          title: "다이어트 팁 나눔",
          content: "물 많이 마시기 중요해요!",
          writer: "김다이어트",
          date: "2025. 07. 11",
        },
        // ... 필요한 만큼 추가
      ];
      localStorage.setItem("posts", JSON.stringify(dummyPosts));
    }
  }, []);

  const [search, setSearch] = useState("");
  // ✅ 최신순 정렬
  const sortedPosts = [...posts].sort((a, b) => b.id - a.id);

  // ✅ 검색 필터
  const filteredPosts = searchKeyword
    ? sortedPosts.filter((post) =>
        post.title.toLowerCase().includes(searchKeyword.toLowerCase())
      )
    : sortedPosts;

  return (
    <div className="w-[1020px] mx-auto">
      <div className="container w-[1020px] pt-4 md:pt-8 pb-4 flex flex-col items-center text-gray-500 md:flex-row md:items-start mt-8">
        <Link to="/community" className="hidden md:block mb-3 ">
          <p className="text-[18px] md:text-xl font-semibold hover:underline cursor-pointer">
            커뮤니티
          </p>
        </Link>
        <h1 className="text-[18px] md:text-xl font-semibold text-center md:text-left mt-0 md:mt-0">
          자유게시판
        </h1>
      </div>

      {/* 검색 */}
      <div className="flex items-center mb-3 justify-end">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="검색할 제목을 입력하세요"
          className="input input-bordered input-sm w-[300px] h-[40px] mr-2"
        />
        <button
          className="btn btn-sm bg-purple-500 text-white h-[40px]"
          onClick={handleSearch}
        >
          검색
        </button>
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
                  onClick={() =>
                    localStorage.setItem("selectedPostId", post.id)
                  }
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
