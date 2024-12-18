import { useMutation } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";

const loginUser = async (data: {  email: string; password: string }) => {
  const response = await axiosInstance.post(
  "/user/loginUser",
    data
    , {
      withCredentials: true
    }
  );
  return response.data;
};

export const useLoginMutation = () => {
  return useMutation({
    mutationKey: ["auth"],
    mutationFn: loginUser,
  });
};
