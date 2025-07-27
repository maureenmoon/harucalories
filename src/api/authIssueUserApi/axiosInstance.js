import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true, // 🔥 This enables cookies to be sent with requests
});

// ✅ Simplified request interceptor - no manual token handling needed
instance.interceptors.request.use((config) => {
  console.log("🔍 Axios interceptor - URL:", config.url);
  console.log(
    "🔍 Axios interceptor - withCredentials:",
    config.withCredentials
  );

  // Cookies will be sent automatically with withCredentials: true
  // No need to manually set Authorization header
  return config;
});

// ✅ Simplified response interceptor - handle 401 errors
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.error(
      "🔍 Axios response error:",
      error.response?.status,
      error.response?.data
    );

    if (error.response?.status === 401) {
      console.log("❌ Authentication failed, redirecting to login");

      // Clear any localStorage tokens if they exist
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      // Redirect to login page
      window.location.href = "/member/login";
    }

    return Promise.reject(error);
  }
);

export default instance;
