import axios from "axios";

const BASE_URL = "../api/auth"; //or bk-end URK if testing locally

//1.sign up
export const signup = async (formData) => {
  try {
    const response = await axios.post(`${BASE_URL}/signup`, formData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

//2.check nickname/email duplicaiton
export const checkDuplication = async (email, nickname) => {
  try {
    const response = await axios.get(`${BASE_URL}/check`, {
      params: { email, nickname },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
