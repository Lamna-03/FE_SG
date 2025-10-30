// src/features/user/api/userApi.ts

import instance from "@/shared/api/instance";

// (Giả sử BE trả về cấu trúc này)
interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl: string;
  createdAt: string;
    updatedAt: string;
  // ... các trường khác
}

// (Giả sử BE trả về ServiceResponse<User>)
interface ServiceResponse<T> {
  responseObject: T;
  message?: string;
    success?: boolean;
    statusCode?: number;
}

// Giả sử endpoint chi tiết user là "/users/me"
export const getUserDetailsApi = async (): Promise<User> => {
  try {
    const response = await instance.get<ServiceResponse<User>>("/users/me");
    
    // Trả về data user từ bên trong responseObject
    return response.data.responseObject;

  } catch (error) {
    console.error("Lỗi khi lấy thông tin user:", error);
    // Ném lỗi ra để component UI bắt lại
    throw error;
  }
};