import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Label } from "../components/ui/label";
import { Separator } from "../components/ui/separator";
import { useToast } from "../hooks/use-toast";
import { Lock, Mail } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  const { loginUser } = useAuth();

  const handleLogin = (e) => {
    e.preventDefault();

    try {
      const userInfo = { email, password };
      loginUser(userInfo);
      toast({
        title: "Success",
        description: "Logged in successfully",
        variant: "default",
      });
      setEmail("");
      setPassword("");
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 px-4">
      <Card className="w-full max-w-md bg-gray-800/60 backdrop-blur-sm border-gray-700">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold tracking-tight text-purple-400">
            Login to QuikNote
          </CardTitle>
          <CardDescription className="text-gray-300">
            Enter your email and password to access your account
          </CardDescription>
          <Separator className="bg-gray-700" />
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-200">
                Email
              </Label>
              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-200">
                Password
              </Label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500"
                  required
                />
              </div>
            </div>
            <Button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white transition-all duration-200 ease-in-out "
            >
              Log In
            </Button>
          </form>
          <div className="mt-4 flex items-center justify-between">
            <Separator className="w-1/3 bg-gray-700" />
            <span className="text-sm text-gray-400">or</span>
            <Separator className="w-1/3 bg-gray-700" />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <p className="text-sm text-gray-400">
            Don&apos;t have an account?{" "}
            <span className="text-purple-400 hover:text-purple-300 transition-colors duration-200">
              <Link to="/signup">Sign up</Link>
            </span>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
