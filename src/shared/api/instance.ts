// src/shared/api/instance.ts

import axios from "axios";
import { getAccessToken, getRefreshToken, saveTokens, clearTokens } from "@/shared/lib/token/tokenStorsge";
console.log("Kiểm tra env:");
console.log("GIÁ TRỊ VITE_API_URL LÀ:", import.meta.env.VITE_API_URL);
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor 1: Gắn Access Token vào MỖI request
instance.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor 2: Xử lý khi Access Token HẾT HẠN (Lỗi 401)
instance.interceptors.response.use(
  (response) => response, // Trả về response nếu thành công
  async (error) => {
    const originalRequest = error.config;

    // Kiểm tra nếu lỗi là 401 và request này không phải là request "thử lại"
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Đánh dấu là đã thử lại
      
      const refreshToken = getRefreshToken();
      if (!refreshToken) {
        // Nếu không có refresh token, đá ra trang login
        clearTokens();
        window.location.href = '/login';
        return Promise.reject(error);
      }

      try {
        // Tạo một instance axios RIÊNG để gọi refresh, tránh vòng lặp
        const refreshInstance = axios.create({ baseURL: import.meta.env.VITE_API_URL });
        
        // Gọi API để lấy token mới (giả sử endpoint là /refresh)
        const response = await refreshInstance.post("/refresh", { refreshToken });

        const { accessToken: newAccessToken, refreshToken: newRefreshToken } = response.data;

        // Lưu token mới
        saveTokens(newAccessToken, newRefreshToken);

        // Cập nhật header của request GỐC với token mới
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        // Gọi lại request GỐC đã bị lỗi 401
        return instance(originalRequest);

      } catch (refreshError) {
        // Nếu refresh token cũng hết hạn -> Xóa hết token và đá ra login
        clearTokens();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error); // Trả về lỗi nếu không phải 401
  }
);

export default instance;