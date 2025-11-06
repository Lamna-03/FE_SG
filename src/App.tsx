// src/App.tsx

import { Routes, Route, Navigate } from "react-router-dom";
import React, {Suspense} from "react";
import LoginPage from "@/page/Login";
//import DashboardPage from "@/page/Dashboard"; 

import ProtectedRoute from "@/page/ProtectedRoute";
const LazyDashboardPage = React.lazy(() => import('@/page/Dashboard'));
function App() {
  return (
    <Suspense fallback={<div className="loading-spinner" >Loading...</div>}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<LazyDashboardPage />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default App;