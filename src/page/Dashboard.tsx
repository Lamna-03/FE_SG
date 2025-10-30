// src/page/DashboardPage.tsx

import React, { useState } from "react";
import { Button } from "@/shared/ui/button/button"; // Import Button của bạn
import { getUserDetailsApi } from "@/features/user/userApi"; // Import hàm API vừa tạo

// (Giả sử đây là cấu trúc User)
interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl: string;
  createdAt: string;
    updatedAt: string;
  // ... các trường khác
}

const DashboardPage = () => {
  // --- 1. Tạo các state (các "flag") ---
  
  // State để lưu data user
  const [userData, setUserData] = useState<User | null>(null);
  // State để biết đang tải hay không
  const [isLoading, setIsLoading] = useState(false);
  // State để lưu thông báo lỗi
  const [error, setError] = useState<string | null>(null);

  // --- 2. Viết hàm xử lý bấm nút ---
  const handleFetchUser = async () => {
    setIsLoading(true); // Bật loading
    setError(null);     // Xóa lỗi cũ
    setUserData(null);  // Xóa data cũ

    try {
      // Gọi API
      const user = await getUserDetailsApi();
      // Lưu data vào state
      setUserData(user);

    } catch (err) {
     console.error(err);
      setError("Không thể tải được thông tin người dùng.");
    } finally {
      // Luôn tắt loading ở cuối
      setIsLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Dashboard</h1>
      <p>Chào mừng bạn!</p>
      
      <hr style={{ margin: '20px 0' }} />

      {/* --- 3. Nút bấm để gọi API --- */}
      <Button onClick={handleFetchUser} disabled={isLoading}>
        {isLoading ? "Đang tải..." : "Lấy thông tin User"}
      </Button>

      {/* --- 4. Hiển thị kết quả --- */}
      <div style={{ marginTop: '20px' }}>
        {/* Hiển thị trạng thái Loading */}
        {isLoading && <p>Loading data...</p>}

        {/* Hiển thị lỗi (nếu có) */}
        {error && <p style={{ color: 'red' }}>Lỗi: {error}</p>}

        {/* Hiển thị data (nếu thành công) */}
        {userData && (
          <div>
            <h3>Thông tin User (Đã lấy từ API):</h3>
            <pre>{JSON.stringify(userData, null, 2)}</pre>
            <p><strong>Email:</strong> {userData.email}</p>
            <p><strong>Tên:</strong> {userData.name}</p>
            <p><strong>Avatar URL:</strong> {userData.avatarUrl}</p>
            <p><strong>Ngày tạo:</strong> {new Date(userData.createdAt).toLocaleDateString()}</p>
            <p><strong>Ngày cập nhật:</strong> {new Date(userData.updatedAt).toLocaleDateString()}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;