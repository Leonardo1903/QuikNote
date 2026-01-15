import { useEffect, useState } from "react";
import { LogOut, Camera } from "lucide-react";
import { toast } from "sonner";
import Sidebar from "@/components";
import { useTheme } from "@/context/themeContext";
import { useAuth } from "@/context/authContext";
import { authService } from "@/appwrite/auth";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Profile() {
  const { theme, setTheme } = useTheme();
  const { checkAuthStatus, logoutUser } = useAuth();
  const [fullName, setFullName] = useState("Jane Doe");
  const [email, setEmail] = useState("jane.doe@quiknote.app");
  const [username, setUsername] = useState("janedoe_writer");
  const [phone, setPhone] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [originalFullName, setOriginalFullName] = useState("");
  const [originalEmail, setOriginalEmail] = useState("");
  const [originalUsername, setOriginalUsername] = useState("");
  const [originalPhone, setOriginalPhone] = useState("");
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [profileImageId, setProfileImageId] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const loadAccount = async () => {
      setLoadingProfile(true);
      try {
        const account = await authService.checkAuthStatus();
        if (!account || !isMounted) return;
        setFullName(account.name || "");
        setEmail(account.email || "");
        setUsername(account.prefs?.username || "");
        setPhone(account.prefs?.phone || "");
        setProfileImageId(account.prefs?.profileImageId || "");
        if (account.prefs?.profileImageId) {
          const imageUrl = authService.getProfileImageUrl(
            account.prefs.profileImageId
          );
          setProfileImage(imageUrl);
        }
        setOriginalFullName(account.name || "");
        setOriginalEmail(account.email || "");
        setOriginalUsername(account.prefs?.username || "");
        setOriginalPhone(account.prefs?.phone || "");
      } catch (error) {
        toast.error("Unable to load profile");
      } finally {
        if (isMounted) setLoadingProfile(false);
      }
    };

    loadAccount();
    return () => {
      isMounted = false;
    };
  }, []);

  if (loadingProfile) {
    return (
      <div className="overflow-hidden h-screen flex">
        <Sidebar activePage="profile" />
        <main className="flex-1 flex items-center justify-center h-full">
          <div className="text-sm text-slate-500">Loading profile...</div>
        </main>
      </div>
    );
  }

  const handleImageUpload = async (e) => {
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

    setUploadingImage(true);
    try {
      if (profileImageId) {
        await authService.deleteProfileImage(profileImageId);
      }

      const uploaded = await authService.uploadProfileImage(file);
      const imageUrl = authService.getProfileImageUrl(uploaded.$id);

      await authService.updatePreferences({
        profileImageId: uploaded.$id,
        username,
        phone,
        fullName,
      });

      setProfileImageId(uploaded.$id);
      setProfileImage(imageUrl + "?v=" + Date.now());
      checkAuthStatus?.();
      toast.success("Profile image updated");
    } catch (error) {
      toast.error(error?.message || "Failed to upload image");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSave = async () => {
    const hasChanges =
      fullName !== originalFullName ||
      email !== originalEmail ||
      username !== originalUsername ||
      phone !== originalPhone;

    if (!hasChanges) {
      toast.info("No changes to save");
      return;
    }

    if (email !== originalEmail && !currentPassword) {
      toast.error("Enter your current password to change email");
      return;
    }

    setSaving(true);
    try {
      const updates = [];

      if (fullName !== originalFullName) {
        updates.push(authService.updateName(fullName));
      }

      if (email !== originalEmail) {
        updates.push(authService.updateEmail(email, currentPassword));
      }

      if (
        username !== originalUsername ||
        phone !== originalPhone ||
        fullName !== originalFullName
      ) {
        updates.push(
          authService.updatePreferences({
            username,
            phone,
            fullName,
            profileImageId,
          })
        );
      }

      if (updates.length === 0) {
        toast.info("Nothing to update");
        setSaving(false);
        return;
      }

      const results = await Promise.all(updates);
      const latest = results[results.length - 1];
      const refreshed = latest || (await authService.checkAuthStatus());

      if (refreshed) {
        setOriginalFullName(refreshed.name || fullName);
        setOriginalEmail(refreshed.email || email);
        setOriginalUsername(refreshed.prefs?.username || username);
        setOriginalPhone(refreshed.prefs?.phone || phone);
        setFullName(refreshed.name || fullName);
        setEmail(refreshed.email || email);
        setUsername(refreshed.prefs?.username || username);
        setPhone(refreshed.prefs?.phone || phone);
      }

      setCurrentPassword("");
      checkAuthStatus?.();
      toast.success("Profile updated");
    } catch (error) {
      toast.error(error?.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="overflow-hidden h-screen flex">
      <Sidebar activePage="profile" />
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        <div className="flex-1 overflow-y-auto px-8 pb-10 scroll-smooth">
          <div className="max-w-4xl mx-auto space-y-8">
            <header className="px-0 py-5 flex flex-col gap-6 border-b border-border mb-6">
              <div className="flex justify-between items-center gap-6">
                <div className="flex items-center gap-3">
                  <Button
                    onClick={logoutUser}
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <LogOut size={20} />
                    <span>Logout</span>
                  </Button>
                </div>
              </div>
              <div className="flex items-end justify-between">
                <h2 className="text-3xl font-bold text-foreground tracking-tight">
                  My Profile
                </h2>
              </div>
            </header>
            <Card className="flex flex-col md:flex-row items-center gap-8 p-8">
              <div className="relative group">
                <Avatar className="h-32 w-32 border-4 border-slate-50 dark:border-slate-800 shadow-md">
                  <AvatarImage src={profileImage} alt="Profile" />
                  <AvatarFallback className="bg-gradient-to-br from-primary to-purple-600 text-white text-3xl font-bold">
                    {fullName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                <label
                  htmlFor="profile-image-upload"
                  className="absolute bottom-1 right-1 bg-primary text-white p-2 rounded-full shadow-lg hover:scale-110 transition-transform cursor-pointer"
                >
                  {uploadingImage ? (
                    <div className="w-[18px] h-[18px] border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <Camera size={18} />
                  )}
                </label>
                <input
                  id="profile-image-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                  disabled={uploadingImage}
                />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-bold text-foreground mb-1">
                  {fullName}
                </h3>
                <p className="text-muted-foreground mb-4">{email}</p>
                <div className="flex flex-wrap justify-center md:justify-start gap-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-sm font-medium">
                    Member since 2023
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-card dark:bg-card rounded-xl shadow-sm border border-border overflow-hidden">
              <div className="p-6 border-b border-border">
                <h4 className="text-lg font-bold text-foreground">
                  Personal Information
                </h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Update your personal details and contact info.
                </p>
              </div>
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password (required to change email)</Label>
                    <Input
                      id="currentPassword"
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="Enter password to update email"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <div className="flex rounded-lg overflow-hidden border border-input">
                      <span className="inline-flex items-center px-3 bg-slate-50 dark:bg-slate-800 text-slate-500 text-sm font-medium">
                        @
                      </span>
                      <Input
                        id="username"
                        className="rounded-none border-0 flex-1"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/50 flex justify-end">
                <Button
                  onClick={handleSave}
                  disabled={saving}
                >
                  {saving ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </Card>

            <Card className="overflow-hidden">
              <div className="p-6 border-b border-border">
                <h4 className="text-lg font-bold text-foreground">
                  App Preferences
                </h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Customize your experience on QuikNote.
                </p>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <Label className="mb-3 block">Theme</Label>
                  <div className="grid grid-cols-2 gap-4">
                    {["light", "dark"].map((t) => (
                      <label key={t} className="cursor-pointer group">
                        <input
                          className="peer sr-only"
                          name="theme"
                          type="radio"
                          value={t}
                          checked={theme === t}
                          onChange={(e) => setTheme(e.target.value)}
                        />
                        <div className="rounded-lg border-2 border-slate-200 peer-checked:border-primary peer-checked:ring-1 peer-checked:ring-primary p-1 hover:border-slate-300 transition-all">
                          <div
                            className={`h-20 rounded-md mb-2 flex flex-col gap-1 p-2 ${
                              t === "light" ? "bg-slate-100" : "bg-slate-900"
                            }`}
                          >
                            <div
                              className={`h-2 w-3/4 rounded-sm ${
                                t === "light"
                                  ? "bg-white shadow-sm"
                                  : "bg-slate-700"
                              }`}
                            ></div>
                            <div
                              className={`h-2 w-1/2 rounded-sm ${
                                t === "light"
                                  ? "bg-white shadow-sm"
                                  : "bg-slate-700"
                              }`}
                            ></div>
                          </div>
                          <div className="text-center text-xs font-medium text-slate-600 capitalize">
                            {t}
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
