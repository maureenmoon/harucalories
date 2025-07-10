import React, { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) {
      alert("검색어를 입력하세요.");
      return;
    }
    onSearch(query);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="container flex items-center mx-auto my-10"
    >
      <input
        type="text"
        placeholder="검색할 단어를 입력하세요"
        className="input input-bordered flex-grow"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit" className="btn bg-purple-500 text-white ml-2">
        검색
      </button>
    </form>
  );
}
