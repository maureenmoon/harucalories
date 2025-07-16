import React, { useState } from "react";
import RequestInfoForm from "../../components/mypage/RequestInfoForm";
import ConfirmationPopup from "../../components/mypage/ConfirmationPopup";
import { useDispatch } from "react-redux";
import { setNickname } from "../../slices/loginSlice";

// 🧪 Mock user list with nicknames
const mockUsers = [
  { name: "문연순", email: "susiemoon@naver.com", nickname: "toby" },
  { name: "안소라", email: "tidlsld249@naver.com", nickname: "david" },
];

export default function SearchNickname() {
  const dispatch = useDispatch();

  const [form, setForm] = useState({ name: "", email: "" });
  const [sent, setSent] = useState(false);
  const [nickname, setLocalNickname] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const foundNickname = await sendMockNickname(form); // TODO: replace with real API

      setLocalNickname(foundNickname); //local state
      // dispatch(setNickname(foundNickname)); //redux state
      setSent(true); // ✅ show confirmation popup
    } catch (error) {
      alert(error.message || "닉네임 전송 중 오류가 발생했습니다.");
    }
  };

  // MOCK API call
  const sendMockNickname = (form) => {
    return new Promise((resolve, reject) => {
      const found = mockUsers.find(
        (user) => user.name === form.name && user.email === form.email
      );

      if (!found) {
        return reject(new Error("일치하는 사용자를 찾을 수 없습니다"));
      }

      setTimeout(() => {
        resolve(found.nickname); // Send back nickname
      }, 800);
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6">
        <RequestInfoForm
          form={form} // ✅ use form prop instead of individual values
          onChange={handleChange}
          onSubmit={handleSubmit}
          title="닉네임 찾기"
          submitText="닉네임 받기"
        />
        {sent && (
          <ConfirmationPopup
            message={`요청하신 닉네임은 "${nickname}" 입니다.`}
            onConfirm={() => setSent(false)}
          />
        )}
      </div>
    </div>
  );
}
