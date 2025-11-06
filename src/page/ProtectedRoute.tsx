// src/page/ProtectedRoute.tsx

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getAccessToken } from '@/shared/lib/token/tokenStorage'; // Import hàm lấy token

const ProtectedRoute = () => {
  const token = getAccessToken();

  if (!token) {
    // Nếu không có token, "đá" người dùng về trang login
    return <Navigate to="/login" replace />;
  }

  // Nếu có token, cho phép hiển thị trang con (Dashboard)
  // <Outlet /> sẽ đại diện cho <DashboardPage />
  return <Outlet />; 
};

export default ProtectedRoute;