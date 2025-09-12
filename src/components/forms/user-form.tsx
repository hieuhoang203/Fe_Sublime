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
import { User, Mail, Phone, Calendar, MapPin, Shield } from "lucide-react";

interface UserFormData {
  id?: string;
  name: string;
  email: string;
  phone: string;
  role: "admin" | "artist" | "user";
  status: "active" | "inactive";
  avatar?: string;
  bio?: string;
  location?: string;
  joinDate?: string;
}

interface UserFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: UserFormData) => void;
  initialData?: Partial<UserFormData>;
  loading?: boolean;
}

const roleOptions = [
  { value: "admin", label: "Admin" },
  { value: "artist", label: "Artist" },
  { value: "user", label: "User" },
];

const statusOptions = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
];

export function UserForm({
  open,
  onOpenChange,
  onSubmit,
  initialData,
  loading = false,
}: UserFormProps) {
  const [formData, setFormData] = React.useState<UserFormData>({
    name: "",
    email: "",
    phone: "",
    role: "user",
    status: "active",
    bio: "",
    location: "",
    ...initialData,
  });

  const [errors, setErrors] = React.useState<Partial<UserFormData>>({});
  const [avatarFile, setAvatarFile] = React.useState<File | null>(null);

  React.useEffect(() => {
    if (initialData) {
      setFormData({ ...formData, ...initialData });
    }
  }, [initialData]);

  const validateForm = (): boolean => {
    const newErrors: Partial<UserFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required";
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

  const handleInputChange = (field: keyof UserFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleAvatarChange = (file: File | null) => {
    setAvatarFile(file);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-spotify-green to-spotify-green-hover rounded-full flex items-center justify-center">
              <User className="h-5 w-5 text-black" />
            </div>
            {initialData?.id ? "Edit User" : "Add New User"}
          </DialogTitle>
          <DialogDescription>
            {initialData?.id
              ? "Update user information and permissions"
              : "Create a new user account with role and permissions"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 p-6 pt-0">
          {/* Avatar Section */}
          <div className="flex items-center gap-6">
            <Avatar className="h-20 w-20">
              <AvatarImage src={formData.avatar} alt={formData.name} />
              <AvatarFallback className="bg-spotify-light-gray text-spotify-green font-semibold text-xl">
                {formData.name.charAt(0).toUpperCase() || "U"}
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
            <FormField label="Full Name" required error={errors.name}>
              <FormInput
                placeholder="Enter full name"
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
          </div>

          {/* Role and Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Role" required>
              <FormSelect
                value={formData.role}
                onChange={(value) =>
                  handleInputChange(
                    "role",
                    value as "admin" | "artist" | "user"
                  )
                }
                options={roleOptions}
                placeholder="Select role"
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

          {/* Bio */}
          <FormField label="Bio">
            <FormTextarea
              placeholder="Tell us about this user..."
              value={formData.bio || ""}
              onChange={(value) => handleInputChange("bio", value)}
              rows={3}
            />
          </FormField>

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
              {initialData?.id ? "Update User" : "Create User"}
            </FormSubmit>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
