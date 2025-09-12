"use client";

import * as React from "react";
import { useState } from "react";
import {
  FormField,
  FormInput,
  FormTextarea,
  FormSelect,
  FormFileUpload,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit3,
  Save,
  X,
  Camera,
  Music,
  Mic,
  Users,
  Lock,
  Shield,
  Settings,
  Activity,
  Bell,
  Key,
  Eye,
  EyeOff,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  bio?: string;
  location?: string;
  joinDate: string;
  avatar?: string;
  coverImage?: string;
  userType: "admin" | "artist" | "user";
  // Artist specific
  artistName?: string;
  genre?: string;
  followers?: number;
  totalPlays?: number;
  // Admin specific
  role?: string;
  permissions?: string[];
}

const genreOptions = [
  { value: "pop", label: "Pop" },
  { value: "rock", label: "Rock" },
  { value: "hip-hop", label: "Hip Hop" },
  { value: "electronic", label: "Electronic" },
  { value: "jazz", label: "Jazz" },
  { value: "classical", label: "Classical" },
  { value: "country", label: "Country" },
  { value: "r&b", label: "R&B" },
  { value: "reggae", label: "Reggae" },
  { value: "blues", label: "Blues" },
  { value: "folk", label: "Folk" },
  { value: "indie", label: "Indie" },
  { value: "alternative", label: "Alternative" },
  { value: "other", label: "Other" },
];

const roleOptions = [
  { value: "super-admin", label: "Super Administrator" },
  { value: "content-admin", label: "Content Administrator" },
  { value: "user-admin", label: "User Administrator" },
  { value: "moderator", label: "Moderator" },
];

export default function AdminSettingsPage() {
  // Mock user data - replace with actual data fetching
  const [userProfile, setUserProfile] = useState<UserProfile>({
    id: "1",
    name: "Admin User",
    email: "admin@sublime.com",
    phone: "+1 234 567 8900",
    bio: "Platform administrator with full access to all features and content management.",
    location: "San Francisco, CA",
    joinDate: "2024-01-15",
    avatar: "",
    coverImage: "",
    userType: "admin",
    role: "super-admin",
    permissions: ["users", "content", "analytics", "settings"],
  });

  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [formData, setFormData] = useState<UserProfile>(userProfile);
  const [errors, setErrors] = useState<Partial<UserProfile>>({});
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);

  // Password change states
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [passwordErrors, setPasswordErrors] = useState<Record<string, string>>(
    {}
  );

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "security", label: "Security", icon: Shield },
    { id: "preferences", label: "Preferences", icon: Settings },
    { id: "activity", label: "Activity", icon: Activity },
  ];

  const validateForm = (): boolean => {
    const newErrors: Partial<UserProfile> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (formData.userType === "artist" && !formData.artistName?.trim()) {
      newErrors.artistName = "Artist name is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePassword = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!passwordData.currentPassword) {
      newErrors.currentPassword = "Current password is required";
    }

    if (!passwordData.newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (passwordData.newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters";
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setPasswordErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      setUserProfile({
        ...formData,
        avatar: avatarFile ? URL.createObjectURL(avatarFile) : formData.avatar,
        coverImage: coverFile
          ? URL.createObjectURL(coverFile)
          : formData.coverImage,
      });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setFormData(userProfile);
    setErrors({});
    setAvatarFile(null);
    setCoverFile(null);
    setIsEditing(false);
  };

  const handleInputChange = (
    field: keyof UserProfile,
    value: string | number
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handlePasswordChange = (field: string, value: string) => {
    setPasswordData((prev) => ({ ...prev, [field]: value }));
    if (passwordErrors[field]) {
      setPasswordErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handlePasswordSubmit = () => {
    if (validatePassword()) {
      console.log("Password changed successfully");
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    }
  };

  const getUserIcon = () => {
    switch (formData.userType) {
      case "admin":
        return <Users className="h-5 w-5" />;
      case "artist":
        return <Mic className="h-5 w-5" />;
      default:
        return <User className="h-5 w-5" />;
    }
  };

  const getUserTypeLabel = () => {
    switch (formData.userType) {
      case "admin":
        return "Administrator";
      case "artist":
        return "Artist";
      default:
        return "User";
    }
  };

  const getUserTypeColor = () => {
    switch (formData.userType) {
      case "admin":
        return "text-red-400 bg-red-400/10";
      case "artist":
        return "text-green-400 bg-green-400/10";
      default:
        return "text-blue-400 bg-blue-400/10";
    }
  };

  const renderProfileTab = () => (
    <div className="space-y-8">
      {/* Cover Image and Avatar Section */}
      <div className="relative">
        <div className="h-48 bg-gradient-to-r from-spotify-gray to-spotify-light-gray rounded-2xl relative overflow-hidden">
          {formData.coverImage ? (
            <img
              src={formData.coverImage}
              alt="Cover"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-spotify-green/20 to-spotify-green-hover/20 flex items-center justify-center">
              <Camera className="h-16 w-16 text-spotify-green/50" />
            </div>
          )}

          {isEditing && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
              <FormFileUpload accept="image/*" onChange={setCoverFile}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="bg-white/20 hover:bg-white/30 text-white border border-white/30"
                >
                  <Camera className="h-4 w-4 mr-2" />
                  Change Cover
                </Button>
              </FormFileUpload>
            </div>
          )}
        </div>

        <div className="absolute -bottom-16 left-8">
          <div className="relative">
            <Avatar className="w-32 h-32 border-4 border-spotify-gray shadow-2xl">
              <AvatarImage src={formData.avatar} />
              <AvatarFallback className="bg-gradient-to-br from-spotify-green to-spotify-green-hover text-black text-3xl font-bold">
                {formData.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            {isEditing && (
              <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                <FormFileUpload accept="image/*" onChange={setAvatarFile}>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 bg-white/20 hover:bg-white/30 text-white"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </FormFileUpload>
              </div>
            )}
          </div>
        </div>

        <div className="absolute -bottom-16 right-8 flex items-end gap-4">
          <div className="text-right">
            <div className="flex items-center gap-4 text-spotify-text-gray">
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Joined {new Date(formData.joinDate).toLocaleDateString()}
              </span>
              {formData.location && (
                <span className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  {formData.location}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Form Fields */}
      <div className="pt-12 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField label="Full Name" required error={errors.name}>
            {isEditing ? (
              <FormInput
                value={formData.name}
                onChange={(value) => handleInputChange("name", value)}
                placeholder="Enter full name"
              />
            ) : (
              <div className="p-4 bg-spotify-light-gray/50 rounded-lg text-white text-lg">
                {formData.name}
              </div>
            )}
          </FormField>

          <FormField label="Email Address" required error={errors.email}>
            {isEditing ? (
              <FormInput
                type="email"
                value={formData.email}
                onChange={(value) => handleInputChange("email", value)}
                placeholder="Enter email address"
              />
            ) : (
              <div className="p-4 bg-spotify-light-gray/50 rounded-lg text-white text-lg">
                {formData.email}
              </div>
            )}
          </FormField>

          <FormField label="Phone Number" error={errors.phone}>
            {isEditing ? (
              <FormInput
                type="tel"
                value={formData.phone || ""}
                onChange={(value) => handleInputChange("phone", value)}
                placeholder="Enter phone number"
              />
            ) : (
              <div className="p-4 bg-spotify-light-gray/50 rounded-lg text-white text-lg">
                {formData.phone || "Not provided"}
              </div>
            )}
          </FormField>

          <FormField label="Location" error={errors.location}>
            {isEditing ? (
              <FormInput
                value={formData.location || ""}
                onChange={(value) => handleInputChange("location", value)}
                placeholder="Enter location"
              />
            ) : (
              <div className="p-4 bg-spotify-light-gray/50 rounded-lg text-white text-lg">
                {formData.location || "Not provided"}
              </div>
            )}
          </FormField>
        </div>

        <FormField label="Bio" error={errors.bio}>
          {isEditing ? (
            <FormTextarea
              value={formData.bio || ""}
              onChange={(value) => handleInputChange("bio", value)}
              placeholder="Tell us about yourself..."
              rows={4}
            />
          ) : (
            <div className="p-4 bg-spotify-light-gray/50 rounded-lg text-white min-h-[100px] text-lg">
              {formData.bio || "No bio provided"}
            </div>
          )}
        </FormField>

        {/* Admin Specific Fields */}
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold text-white flex items-center gap-3">
            <Users className="h-6 w-6 text-spotify-green" />
            Administrator Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField label="Role" error={errors.role}>
              {isEditing ? (
                <FormSelect
                  value={formData.role || ""}
                  onChange={(value) => handleInputChange("role", value)}
                  options={roleOptions}
                  placeholder="Select role"
                />
              ) : (
                <div className="p-4 bg-spotify-light-gray/50 rounded-lg text-white text-lg">
                  {formData.role || "Not assigned"}
                </div>
              )}
            </FormField>

            <FormField label="Permissions">
              <div className="p-4 bg-spotify-light-gray/50 rounded-lg text-white text-lg">
                {formData.permissions?.join(", ") || "No permissions assigned"}
              </div>
            </FormField>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSecurityTab = () => (
    <div className="space-y-8">
      <div className="bg-spotify-light-gray/30 rounded-2xl p-8">
        <h3 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
          <Lock className="h-6 w-6 text-spotify-green" />
          Change Password
        </h3>

        <div className="space-y-6">
          <FormField
            label="Current Password"
            required
            error={passwordErrors.currentPassword}
          >
            <div className="relative">
              <FormInput
                type={showPasswords.current ? "text" : "password"}
                value={passwordData.currentPassword}
                onChange={(value) =>
                  handlePasswordChange("currentPassword", value)
                }
                placeholder="Enter current password"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 text-spotify-text-gray hover:text-white"
                onClick={() =>
                  setShowPasswords((prev) => ({
                    ...prev,
                    current: !prev.current,
                  }))
                }
              >
                {showPasswords.current ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
          </FormField>

          <FormField
            label="New Password"
            required
            error={passwordErrors.newPassword}
          >
            <div className="relative">
              <FormInput
                type={showPasswords.new ? "text" : "password"}
                value={passwordData.newPassword}
                onChange={(value) => handlePasswordChange("newPassword", value)}
                placeholder="Enter new password"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 text-spotify-text-gray hover:text-white"
                onClick={() =>
                  setShowPasswords((prev) => ({ ...prev, new: !prev.new }))
                }
              >
                {showPasswords.new ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
          </FormField>

          <FormField
            label="Confirm New Password"
            required
            error={passwordErrors.confirmPassword}
          >
            <div className="relative">
              <FormInput
                type={showPasswords.confirm ? "text" : "password"}
                value={passwordData.confirmPassword}
                onChange={(value) =>
                  handlePasswordChange("confirmPassword", value)
                }
                placeholder="Confirm new password"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 text-spotify-text-gray hover:text-white"
                onClick={() =>
                  setShowPasswords((prev) => ({
                    ...prev,
                    confirm: !prev.confirm,
                  }))
                }
              >
                {showPasswords.confirm ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
          </FormField>

          <Button
            onClick={handlePasswordSubmit}
            className="bg-spotify-green hover:bg-spotify-green-hover text-black font-semibold px-8 py-3"
          >
            <Key className="h-4 w-4 mr-2" />
            Change Password
          </Button>
        </div>
      </div>

      <div className="bg-spotify-light-gray/30 rounded-2xl p-8">
        <h3 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
          <Shield className="h-6 w-6 text-spotify-green" />
          Security Settings
        </h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-spotify-light-gray/50 rounded-lg">
            <div>
              <h4 className="text-white font-medium">
                Two-Factor Authentication
              </h4>
              <p className="text-spotify-text-gray text-sm">
                Add an extra layer of security to your account
              </p>
            </div>
            <Button variant="spotifySecondary" size="sm">
              Enable
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 bg-spotify-light-gray/50 rounded-lg">
            <div>
              <h4 className="text-white font-medium">Login Notifications</h4>
              <p className="text-spotify-text-gray text-sm">
                Get notified when someone logs into your account
              </p>
            </div>
            <Button variant="spotifySecondary" size="sm">
              Enable
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPreferencesTab = () => (
    <div className="space-y-8">
      <div className="bg-spotify-light-gray/30 rounded-2xl p-8">
        <h3 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
          <Settings className="h-6 w-6 text-spotify-green" />
          General Preferences
        </h3>

        <div className="space-y-6">
          <FormField label="Language">
            <FormSelect
              value="en"
              onChange={() => {}}
              options={[
                { value: "en", label: "English" },
                { value: "vi", label: "Tiếng Việt" },
                { value: "es", label: "Español" },
                { value: "fr", label: "Français" },
              ]}
            />
          </FormField>

          <FormField label="Theme">
            <FormSelect
              value="dark"
              onChange={() => {}}
              options={[
                { value: "dark", label: "Dark" },
                { value: "light", label: "Light" },
                { value: "auto", label: "Auto" },
              ]}
            />
          </FormField>

          <FormField label="Time Zone">
            <FormSelect
              value="UTC-8"
              onChange={() => {}}
              options={[
                { value: "UTC-8", label: "Pacific Time (UTC-8)" },
                { value: "UTC-5", label: "Eastern Time (UTC-5)" },
                { value: "UTC+0", label: "UTC" },
                { value: "UTC+7", label: "Vietnam Time (UTC+7)" },
              ]}
            />
          </FormField>
        </div>
      </div>

      <div className="bg-spotify-light-gray/30 rounded-2xl p-8">
        <h3 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
          <Bell className="h-6 w-6 text-spotify-green" />
          Notifications
        </h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-spotify-light-gray/50 rounded-lg">
            <div>
              <h4 className="text-white font-medium">Email Notifications</h4>
              <p className="text-spotify-text-gray text-sm">
                Receive updates via email
              </p>
            </div>
            <Button variant="spotifySecondary" size="sm">
              Enable
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 bg-spotify-light-gray/50 rounded-lg">
            <div>
              <h4 className="text-white font-medium">Push Notifications</h4>
              <p className="text-spotify-text-gray text-sm">
                Receive push notifications
              </p>
            </div>
            <Button variant="spotifySecondary" size="sm">
              Enable
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderActivityTab = () => (
    <div className="space-y-8">
      <div className="bg-spotify-light-gray/30 rounded-2xl p-8">
        <h3 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
          <Activity className="h-6 w-6 text-spotify-green" />
          Recent Activity
        </h3>

        <div className="space-y-4">
          <div className="p-4 bg-spotify-light-gray/50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-spotify-green rounded-full"></div>
              <div>
                <p className="text-white">Profile updated</p>
                <p className="text-spotify-text-gray text-sm">2 hours ago</p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-spotify-light-gray/50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <div>
                <p className="text-white">Password changed</p>
                <p className="text-spotify-text-gray text-sm">1 day ago</p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-spotify-light-gray/50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
              <div>
                <p className="text-white">New user created</p>
                <p className="text-spotify-text-gray text-sm">3 days ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-spotify-gray">
      <div className="max-w-6xl mx-auto p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white">Settings</h1>
            <p className="text-spotify-text-gray text-lg mt-2">
              Manage your account and system preferences
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2",
                getUserTypeColor()
              )}
            >
              {getUserIcon()}
              {getUserTypeLabel()}
            </div>

            {!isEditing ? (
              <Button
                variant="spotifySecondary"
                onClick={() => setIsEditing(true)}
                className="bg-spotify-green/20 hover:bg-spotify-green/30 text-spotify-green border-spotify-green/30"
              >
                <Edit3 className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            ) : (
              <div className="flex gap-3">
                <Button
                  variant="ghost"
                  onClick={handleCancel}
                  className="bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30"
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
                <Button
                  variant="spotify"
                  onClick={handleSave}
                  className="bg-spotify-green hover:bg-spotify-green-hover text-black"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-8 bg-spotify-light-gray/30 p-1 rounded-lg">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-2 px-6 py-3 rounded-md font-medium transition-all duration-200",
                  activeTab === tab.id
                    ? "bg-spotify-green text-black"
                    : "text-spotify-text-gray hover:text-white hover:bg-spotify-light-gray/50"
                )}
              >
                <Icon className="h-5 w-5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="bg-spotify-light-gray/20 rounded-2xl p-8">
          {activeTab === "profile" && renderProfileTab()}
          {activeTab === "security" && renderSecurityTab()}
          {activeTab === "preferences" && renderPreferencesTab()}
          {activeTab === "activity" && renderActivityTab()}
        </div>
      </div>
    </div>
  );
}
