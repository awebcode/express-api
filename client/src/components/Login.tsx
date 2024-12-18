import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLoginMutation } from "@/hooks/useLoginMutation";
import { useNavigate } from "react-router-dom";
import useUserStore from "@/hooks/useUser";
import { useQueryClient } from "@tanstack/react-query";
const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { mutate, isPending, isError, error, isSuccess } = useLoginMutation();
  const queryClient = useQueryClient();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(formData);
    queryClient.invalidateQueries({ queryKey: ["auth"] });
  };
  const navigate = useNavigate();
  const { user } = useUserStore();
  useEffect(() => {
    if (user) {
      navigate("/profile");
    }
  }, [user, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-md shadow-md w-full max-w-md"
      >
        <h2 className="text-lg font-bold mb-4">Login</h2>
        {isError && (
          <p className="text-red-500 mb-4">{(error as any)?.response?.data?.message}</p>
        )}
        {isSuccess && <p className="text-green-500 mb-4">Login successful!</p>}
        <div className="mb-4">
          <Input
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <Input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? "Logging in..." : "Login"}
        </Button>
      </form>
    </div>
  );
};

export default Login;
