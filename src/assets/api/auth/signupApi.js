import axios from "axios";
import { resolve } from "chart.js/helpers";

//mock version
export const signup = async (FormData) => {
  console.log("mock testing : ", FormData);
  //simulate delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: "성공",
        message: "회원가입 성공(mock)",
      });
    }, 1000);
  });
};

export const checkDuplication = async (email, nickname) => {
  console.log("Mock duplication check :", email, nickname);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (
        email.toLowerCase().includes("dup") ||
        nickname.toLowerCase().includes("dup")
      ) {
        reject({
          status: "에러",
          message: "중복된 이메일 또는 닉네임입니다.",
        });
      } else {
        resolve({
          status: "ok",
          message: "사용 가능한 이메일/닉네임입니다",
        });
      }
    }, 800);
  });
};

//2 when db is ready
// const BASE_URL = "../api/auth"; //or bk-end URK if testing locally

// //1.sign up
// export const signup = async (formData) => {
//   try {
//     const response = await axios.post(`${BASE_URL}/signup`, formData);
//     return response.data;
//   } catch (error) {
//     throw error.response?.data || error;
//   }
// };

// //2.check nickname/email duplicaiton
// export const checkDuplication = async (email, nickname) => {
//   try {
//     const response = await axios.get(`${BASE_URL}/check`, {
//       params: { email, nickname },
//     });
//     return response.data;
//   } catch (error) {
//     throw error.response?.data || error;
//   }
// };
