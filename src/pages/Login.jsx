import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Mail, Lock, PencilLine, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../context/authContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const Login = () => {
  const { loginUser, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userInfo = { email, password };
      await loginUser(userInfo);
      toast.success("Logged in successfully!");
      setEmail("");
      setPassword("");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.message || "Failed to login. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background text-foreground font-sans">
      <div className="w-full max-w-105">
        <Card className="p-8 sm:p-10 shadow-xl shadow-border/10">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="bg-primary aspect-square rounded-xl size-12 flex items-center justify-center shadow-lg shadow-primary/30 mb-6 transform hover:scale-105 transition-transform duration-300">
              <PencilLine className="text-primary-foreground w-7 h-7" />
            </div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight">
              Welcome Back
            </h1>
            <p className="text-muted-foreground mt-2 text-sm font-medium">
              Please enter your details to login
            </p>
          </div>
          <form className="space-y-5" onSubmit={handleLogin}>
            <div className="space-y-1.5">
              <Label className="ml-1" htmlFor="email">
                Email Address
              </Label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="text-muted-foreground w-5 h-5 group-focus-within:text-primary transition-colors" />
                </div>
                <Input
                  className="pl-11 pr-4 py-3.5 rounded-xl font-medium"
                  id="email"
                  name="email"
                  placeholder="name@company.com"
                  required
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label className="ml-1" htmlFor="password">
                  Password
                </Label>
                <a
                  className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors hover:underline"
                  href="#"
                >
                  Forgot Password?
                </a>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="text-muted-foreground w-5 h-5 group-focus-within:text-primary transition-colors" />
                </div>
                <Input
                  className="pl-11 pr-11 py-3.5 rounded-xl font-medium"
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  required
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                />
                <button
                  type="button"
                  tabIndex={-1}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-muted-foreground hover:text-primary focus:outline-none"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  disabled={loading}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
            <Button
              className="w-full py-3.5 px-4 rounded-xl font-bold mt-6"
              type="submit"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-sm font-medium text-muted-foreground">
              Don't have an account?{" "}
              <Link
                className="text-primary hover:text-primary/80 font-bold transition-colors hover:underline"
                to="/signup"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </Card>
        <div className="text-center mt-8">
          <p className="text-xs text-muted-foreground font-medium">
            © 2026 QuikNote Inc.
            <a
              className="hover:text-foreground ml-2 transition-colors"
              href="#"
            >
              Privacy
            </a>
            <span className="mx-1">·</span>
            <a className="hover:text-foreground transition-colors" href="#">
              Terms
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
