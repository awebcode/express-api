import useUserStore from "@/hooks/useUser";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useUserStore();
  useEffect(() => {
    if (user?.role !== "Admin") {
      navigate("/login");
    }
  }, [user, navigate]);
  return (
    <div>
      Dashboard <h1>{user?.name}</h1>
    </div>
  );
};

export default Dashboard;
