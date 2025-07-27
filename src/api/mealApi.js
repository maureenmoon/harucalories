// src/api/meal.js
import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api"; // 이거 환경변수로 빼도 됨

export const fetchMealsByMemberId = async (memberId) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/meals/member/${memberId}`
    );
    return response.data;
  } catch (error) {
    console.error("식사 데이터 가져오기 실패:", error);
    throw error;
  }
};
