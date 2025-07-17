import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import SubLayout from "../../../layout/SubLayout";

function IssueDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [showMenu, setShowMenu] = useState(false);

  const handleDelete = () => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    const posts = JSON.parse(localStorage.getItem("posts")) || [];
    const filtered = posts.filter((p) => p.id !== Number(id));
    localStorage.setItem("posts", JSON.stringify(filtered));
    alert("삭제 완료!");
    navigate("/community/issue");
  };

  const handleEdit = () => {
    navigate(`/community/issue/update/${id}`);
  };

  useEffect(() => {
    const allPosts = JSON.parse(localStorage.getItem("posts")) || [];
    const found = allPosts.find((p) => p.id === Number(id));
    setPost(found);
  }, [id]);

  if (!post)
    return (
      <div className="text-center mt-20">핫이슈 글을 불러오는 중입니다...</div>
    );

  return (
    <div className="w-full max-w-[1020px] mx-auto px-4 sm:px-6">
      <SubLayout to="/community" menu="커뮤니티" label="핫이슈" />
      <div className="mt-6 sm:mt-10 space-y-6">
        {/* 게시글 내용 */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* 게시글 헤더 */}
          <div className="border-b border-gray-100 p-6">
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                {post.title}
              </h1>
              <div className="relative">
                <button
                  onClick={() => setShowMenu(!showMenu)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-500"
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
                {showMenu && (
                  <div className="absolute right-0 top-full mt-1 bg-white rounded-lg shadow-lg border border-gray-100 py-2 w-32">
                    <button
                      onClick={handleEdit}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
                    >
                      수정하기
                    </button>
                    <button
                      onClick={handleDelete}
                      className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-50"
                    >
                      삭제하기
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center text-sm text-gray-500 gap-4">
              <span>{post.writer}</span>
              <span>{post.date}</span>
            </div>
          </div>

          {/* 게시글 본문 */}
          <div className="p-6 min-h-[200px] text-gray-700 whitespace-pre-wrap">
            {post.content}
          </div>
        </div>

        {/* 목록으로 돌아가기 버튼 */}
        <div className="flex justify-center">
          <Link
            to="/community/issue"
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
          >
            목록으로
          </Link>
        </div>
      </div>
    </div>
  );
}

export default IssueDetail;
