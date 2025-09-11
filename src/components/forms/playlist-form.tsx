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
import { Music, Play, Users, Lock, Globe, Image } from "lucide-react";

interface PlaylistFormData {
  id?: string;
  name: string;
  description?: string;
  coverImage?: string;
  isPublic: boolean;
  isCollaborative: boolean;
  tags?: string[];
}

interface PlaylistFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: PlaylistFormData) => void;
  initialData?: Partial<PlaylistFormData>;
  loading?: boolean;
}

const privacyOptions = [
  { value: "public", label: "Public", icon: Globe },
  { value: "private", label: "Private", icon: Lock },
];

export function PlaylistForm({
  open,
  onOpenChange,
  onSubmit,
  initialData,
  loading = false,
}: PlaylistFormProps) {
  const [formData, setFormData] = React.useState<PlaylistFormData>({
    name: "",
    description: "",
    isPublic: true,
    isCollaborative: false,
    tags: [],
    ...initialData,
  });

  const [errors, setErrors] = React.useState<Partial<PlaylistFormData>>({});
  const [coverFile, setCoverFile] = React.useState<File | null>(null);
  const [tagInput, setTagInput] = React.useState("");

  React.useEffect(() => {
    if (initialData) {
      setFormData({ ...formData, ...initialData });
    }
  }, [initialData]);

  const validateForm = (): boolean => {
    const newErrors: Partial<PlaylistFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Playlist name is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      onSubmit({
        ...formData,
        coverImage: coverFile
          ? URL.createObjectURL(coverFile)
          : formData.coverImage,
      });
    }
  };

  const handleInputChange = (
    field: keyof PlaylistFormData,
    value: string | boolean
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleCoverChange = (file: File | null) => {
    setCoverFile(file);
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags?.includes(tagInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...(prev.tags || []), tagInput.trim()],
      }));
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags?.filter((tag) => tag !== tagToRemove) || [],
    }));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-spotify-green to-spotify-green-hover rounded-full flex items-center justify-center">
              <Music className="h-5 w-5 text-black" />
            </div>
            {initialData?.id ? "Edit Playlist" : "Create New Playlist"}
          </DialogTitle>
          <DialogDescription>
            {initialData?.id
              ? "Update your playlist information and settings"
              : "Create a new playlist to organize your favorite songs"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 p-6 pt-0">
          {/* Cover Image Section */}
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 bg-spotify-light-gray rounded-lg flex items-center justify-center overflow-hidden">
              {formData.coverImage ? (
                <img
                  src={formData.coverImage}
                  alt="Playlist cover"
                  className="w-full h-full object-cover"
                />
              ) : (
                <Music className="h-8 w-8 text-spotify-text-gray" />
              )}
            </div>
            <div className="flex-1">
              <FormField label="Playlist Cover">
                <FormFileUpload accept="image/*" onChange={handleCoverChange}>
                  <div className="flex items-center gap-2 text-spotify-text-gray">
                    <Image className="h-4 w-4" />
                    <span className="text-sm">Upload cover image</span>
                  </div>
                </FormFileUpload>
              </FormField>
            </div>
          </div>

          {/* Basic Information */}
          <div className="space-y-4">
            <FormField label="Playlist Name" required error={errors.name}>
              <FormInput
                placeholder="Enter playlist name"
                value={formData.name}
                onChange={(value) => handleInputChange("name", value)}
              />
            </FormField>

            <FormField label="Description">
              <FormTextarea
                placeholder="Describe your playlist..."
                value={formData.description || ""}
                onChange={(value) => handleInputChange("description", value)}
                rows={3}
              />
            </FormField>
          </div>

          {/* Privacy Settings */}
          <div className="space-y-4">
            <h4 className="text-white font-medium">Privacy Settings</h4>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-spotify-light-gray/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Globe className="h-5 w-5 text-spotify-text-gray" />
                  <div>
                    <p className="text-white font-medium">Make Public</p>
                    <p className="text-spotify-text-gray text-sm">
                      Anyone can find and play this playlist
                    </p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={formData.isPublic}
                  onChange={(e) =>
                    handleInputChange("isPublic", e.target.checked)
                  }
                  className="w-4 h-4 text-spotify-green bg-spotify-light-gray border-spotify-light-gray rounded focus:ring-spotify-green focus:ring-2"
                />
              </div>

              <div className="flex items-center justify-between p-3 bg-spotify-light-gray/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-spotify-text-gray" />
                  <div>
                    <p className="text-white font-medium">Collaborative</p>
                    <p className="text-spotify-text-gray text-sm">
                      Let others add songs to this playlist
                    </p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={formData.isCollaborative}
                  onChange={(e) =>
                    handleInputChange("isCollaborative", e.target.checked)
                  }
                  className="w-4 h-4 text-spotify-green bg-spotify-light-gray border-spotify-light-gray rounded focus:ring-spotify-green focus:ring-2"
                />
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-4">
            <FormField label="Tags">
              <div className="space-y-2">
                <div className="flex gap-2">
                  <input
                    placeholder="Add a tag..."
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex w-full rounded-md border border-spotify-light-gray bg-spotify-light-gray px-3 py-2 text-sm text-white placeholder:text-spotify-text-gray focus:border-spotify-green focus:ring-2 focus:ring-spotify-green/20 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                  />
                  <Button
                    type="button"
                    variant="spotifySecondary"
                    onClick={handleAddTag}
                    disabled={!tagInput.trim()}
                  >
                    Add
                  </Button>
                </div>
                {formData.tags && formData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-spotify-light-gray text-white text-sm rounded-full flex items-center gap-1"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(tag)}
                          className="ml-1 text-spotify-text-gray hover:text-white"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </FormField>
          </div>

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
              {initialData?.id ? "Update Playlist" : "Create Playlist"}
            </FormSubmit>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
