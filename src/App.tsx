// src/App.tsx

import { Routes, Route } from "react-router-dom";

// 1. Import các "page" của bạn
// (Giả sử bạn đã tạo các file này trong thư mục /page)
import LoginPage from "@/page/Login";
import DashboardPage from "@/page/Dashboard"; // <-- "Trang tiếp theo"
// import ProductsPage from "@/page/Products";
// import AdminDashboard from "@/page/AdminDashboard";
import ProtectedRoute from "@/page/ProtectedRoute"; // <-- 1. Import "người gác cổng"
function App() {
  return (
    // 2. <Routes> là nơi chứa tất cả các trang
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<ProtectedRoute />}>
        {/* Đặt tất cả các trang cần bảo vệ vào bên trong */}
        <Route path="/" element={<DashboardPage />} />
        {/* <Route path="/profile" element={<ProfilePage />} /> */}
        {/* <Route path="/settings" element={<SettingsPage />} /> */}
      </Route>
    </Routes>
  )
}

export default App;