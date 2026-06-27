import { useState, useEffect } from "react";
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Task from "./pages/Task.jsx";
import axiosInstance from "./api/AxiosInstance.js";
import Home from "./pages/Home.jsx";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
}

function App() {
  const [testData, setTestData] = useState([]);

  async function testServerHandshake() {
    try {
      const res = await axiosInstance.get("/test");
      setTestData(res.data);
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
    }
  }

  useEffect(() => {
    testServerHandshake();
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/task"
          element={
            <ProtectedRoute>
              <Task />
            </ProtectedRoute>
          }
        />
        <Route
          path="*"
          element={<div className="p-20 text-center">404 - Page Not Found</div>}
        />
        <Route
          path="/test"
          element={<div className="p-20 text-center "> {testData.status}</div>}
        />
      </Routes>
    </>
  );
}

export default App;
