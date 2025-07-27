import axios from "./axiosInstance";

const API_BASE = "/api/members";

// 회원 가입 (multipart: data + profileImage)
export const signupMember = async (memberData, profileImage) => {
  const formData = new FormData();
  formData.append(
    "data",
    new Blob([JSON.stringify(memberData)], { type: "application/json" })
  );
  if (profileImage) {
    formData.append("profileImage", profileImage);
  }
  return axios.post(`${API_BASE}/multipart`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// 로그인 (닉네임 기반)
export const loginMember = async (nickname, password) => {
  try {
    const res = await axios.post(
      `${API_BASE}/login`,
      { nickname, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res;
  } catch (err) {
    console.error("❌ loginApi error:", err.response?.data || err.message);
    throw err;
  }
};

// 현재 로그인된 사용자 정보 가져오기
export const fetchCurrentMember = async () => {
  const res = await axios.get(`${API_BASE}/me`);
  return res.data;
};

// 회원 정보 수정 (multipart: data + profileImage)
export const updateMemberWithImage = async (id, memberData, profileImage) => {
  const formData = new FormData();
  formData.append(
    "data",
    new Blob([JSON.stringify(memberData)], { type: "application/json" })
  );
  if (profileImage) {
    formData.append("profileImage", profileImage);
  }
  // Try POST instead of PUT since signup uses POST /multipart
  return axios.post(`${API_BASE}/${id}/multipart`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// 프로필 이미지 변경
export const updateProfileImage = async (id, profileImage) => {
  const formData = new FormData();
  formData.append("profileImage", profileImage);
  return axios.patch(`${API_BASE}/${id}/profile-image`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// Supabase에서 받은 public URL을 백엔드로 전송 (MySQL에 저장됨)
export const updatePhoto = async (photoUrl) => {
  return axios.patch(`${API_BASE}/me/profile-image`, { photoUrl });
};

// 회원 탈퇴 (내 계정)
export const deleteAccount = async () => {
  return axios.delete(`${API_BASE}/me`).then((res) => res.data);
};

// 이메일 중복 확인
export const checkEmailExists = async (email) => {
  return axios.get(`${API_BASE}/check-email`, { params: { email } });
};

// 닉네임 중복 확인
export const checkNicknameExists = async (nickname) => {
  return axios.get(`${API_BASE}/check-nickname`, { params: { nickname } });
};

// 닉네임 찾기 (이름+이메일)
export const searchNickname = async (form) => {
  return axios.post(`${API_BASE}/search-nickname`, form);
};

// 비밀번호 재설정 요청
export const requestPasswordReset = async ({ name, email }) => {
  return axios.post(`${API_BASE}/reset-password`, { name, email });
};

// 프로필 검색 (닉네임/이메일)
export const searchProfiles = async ({ query }) => {
  return axios
    .get(`${API_BASE}/search`, { params: { query } })
    .then((res) => res.data);
};

// 프로필 정보 수정
export const updateProfile = async (profileData) => {
  // Your Spring backend doesn't have profile update endpoints
  // For now, we'll simulate a successful update and show a message
  console.log("Profile update requested:", profileData);

  // Show user that backend doesn't support profile updates yet
  alert(
    "프로필 수정 기능은 현재 백엔드에서 지원되지 않습니다. 개발자에게 문의하세요."
  );

  // Return the current user data to prevent errors
  const userStr = localStorage.getItem("user");
  if (userStr) {
    return JSON.parse(userStr);
  }

  throw new Error("Profile updates not supported by backend");
};
