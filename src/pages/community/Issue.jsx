// src/pages/community/Issue.jsx
import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

const dummyIssues = Array.from({ length: 32 }, (_, i) => ({
  id: i + 1,
  title: `Hot Issue Title ${i + 1}`,
  createdAt: `2025. 6.${24 - (i % 5)}`,
}));

const ITEMS_PER_PAGE_PC = 15;
const ITEMS_PER_PAGE_MOBILE = 5;

const Issue = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const isMobile = window.innerWidth <= 768;
  const itemsPerPage = isMobile ? ITEMS_PER_PAGE_MOBILE : ITEMS_PER_PAGE_PC;

  const filteredIssues = dummyIssues.filter((issue) =>
    issue.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pageCount = Math.ceil(filteredIssues.length / itemsPerPage);
  const paginatedIssues = filteredIssues.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  // const handleWrite = () => {
  //   navigate("write");
  // };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pageCount) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-2">커뮤니티 &gt; 핫이슈</div>

      {/* Search */}
      <div className="mb-4 flex items-center justify-between">
        <input
          type="text"
          placeholder="제목에 포함된 단어를 검색하세요."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full border border-gray-300 rounded px-4 py-2 text-sm"
        />
      </div>

      {/* Table headers */}
      <div className="grid grid-cols-12 font-bold border-b py-2 px-2 text-gray-700">
        <div className="col-span-9">제목</div>
        <div className="col-span-3 text-right">작성일</div>
      </div>

      {/* List */}
      {paginatedIssues.map((issue) => (
        <div
          key={issue.id}
          className="grid grid-cols-12 py-2 px-2 border-b hover:bg-gray-50 cursor-pointer"
        >
          <Link
            to={`view/${issue.id}`}
            className="col-span-9 text-sm truncate text-blue-600 hover:underline"
          >
            {issue.title}
          </Link>
          <div className="col-span-3 text-right text-sm text-gray-500">
            {issue.createdAt}
          </div>
        </div>
      ))}

      {/* Pagination */}
      <div className="flex justify-center items-center mt-4 gap-2 text-sm">
        {isMobile ? (
          <>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="text-blue-600"
            >
              [이전]
            </button>
            <span>
              {currentPage} / {pageCount}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === pageCount}
              className="text-blue-600"
            >
              [다음]
            </button>
          </>
        ) : (
          Array.from({ length: pageCount }, (_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`px-2 py-1 rounded ${
                currentPage === i + 1
                  ? "bg-blue-600 text-white"
                  : "text-gray-700"
              }`}
            >
              {i + 1}
            </button>
          ))
        )}
      </div>

      {/* Write Button */}
      <div className="flex justify-end mt-6">
        <Outlet />
        <button
          onClick={() => {
            console.log("navigate to write");
            navigate("write");
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
        >
          글쓰기
        </button>
      </div>
    </div>
  );
};

export default Issue;
