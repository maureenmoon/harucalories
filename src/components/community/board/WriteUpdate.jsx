import { Link, useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";

function WriteUpdate() {
  const [post, setPost] = useState(null);
  const { id } = useParams(); // URL에서 게시글 ID 꺼냄
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  // 예시: 로컬 데이터 또는 API에서 해당 글 데이터 가져오기
  useEffect(() => {
    const allPosts = JSON.parse(localStorage.getItem("posts")) || [];
    const found = allPosts.find((p) => p.id === Number(id));
    if (found) {
      setPost(found);
      setTitle(found.title); // ✅ 제목 입력 필드 채우기
      setContent(found.content); // ✅ 내용 입력 필드 채우기
    }
  }, [id]);

  const handleUpdate = () => {
    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }

    const posts = JSON.parse(localStorage.getItem("posts")) || [];
    const updated = posts.map((p) =>
      p.id === Number(id) ? { ...p, title, content } : p
    );
    localStorage.setItem("posts", JSON.stringify(updated));
    alert("수정 완료!");
    navigate(`/community/board/writeview/${id}`);
  };

  return (
    <div className="p-4 sm:p-6 container mx-auto space-y-8 sm:w-[1020px]">
      <div className="flex flex-col items-center text-gray-500 md:flex-row md:items-start">
        <Link to="/community" className="hidden md:block">
          <p className="text-lg sm:text-2xl font-semibold hover:underline cursor-pointer">
            커뮤니티{">"}
          </p>
        </Link>
        <h1 className="text-lg sm:text-2xl font-semibold text-center md:text-left">
          자유게시판
        </h1>
      </div>

      <div>
        <p className="p-2 font-bold text-gray-900 text-sm sm:text-base">
          글을 수정하는 공간입니다.
        </p>
        <div className="flex flex-col sm:flex-row border-t border-b border-gray-400 items-start sm:items-center p-2 gap-2 sm:gap-7 justify-center">
          <p className="text-gray-800 text-sm sm:text-base w-full sm:w-auto">
            제목
          </p>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full sm:w-[900px] h-10 rounded bg-gray-100 px-4"
          />
        </div>
        <div className="flex flex-col sm:flex-row border-b border-gray-400 items-start sm:items-center gap-2 sm:gap-7 p-2 justify-center">
          <p className="text-gray-800 text-sm sm:text-base w-full sm:w-auto">
            내용
          </p>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full sm:w-[900px] h-[300px] sm:h-[500px] rounded bg-gray-100 p-4 resize-none"
          />
        </div>

        <div className="flex justify-end mt-4 mb-8">
          <button
            onClick={handleUpdate}
            className="btn bg-purple-500 text-white w-full sm:w-auto"
          >
            수정 완료
          </button>
        </div>
      </div>
    </div>
  );
}

export default WriteUpdate;
