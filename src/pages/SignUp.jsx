import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { User, Mail, Lock, Shield, Eye, EyeOff, Camera } from "lucide-react";
import { useAuth } from "@/context/authContext";
import { authService } from "@/appwrite/auth";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [profileImagePreview, setProfileImagePreview] = useState(null);
  const navigate = useNavigate();
  const { registerUser, loading, checkAuthStatus } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5MB");
      return;
    }

    setProfileImage(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirm_password) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      await registerUser({
        name: form.name,
        email: form.email,
        password: form.password,
      });

      // Upload profile image if provided
      if (profileImage) {
        try {
          const uploaded = await authService.uploadProfileImage(profileImage);
          await authService.updatePreferences({
            profileImageId: uploaded.$id,
            username: "",
            phone: "",
            fullName: form.name,
          });
          checkAuthStatus?.();
        } catch (error) {
          console.error("Failed to upload profile image:", error);
          // Don't block signup if image upload fails
        }
      }

      toast.success("Account created successfully!");
      setForm({ name: "", email: "", password: "", confirm_password: "" });
      setProfileImage(null);
      setProfileImagePreview(null);
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.message || "Failed to register. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background text-foreground font-sans">
      <div className="w-full max-w-105">
        <div className="bg-card rounded-xl shadow-xl shadow-border/10 p-8 sm:p-10 border border-border">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="bg-primary aspect-square rounded-xl size-12 flex items-center justify-center shadow-lg shadow-primary/30 mb-6 transform hover:scale-105 transition-transform duration-300">
              <User className="text-primary-foreground w-7 h-7" />
            </div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight">
              Create Your Account
            </h1>
            <p className="text-muted-foreground mt-2 text-sm font-medium">
              Start organizing your thoughts with QuikNote
            </p>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="flex flex-col items-center mb-2">
              <div className="relative group">
                {profileImagePreview ? (
                  <div className="size-24 rounded-full border-4 border-slate-200 dark:border-slate-700 shadow-md overflow-hidden">
                    <img
                      src={profileImagePreview}
                      alt="Profile preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="size-24 rounded-full bg-gradient-to-br from-primary to-purple-600 border-4 border-slate-200 dark:border-slate-700 shadow-md flex items-center justify-center">
                    <User className="text-white w-12 h-12" />
                  </div>
                )}
                <label
                  htmlFor="signup-image-upload"
                  className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full shadow-lg hover:scale-110 transition-transform cursor-pointer"
                >
                  <Camera size={16} />
                </label>
                <input
                  id="signup-image-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                  disabled={loading}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Optional profile picture
              </p>
            </div>
            <div className="space-y-1.5">
              <Label className="ml-1" htmlFor="name">
                Name
              </Label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="text-muted-foreground w-5 h-5 group-focus-within:text-primary transition-colors" />
                </div>
                <Input
                  className="pl-11 pr-4 py-3.5 rounded-xl font-medium"
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  required
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>
            </div>
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
                  value={form.email}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="ml-1" htmlFor="password">
                Password
              </Label>
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
                  value={form.password}
                  onChange={handleChange}
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
            <div className="space-y-1.5">
              <Label className="ml-1" htmlFor="confirm_password">
                Confirm Password
              </Label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Shield className="text-muted-foreground w-5 h-5 group-focus-within:text-primary transition-colors" />
                </div>
                <Input
                  className="pl-11 pr-11 py-3.5 rounded-xl font-medium"
                  id="confirm_password"
                  name="confirm_password"
                  placeholder="••••••••"
                  required
                  type={showConfirmPassword ? "text" : "password"}
                  value={form.confirm_password}
                  onChange={handleChange}
                  disabled={loading}
                />
                <button
                  type="button"
                  tabIndex={-1}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-muted-foreground hover:text-primary focus:outline-none"
                  onClick={() => setShowConfirmPassword((v) => !v)}
                  aria-label={
                    showConfirmPassword ? "Hide password" : "Show password"
                  }
                  disabled={loading}
                >
                  {showConfirmPassword ? (
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
              {loading ? "Signing up..." : "Sign Up"}
            </Button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-sm font-medium text-muted-foreground">
              Already have an account?{" "}
              <Link
                className="text-primary hover:text-primary/80 font-bold transition-colors hover:underline"
                to="/login"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
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
}

export default Signup;
