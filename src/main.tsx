import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom"; // <-- 1. Import
import App from './App' // File App.tsx từ bước 3
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter basename="/FE_SG/"> {/* <-- 2. Bọc <App /> của bạn */}
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)