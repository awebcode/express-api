import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import useUserStore from "@/hooks/useUser";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Profile = () => {
  const navigate = useNavigate();
  const { user } = useUserStore();
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);
  if (!user) {
    return null;
  }
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="max-w-lg w-full bg-white shadow-md rounded-lg p-6">
        <CardHeader className="flex flex-col items-center mb-6">
          <Avatar className="mb-3">{user.name.charAt(0).toUpperCase()}</Avatar>
          <h2 className="text-lg font-semibold">{user.name}</h2>
          <Badge variant="outline" className="mt-1">
            {user.role}
          </Badge>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="text-base font-medium">{user.email}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Role</p>
            <p className="text-base font-medium">{user.role}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Member Since</p>
            <p className="text-base font-medium">
              {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
