import { BrowserRouter, Routes, Route } from "react-router-dom"
import LoginPage from "./page/Login"

function App() {
  return (
    <BrowserRouter basename="/FE_SG">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        {/* thêm các route khác */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
