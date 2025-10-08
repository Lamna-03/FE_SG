import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("accessToken") || null;
  }
};

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 3. Cấu hình Interceptors
instance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor cho Response
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("accessToken");
      window.location.href = "/login";
      console.log("Unauthorized! Redirecting to login...");
    }
    return Promise.reject(error);
  }
);
    

export default instance;

// Ngắn gọn: Chỉ cần gọi instance.get('/products') thay vì axios.get('http://localhost:8080/api/products').

// Tự động: Token xác thực được tự động đính kèm vào mỗi request.

// Tập trung: Logic xử lý lỗi chung (như token hết hạn) được quản lý ở một nơi duy nhất, không phải lặp lại ở từng trang.