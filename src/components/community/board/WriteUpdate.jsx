import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";

function WriteUpdate() {
  const { id } = useParams(); // URL에서 게시글 ID 꺼냄
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // 예시: 로컬 데이터 또는 API에서 해당 글 데이터 가져오기
  useEffect(() => {
    // 여기에 실제 API 요청으로 바꾸면 됨
    const dummyPost = {
      id,
      title: "기존 제목입니다",
      content: "기존 내용입니다",
    };
    setTitle(dummyPost.title);
    setContent(dummyPost.content);
  }, [id]);

  const handleUpdate = () => {
    // 수정 요청 보내는 로직 (예: axios.put)
    alert("수정 완료!");
  };

  return (
    <div className="w-[1020px] mx-auto mt-10">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full h-12 mb-4 rounded bg-gray-100 px-4"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full h-[300px] rounded bg-gray-100 p-4"
      />
      <div className="flex justify-end mt-4">
        <button onClick={handleUpdate} className="btn bg-purple-500 text-white">
          수정 완료
        </button>
      </div>
    </div>
  );
}

export default WriteUpdate;
