import { useMutation } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";

const registerUser = async (data: { name: string; email: string; password: string }) => {
  const response = await axiosInstance.post("/user/createUser", data);
  return response.data;
};

export const useRegisterMutation = () => {
  return useMutation({
    mutationKey: ["auth"],
    mutationFn: registerUser,
   
  });
};
