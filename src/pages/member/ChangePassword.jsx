import React, { useState } from "react";
import RequestInfoForm from "../../components/mypage/RequestInfoForm";
import ConfirmationPopup from "../../components/mypage/ConfirmationPopup";

// Mock user
const mockUsers = [
  { name: "문연순", email: "susiemoon@naver.com", nickname: "toby" },
  { name: "안소라", email: "tidlsld249@naver.com", nickname: "david" },
];

export default function ChangePassword() {
  const [form, setForm] = useState({ name: "", email: "" });
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await mockSendTempPassword(form);
      setShowPopup(true);
    } catch (error) {
      alert("일치하는 사용자를 찾을 수 없습니다");
    }
  };

  // Mock function to simulate temp password email
  const mockSendTempPassword = (form) => {
    return new Promise((resolve, reject) => {
      const found = mockUsers.find(
        (user) => user.name === form.name && user.email === form.email
      );
      if (!found) return reject(new Error("사용자 없음"));

      setTimeout(() => resolve(), 500);
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6">
        <RequestInfoForm
          form={form}
          onChange={handleChange}
          onSubmit={handleSubmit}
          title="본인 확인 이메일 인증"
          submitText="임시비밀번호 받기"
        />
        {showPopup && (
          <ConfirmationPopup
            message="요청하신 정보를 이메일로 발송했습니다"
            onConfirm={() => setShowPopup(false)}
          />
        )}
      </div>
    </div>
  );
}
