import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function WriteView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [showMenu, setShowMenu] = useState(false);

  const handleAddComment = () => {
    if (!commentText.trim()) {
      alert("댓글을 입력해주세요.");
      return;
    }

    const now = new Date();
    const newComment = {
      id: Date.now(),
      nickname: "내닉네임",
      text: commentText,
      date: now.toLocaleDateString("ko-KR").replace(/\.$/, ""), // "2025. 7. 14"
      time: now.toLocaleTimeString("ko-KR", {
        hour: "2-digit",
        minute: "2-digit",
      }), // "13:45"
    };

    const updatedComments = [...comments, newComment];
    setComments(updatedComments);
    setCommentText("");

    // ✅ 여기! 게시글 ID 기준으로 localStorage에 저장
    localStorage.setItem(`comments-${id}`, JSON.stringify(updatedComments));
  };

  const handleDeleteComment = (commentId) => {
    if (!window.confirm("댓글을 삭제하시겠습니까?")) return;

    const updatedComments = comments.filter(
      (comment) => comment.id !== commentId
    );
    setComments(updatedComments);
    localStorage.setItem(`comments-${id}`, JSON.stringify(updatedComments));
  };

  const handleDelete = () => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    const posts = JSON.parse(localStorage.getItem("posts")) || [];
    const filtered = posts.filter((p) => p.id !== Number(id));
    localStorage.setItem("posts", JSON.stringify(filtered));
    alert("삭제 완료!");
    navigate("/community/board");
  };

  useEffect(() => {
    // 게시글 불러오기
    const allPosts = JSON.parse(localStorage.getItem("posts")) || [];
    const found = allPosts.find((p) => p.id === Number(id));
    setPost(found);

    // ✅ 댓글 불러오기 (key: comments-게시글ID)
    const savedComments =
      JSON.parse(localStorage.getItem(`comments-${id}`)) || [];
    setComments(savedComments);
  }, [id]);

  const handleEdit = () => {
    navigate(`/community/board/update/${id}`);
  };

  if (!post)
    return (
      <div className="text-center mt-20">게시글을 불러오는 중입니다...</div>
    );

  return (
    <div className="p-4 sm:p-6 container mx-auto space-y-8 sm:w-[1020px]">
      {/* 상단 헤더 */}
      <div className="flex flex-col items-center text-gray-500 md:flex-row md:items-start">
        <Link to="/community" className="hidden md:block mb-3">
          <p className="text-lg sm:text-2xl font-semibold hover:underline cursor-pointer">
            커뮤니티{">"}
          </p>
        </Link>
        <h1 className="text-lg sm:text-2xl font-semibold text-center md:text-left">
          자유게시판
        </h1>
      </div>

      {/* 게시글 내용 */}
      <div className="relative">
        {/* 더보기 버튼 (모바일) */}
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="absolute right-0 top-0 p-2 sm:hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
            />
          </svg>
        </button>

        {/* 더보기 메뉴 (모바일) */}
        {showMenu && (
          <div className="absolute right-0 top-10 bg-white shadow-lg rounded-lg z-10 sm:hidden">
            <div className="flex flex-col py-2 w-32">
              <button
                onClick={handleEdit}
                className="px-4 py-2 text-sm text-left hover:bg-gray-100"
              >
                수정하기
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 text-sm text-left hover:bg-gray-100"
              >
                삭제하기
              </button>
              <Link to="/community/board">
                <button className="w-full px-4 py-2 text-sm text-left hover:bg-gray-100">
                  목록가기
                </button>
              </Link>
            </div>
          </div>
        )}

        <h1 className="text-xl sm:text-3xl font-semibold mb-1 mt-5 pr-8 sm:pr-0">
          {post.title}
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mb-3">
          {post.writer} {post.date}
        </p>
        <div className="border-t py-2"></div>
        <p className="text-sm sm:text-base leading-relaxed mb-5 bg-gray-50 px-4 py-7 text-gray-800">
          {post.content}
        </p>

        {/* 버튼 (데스크톱) */}
        <div className="hidden sm:flex gap-2 mb-8 justify-end">
          <button
            className="btn bg-gray-700 text-white btn-sm"
            onClick={handleEdit}
          >
            수정하기
          </button>
          <button
            className="btn bg-gray-700 text-white btn-sm"
            onClick={handleDelete}
          >
            삭제하기
          </button>
          <Link to="/community/board">
            <button className="btn bg-gray-700 text-white btn-sm">
              목록가기
            </button>
          </Link>
        </div>
      </div>

      {/* 댓글 */}
      <div className="space-y-2 mb-8 border p-3 rounded-md border-gray-300">
        <p className="font-bold text-sm sm:text-base">댓글</p>
        <div className="flex flex-col gap-2">
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="댓글을 작성하세요."
            className="w-full h-[60px] sm:h-[100px] input input-bordered text-sm p-3 resize-none"
          />
          <div className="flex justify-end">
            <button
              className="btn btn-sm bg-gray-700 text-white px-4"
              onClick={handleAddComment}
            >
              등록
            </button>
          </div>
        </div>
        {comments.map((c) => (
          <div key={c.id} className="bg-gray-100 p-3 rounded">
            <div className="flex justify-between items-center text-sm text-gray-600">
              <span className="font-medium">{c.nickname}</span>
              <span className="text-xs">
                {c.date} {c.time}
              </span>
            </div>
            <p className="text-gray-800 text-sm mt-1">{c.text}</p>
            <div className="flex justify-end ">
              <button
                onClick={() => handleDeleteComment(c.id)}
                className="text-xs hover:text-gray-700"
              >
                삭제
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WriteView;
