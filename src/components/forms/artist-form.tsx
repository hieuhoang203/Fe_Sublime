"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
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
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Mic, Mail, Phone, MapPin, Users, Music, Calendar } from "lucide-react";

interface ArtistFormData {
  id?: string;
  name: string;
  email: string;
  phone: string;
  status: "active" | "inactive";
  avatar?: string;
  bio?: string;
  location?: string;
  genre?: string;
  followers?: number;
  totalSongs?: number;
  joinDate?: string;
  socialLinks?: {
    instagram?: string;
    twitter?: string;
    youtube?: string;
    spotify?: string;
  };
}

interface ArtistFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: ArtistFormData) => void;
  initialData?: Partial<ArtistFormData>;
  loading?: boolean;
}

const statusOptions = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
];

const genreOptions = [
  { value: "pop", label: "Pop" },
  { value: "rock", label: "Rock" },
  { value: "hip-hop", label: "Hip Hop" },
  { value: "electronic", label: "Electronic" },
  { value: "jazz", label: "Jazz" },
  { value: "classical", label: "Classical" },
  { value: "country", label: "Country" },
  { value: "r&b", label: "R&B" },
  { value: "other", label: "Other" },
];

export function ArtistForm({
  open,
  onOpenChange,
  onSubmit,
  initialData,
  loading = false,
}: ArtistFormProps) {
  const [formData, setFormData] = React.useState<ArtistFormData>({
    name: "",
    email: "",
    phone: "",
    status: "active",
    bio: "",
    location: "",
    genre: "",
    followers: 0,
    totalSongs: 0,
    socialLinks: {
      instagram: "",
      twitter: "",
      youtube: "",
      spotify: "",
    },
    ...initialData,
  });

  const [errors, setErrors] = React.useState<Partial<ArtistFormData>>({});
  const [avatarFile, setAvatarFile] = React.useState<File | null>(null);

  React.useEffect(() => {
    if (initialData) {
      setFormData({ ...formData, ...initialData });
    }
  }, [initialData]);

  const validateForm = (): boolean => {
    const newErrors: Partial<ArtistFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Artist name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required";
    }

    if (!formData.genre) {
      newErrors.genre = "Genre is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      onSubmit({
        ...formData,
        avatar: avatarFile ? URL.createObjectURL(avatarFile) : formData.avatar,
      });
    }
  };

  const handleInputChange = (
    field: keyof ArtistFormData,
    value: string | number
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSocialLinkChange = (
    platform: "instagram" | "twitter" | "youtube" | "spotify",
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [platform]: value,
      },
    }));
  };

  const handleAvatarChange = (file: File | null) => {
    setAvatarFile(file);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-spotify-green to-spotify-green-hover rounded-full flex items-center justify-center">
              <Mic className="h-5 w-5 text-black" />
            </div>
            {initialData?.id ? "Edit Artist" : "Add New Artist"}
          </DialogTitle>
          <DialogDescription>
            {initialData?.id
              ? "Update artist information and details"
              : "Create a new artist profile with music and social information"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 p-6 pt-0">
          {/* Avatar Section */}
          <div className="flex items-center gap-6">
            <Avatar className="h-20 w-20">
              <AvatarImage src={formData.avatar} alt={formData.name} />
              <AvatarFallback>
                {formData.name.charAt(0).toUpperCase() || "A"}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <FormField label="Profile Picture">
                <FormFileUpload
                  accept="image/*"
                  onChange={handleAvatarChange}
                />
              </FormField>
            </div>
          </div>

          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Artist Name" required error={errors.name}>
              <FormInput
                placeholder="Enter artist name"
                value={formData.name}
                onChange={(value) => handleInputChange("name", value)}
              />
            </FormField>

            <FormField label="Email Address" required error={errors.email}>
              <FormInput
                type="email"
                placeholder="Enter email address"
                value={formData.email}
                onChange={(value) => handleInputChange("email", value)}
              />
            </FormField>

            <FormField label="Phone Number" required error={errors.phone}>
              <FormInput
                type="tel"
                placeholder="Enter phone number"
                value={formData.phone}
                onChange={(value) => handleInputChange("phone", value)}
              />
            </FormField>

            <FormField label="Location">
              <FormInput
                placeholder="Enter location"
                value={formData.location || ""}
                onChange={(value) => handleInputChange("location", value)}
              />
            </FormField>

            <FormField label="Genre" required error={errors.genre}>
              <FormSelect
                value={formData.genre || ""}
                onChange={(value) => handleInputChange("genre", value)}
                options={genreOptions}
                placeholder="Select genre"
              />
            </FormField>

            <FormField label="Status" required>
              <FormSelect
                value={formData.status}
                onChange={(value) =>
                  handleInputChange("status", value as "active" | "inactive")
                }
                options={statusOptions}
                placeholder="Select status"
              />
            </FormField>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Followers">
              <FormInput
                type="number"
                placeholder="Enter follower count"
                value={formData.followers?.toString() || ""}
                onChange={(value) =>
                  handleInputChange("followers", parseInt(value) || 0)
                }
              />
            </FormField>

            <FormField label="Total Songs">
              <FormInput
                type="number"
                placeholder="Enter total songs"
                value={formData.totalSongs?.toString() || ""}
                onChange={(value) =>
                  handleInputChange("totalSongs", parseInt(value) || 0)
                }
              />
            </FormField>
          </div>

          {/* Bio */}
          <FormField label="Bio">
            <FormTextarea
              placeholder="Tell us about this artist..."
              value={formData.bio || ""}
              onChange={(value) => handleInputChange("bio", value)}
              rows={3}
            />
          </FormField>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Social Links</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField label="Instagram">
                <FormInput
                  placeholder="https://instagram.com/username"
                  value={formData.socialLinks?.instagram || ""}
                  onChange={(value) =>
                    handleSocialLinkChange("instagram", value)
                  }
                />
              </FormField>

              <FormField label="Twitter">
                <FormInput
                  placeholder="https://twitter.com/username"
                  value={formData.socialLinks?.twitter || ""}
                  onChange={(value) => handleSocialLinkChange("twitter", value)}
                />
              </FormField>

              <FormField label="YouTube">
                <FormInput
                  placeholder="https://youtube.com/channel/..."
                  value={formData.socialLinks?.youtube || ""}
                  onChange={(value) => handleSocialLinkChange("youtube", value)}
                />
              </FormField>

              <FormField label="Spotify">
                <FormInput
                  placeholder="https://open.spotify.com/artist/..."
                  value={formData.socialLinks?.spotify || ""}
                  onChange={(value) => handleSocialLinkChange("spotify", value)}
                />
              </FormField>
            </div>
          </div>

          {/* Join Date (if editing) */}
          {initialData?.joinDate && (
            <div className="flex items-center gap-2 text-sm text-spotify-text-gray">
              <Calendar className="h-4 w-4" />
              <span>
                Joined: {new Date(initialData.joinDate).toLocaleDateString()}
              </span>
            </div>
          )}

          <DialogFooter>
            <Button
              type="button"
              variant="ghost"
              onClick={() => onOpenChange(false)}
              className="text-spotify-text-gray hover:text-white"
            >
              Cancel
            </Button>
            <FormSubmit loading={loading}>
              {initialData?.id ? "Update Artist" : "Create Artist"}
            </FormSubmit>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
