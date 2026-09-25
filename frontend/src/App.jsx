import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import StudentDashboard from "./pages/StudentDashboard";
import ExamInstructions from "./pages/ExamInstructions";
import Exam from "./pages/Exam";
import Result from "./pages/Result";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* =========================
            HOME
        ========================= */}
        <Route path="/" element={<Home />} />

        {/* =========================
            AUTHENTICATION
        ========================= */}
        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        {/* =========================
            STUDENT DASHBOARD
        ========================= */}
        <Route path="/student-dashboard" element={<StudentDashboard />} />

        {/* =========================
            EXAM INSTRUCTIONS
        ========================= */}
        <Route path="/exam-instructions" element={<ExamInstructions />} />

        {/* =========================
            EXAM
        ========================= */}
        <Route path="/exam" element={<Exam />} />

        {/* =========================
            RESULT
        ========================= */}
        <Route path="/result" element={<Result />} />

        {/* =========================
            INVALID URL
        ========================= */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
