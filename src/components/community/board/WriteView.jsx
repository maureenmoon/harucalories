import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function WriteView() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("lastPost");
    const parsed = stored ? JSON.parse(stored) : null;

    if (parsed && parsed.id === Number(id)) {
      setPost(parsed);
    } else {
      // 나중엔 axios.get(`/api/posts/${id}`)로 대체
      setPost(null);
    }
  }, [id]);

  const handleAddComment = () => {
    if (!commentText.trim()) return alert("댓글을 입력해주세요.");
    const newComment = {
      id: Date.now(),
      nickname: "내닉네임",
      text: commentText,
      date: "25.03.26",
      time: "13:23",
    };
    setComments([...comments, newComment]);
    setCommentText("");
  };

  const handleEdit = () => {
    navigate(`/community/board/update/${id}`);
  };

  if (!post)
    return (
      <div className="text-center mt-20">게시글을 불러오는 중입니다...</div>
    );

  return (
    <div className="w-[1020px] mx-auto mt-10">
      {/* 상단 헤더 */}
      <div className="container w-[1020px] pt-4 md:pt-8 pb-4 flex flex-col items-center text-gray-500 md:flex-row md:items-start mt-4">
        <Link to="/community" className="hidden md:block mb-3">
          <p className="text-[18px] md:text-xl font-semibold hover:underline cursor-pointer">
            커뮤니티&gt;
          </p>
        </Link>
        <h1 className="text-[18px] md:text-xl font-semibold text-center md:text-left">
          자유게시판
        </h1>
      </div>

      {/* 게시글 내용 */}
      <h1 className="text-3xl font-semibold mb-1 mt-5">{post.title}</h1>
      <p className="text-sm text-gray-500 mb-3">
        {post.writer} {post.date}
      </p>
      <div className="border-t py-2"></div>
      <p className="text-base leading-relaxed mb-5 bg-gray-50 px-4 py-7 text-gray-800">
        {post.content}
      </p>

      {/* 버튼 */}
      <div className="flex gap-2 mb-10 justify-end">
        <button
          className="btn bg-gray-700 text-white btn-sm"
          onClick={handleEdit}
        >
          수정하기
        </button>
        <button className="btn bg-gray-700 text-white btn-sm">삭제하기</button>
        <Link to="/community/board">
          <button className="btn bg-gray-700 text-white btn-sm">
            목록가기
          </button>
        </Link>
      </div>

      {/* 댓글 */}
      <div className="space-y-2 mb-14 border p-3 rounded-md border-gray-300">
        <p className="font-bold text-sm">댓글</p>
        <input
          type="text"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="댓글을 작성하세요."
          className="w-full h-[70px] input input-bordered input-sm mb-2"
        />
        <div className="flex justify-end">
          <button
            className="btn btn-sm bg-gray-700 text-white mb-5"
            onClick={handleAddComment}
          >
            등록
          </button>
        </div>
        {comments.map((c) => (
          <div key={c.id} className="bg-gray-100 p-3 rounded">
            <div className="flex justify-between text-sm text-gray-600">
              <span className="font-medium">{c.nickname}</span>
              <span className="text-xs">
                {c.date} {c.time}
              </span>
            </div>
            <p className="text-gray-800 text-sm mt-1">{c.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WriteView;
