import React from "react";
import { Link } from "react-router-dom";

function PurBtn({ to, label }) {
  return (
    <Link to={to}>
      <button className="btn bg-purple-500 text-white btn-sm md:btn-md">
        {label}
      </button>
    </Link> //보라색 버튼
  );
}

export default PurBtn;
