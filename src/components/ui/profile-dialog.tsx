"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  FormField,
  FormInput,
  FormTextarea,
  FormSelect,
  FormFileUpload,
  FormSubmit,
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

interface ProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userProfile: UserProfile;
  onSave: (updatedProfile: UserProfile) => void;
  loading?: boolean;
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

export function ProfileDialog({
  open,
  onOpenChange,
  userProfile,
  onSave,
  loading = false,
}: ProfileDialogProps) {
  const [isEditing, setIsEditing] = React.useState(false);
  const [formData, setFormData] = React.useState<UserProfile>(userProfile);
  const [errors, setErrors] = React.useState<Partial<UserProfile>>({});
  const [avatarFile, setAvatarFile] = React.useState<File | null>(null);
  const [coverFile, setCoverFile] = React.useState<File | null>(null);

  React.useEffect(() => {
    setFormData(userProfile);
  }, [userProfile]);

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

  const handleSave = () => {
    if (validateForm()) {
      onSave({
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

  const getUserIcon = () => {
    switch (formData.userType) {
      case "admin":
        return <Users className="h-6 w-6" />;
      case "artist":
        return <Mic className="h-6 w-6" />;
      default:
        return <User className="h-6 w-6" />;
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
        return "text-red-400";
      case "artist":
        return "text-green-400";
      default:
        return "text-blue-400";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-spotify-green to-spotify-green-hover rounded-full flex items-center justify-center">
              {getUserIcon()}
            </div>
            User Profile
          </DialogTitle>
          <DialogDescription>
            View and edit your profile information
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 p-6 pt-0">
          {/* Cover Image and Avatar */}
          <div className="relative">
            {/* Cover Image */}
            <div className="h-32 bg-gradient-to-r from-spotify-gray to-spotify-light-gray rounded-lg relative overflow-hidden">
              {formData.coverImage ? (
                <img
                  src={formData.coverImage}
                  alt="Cover"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-r from-spotify-green/20 to-spotify-green-hover/20 flex items-center justify-center">
                  <Camera className="h-8 w-8 text-spotify-green/50" />
                </div>
              )}

              {isEditing && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <FormFileUpload accept="image/*" onChange={setCoverFile}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="bg-white/20 hover:bg-white/30 text-white"
                    >
                      <Camera className="h-4 w-4 mr-2" />
                      Change Cover
                    </Button>
                  </FormFileUpload>
                </div>
              )}
            </div>

            {/* Avatar */}
            <div className="absolute -bottom-8 left-6">
              <div className="relative">
                <Avatar className="w-20 h-20 border-4 border-spotify-black">
                  <AvatarImage src={formData.avatar} />
                  <AvatarFallback className="bg-gradient-to-br from-spotify-green to-spotify-green-hover text-black text-xl font-bold">
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

            {/* Edit Button */}
            <div className="absolute top-4 right-4">
              {!isEditing ? (
                <Button
                  variant="spotifySecondary"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                  className="bg-white/10 hover:bg-white/20 text-white border-white/20"
                >
                  <Edit3 className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCancel}
                    className="bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                  <Button
                    variant="spotify"
                    size="sm"
                    onClick={handleSave}
                    loading={loading}
                    className="bg-spotify-green hover:bg-spotify-green-hover text-black"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Profile Info */}
          <div className="mt-12 space-y-6">
            {/* Basic Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <User className="h-5 w-5" />
                Basic Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField label="Full Name" required error={errors.name}>
                  <FormInput
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(value) => handleInputChange("name", value)}
                    disabled={!isEditing}
                  />
                </FormField>

                <FormField label="Email" required error={errors.email}>
                  <FormInput
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(value) => handleInputChange("email", value)}
                    disabled={!isEditing}
                    type="email"
                  />
                </FormField>

                <FormField label="Phone">
                  <FormInput
                    placeholder="Enter your phone number"
                    value={formData.phone || ""}
                    onChange={(value) => handleInputChange("phone", value)}
                    disabled={!isEditing}
                    type="tel"
                  />
                </FormField>

                <FormField label="Location">
                  <FormInput
                    placeholder="Enter your location"
                    value={formData.location || ""}
                    onChange={(value) => handleInputChange("location", value)}
                    disabled={!isEditing}
                  />
                </FormField>
              </div>

              <FormField label="Bio">
                <FormTextarea
                  placeholder="Tell us about yourself..."
                  value={formData.bio || ""}
                  onChange={(value) => handleInputChange("bio", value)}
                  disabled={!isEditing}
                  rows={3}
                />
              </FormField>
            </div>

            {/* User Type Specific Info */}
            {formData.userType === "artist" && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Mic className="h-5 w-5" />
                  Artist Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    label="Artist Name"
                    required
                    error={errors.artistName}
                  >
                    <FormInput
                      placeholder="Enter your artist name"
                      value={formData.artistName || ""}
                      onChange={(value) =>
                        handleInputChange("artistName", value)
                      }
                      disabled={!isEditing}
                    />
                  </FormField>

                  <FormField label="Genre">
                    <FormSelect
                      value={formData.genre || ""}
                      onChange={(value) => handleInputChange("genre", value)}
                      options={genreOptions}
                      placeholder="Select your genre"
                      disabled={!isEditing}
                    />
                  </FormField>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-spotify-light-gray/50 rounded-lg">
                    <div className="flex items-center gap-2 text-spotify-text-gray text-sm mb-1">
                      <Users className="h-4 w-4" />
                      Followers
                    </div>
                    <div className="text-2xl font-bold text-white">
                      {formData.followers?.toLocaleString() || "0"}
                    </div>
                  </div>

                  <div className="p-4 bg-spotify-light-gray/50 rounded-lg">
                    <div className="flex items-center gap-2 text-spotify-text-gray text-sm mb-1">
                      <Music className="h-4 w-4" />
                      Total Plays
                    </div>
                    <div className="text-2xl font-bold text-white">
                      {formData.totalPlays?.toLocaleString() || "0"}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {formData.userType === "admin" && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Admin Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField label="Role">
                    <FormSelect
                      value={formData.role || ""}
                      onChange={(value) => handleInputChange("role", value)}
                      options={roleOptions}
                      placeholder="Select your role"
                      disabled={!isEditing}
                    />
                  </FormField>

                  <div className="p-4 bg-spotify-light-gray/50 rounded-lg">
                    <div className="flex items-center gap-2 text-spotify-text-gray text-sm mb-1">
                      <Calendar className="h-4 w-4" />
                      Join Date
                    </div>
                    <div className="text-lg font-semibold text-white">
                      {new Date(formData.joinDate).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Account Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Account Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-spotify-light-gray/50 rounded-lg">
                  <div className="flex items-center gap-2 text-spotify-text-gray text-sm mb-1">
                    <div
                      className={cn("h-4 w-4 rounded-full", getUserTypeColor())}
                    />
                    User Type
                  </div>
                  <div className="text-lg font-semibold text-white">
                    {getUserTypeLabel()}
                  </div>
                </div>

                <div className="p-4 bg-spotify-light-gray/50 rounded-lg">
                  <div className="flex items-center gap-2 text-spotify-text-gray text-sm mb-1">
                    <Calendar className="h-4 w-4" />
                    Member Since
                  </div>
                  <div className="text-lg font-semibold text-white">
                    {new Date(formData.joinDate).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
