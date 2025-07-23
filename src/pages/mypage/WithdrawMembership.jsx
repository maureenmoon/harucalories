import React from "react";
import { useNavigate } from "react-router-dom";

export default function WithdrawMembership() {
  const navigate = useNavigate();

  const handleWithdraw = () => {
    if (
      window.confirm("정말로 탈퇴하시겠습니까? 이 작업은 되돌릴 수 없습니다.")
    ) {
      // 탈퇴 로직 처리
      alert("탈퇴가 완료되었습니다.");
      navigate("/");
    }
  };

  return (
    <div className="p-6 sm:p-8">
      {/* 경고 섹션 */}
      <div className="bg-red-50 rounded-lg p-4 sm:p-6 border border-red-200 mb-6">
        <div className="flex items-center gap-3 mb-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-red-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          <h2 className="font-bold text-red-800 text-lg">회원 탈퇴</h2>
        </div>
        <div className="text-red-700 space-y-2">
          <p>• 탈퇴 시 모든 개인정보와 데이터가 삭제됩니다.</p>
          <p>• 탈퇴 후에는 데이터 복구가 불가능합니다.</p>
          <p>• 동일한 이메일로 재가입이 가능합니다.</p>
        </div>
      </div>

      <div className="text-center space-y-6">
        <p className="text-gray-600">
          정말로 하루칼로리 서비스를 떠나시겠습니까?
          <br />더 나은 서비스로 찾아뵙겠습니다.
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => navigate("/mypage/profile")}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
          >
            취소
          </button>
          <button
            onClick={handleWithdraw}
            className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
          >
            탈퇴하기
          </button>
        </div>
      </div>
    </div>
  );
}
