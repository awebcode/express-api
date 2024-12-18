import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import Navbar from "./components/Navbar";
import { useQuery } from "@tanstack/react-query";
import useUserStore from "./hooks/useUser";
import { useEffect } from "react";
import axiosInstance from "./hooks/axiosInstance";
function App() {
  const setUser = useUserStore((state) => state.setUser);
  

  const { data: user } = useQuery({
    queryKey: ["auth"],
    queryFn: async () => {
      return (await axiosInstance.get("/user/profile")).data.user;
    },
  });
  useEffect(() => {
    if (user) {
      setUser(user);
    }
  }, [user, setUser]);
  console.log({ user });

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/Profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
