// src/App.tsx

import { Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "@/page/Login";
import DashboardPage from "@/page/Dashboard"; // <-- "Trang tiếp theo"
import ProtectedRoute from "@/page/ProtectedRoute"; // <-- 1. Import "người gác cổng"
import DashboardLayout from "./page/DashboardLayout";
import BoardDetailPage from "@/page/BoardDetailPage";
function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/boards/:boardId" element={<BoardDetailPage />} />
        </Route>
      </Route>
    </Routes>
  )
}
export default App;