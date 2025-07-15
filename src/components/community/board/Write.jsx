import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import PurBtn from "../../common/PurBtn";

function Write() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 모두 작성해주세요.");
      return;
    }

    const postId = Date.now();
    const rawDate = new Date().toLocaleDateString("ko-KR");
    const cleanDate = rawDate.endsWith(".") ? rawDate.slice(0, -1) : rawDate;
    const newPost = {
      id: postId,
      title,
      content,
      writer: "홍길동", // 임시 작성자
      date: cleanDate,
    };

    // 기존 posts 가져오기
    const existing = JSON.parse(localStorage.getItem("posts")) || [];

    // 새 글 추가
    const updated = [...existing, newPost];
    localStorage.setItem("posts", JSON.stringify(updated));

    alert("게시글이 등록되었습니다!");
    navigate(`/community/board/writeview/${newPost.id}`);
  };

  return (
    <div className="w-[1020px] mx-auto ">
      <div className="container w-[1020px] pt-4 md:pt-8 pb-4 flex flex-col items-center text-gray-500 md:flex-row md:items-start mt-8 ">
        <Link to="/community" className="hidden md:block  ">
          <p className="text-[18px] md:text-xl font-semibold hover:underline cursor-pointer">
            커뮤니티
          </p>
        </Link>
        <h1 className="text-[18px] md:text-xl font-semibold text-center md:text-left mt-0 md:mt-0">
          자유게시판
        </h1>
      </div>

      <div className="items-center  mt-1">
        <p className="p-2 font-bold text-gray-900">글을 작성하는 공간입니다.</p>
        {/* 제목 입력 */}

        <div className=" flex border-t border-b border-gray-400 items-center p-2 gap-7 justify-center ">
          <p className="text-gray-800 text-sm">제목</p>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력해주세요"
            className=" w-[900px] h-10 rounded bg-gray-200 px-4 "
          />
        </div>

        {/* 내용 입력 */}
        <div className=" flex  border-b border-gray-400 items-center gap-7 p-2  mb-3 justify-center">
          <p className="text-gray-800 text-sm">내용</p>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="내용을 입력하세요"
            className="w-[900px] h-[500px] rounded bg-gray-200 p-4  resize-none"
          />
        </div>
      </div>
      {/* 등록 버튼 */}

      <div className="flex justify-end mb-14">
        <PurBtn label={"작성완료"} onClick={handleSubmit} />
      </div>
    </div>
  );
}

export default Write;
