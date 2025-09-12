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
import { Album, Music, Calendar, User, MapPin, Clock } from "lucide-react";

interface AlbumFormData {
  id?: string;
  title: string;
  artist: string;
  artistId?: string;
  releaseDate: string;
  genre: string;
  description?: string;
  coverImage?: string;
  totalTracks?: number;
  duration?: string;
  status: "draft" | "published" | "archived";
  label?: string;
  copyright?: string;
  language?: string;
  explicit?: boolean;
  tags?: string[];
}

interface AlbumFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: AlbumFormData) => void;
  initialData?: Partial<AlbumFormData>;
  loading?: boolean;
}

const statusOptions = [
  { value: "draft", label: "Draft" },
  { value: "published", label: "Published" },
  { value: "archived", label: "Archived" },
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
  { value: "blues", label: "Blues" },
  { value: "folk", label: "Folk" },
  { value: "reggae", label: "Reggae" },
  { value: "other", label: "Other" },
];

const languageOptions = [
  { value: "en", label: "English" },
  { value: "es", label: "Spanish" },
  { value: "fr", label: "French" },
  { value: "de", label: "German" },
  { value: "it", label: "Italian" },
  { value: "pt", label: "Portuguese" },
  { value: "ru", label: "Russian" },
  { value: "ja", label: "Japanese" },
  { value: "ko", label: "Korean" },
  { value: "zh", label: "Chinese" },
  { value: "other", label: "Other" },
];

export function AlbumForm({
  open,
  onOpenChange,
  onSubmit,
  initialData,
  loading = false,
}: AlbumFormProps) {
  const [formData, setFormData] = React.useState<AlbumFormData>({
    title: "",
    artist: "",
    releaseDate: "",
    genre: "",
    description: "",
    totalTracks: 0,
    duration: "",
    status: "draft",
    label: "",
    copyright: "",
    language: "en",
    explicit: false,
    tags: [],
    ...initialData,
  });

  const [errors, setErrors] = React.useState<Partial<AlbumFormData>>({});
  const [coverFile, setCoverFile] = React.useState<File | null>(null);
  const [tagInput, setTagInput] = React.useState("");

  React.useEffect(() => {
    if (initialData) {
      setFormData({ ...formData, ...initialData });
    }
  }, [initialData]);

  const validateForm = (): boolean => {
    const newErrors: Partial<AlbumFormData> = {};

    if (!formData.title.trim()) {
      newErrors.title = "Album title is required";
    }

    if (!formData.artist.trim()) {
      newErrors.artist = "Artist name is required";
    }

    if (!formData.releaseDate) {
      newErrors.releaseDate = "Release date is required";
    }

    if (!formData.genre) {
      newErrors.genre = "Genre is required";
    }

    if (formData.totalTracks && formData.totalTracks < 1) {
      newErrors.totalTracks = "Total tracks must be at least 1" as any;
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
    field: keyof AlbumFormData,
    value: string | number | boolean
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value as any }));
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
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-spotify-green to-spotify-green-hover rounded-full flex items-center justify-center">
              <Album className="h-5 w-5 text-black" />
            </div>
            {initialData?.id ? "Edit Album" : "Add New Album"}
          </DialogTitle>
          <DialogDescription>
            {initialData?.id
              ? "Update album information and details"
              : "Create a new album with tracks and metadata"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 p-6 pt-0">
          {/* Cover Image Section - Compact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <Album className="h-5 w-5" />
              Album Cover
            </h3>
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-spotify-light-gray rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
                {formData.coverImage ? (
                  <img
                    src={formData.coverImage}
                    alt="Album cover"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Album className="h-8 w-8 text-spotify-text-gray" />
                )}
              </div>
              <div className="flex-1">
                <FormField label="Upload Cover Image">
                  <FormFileUpload accept="image/*" onChange={handleCoverChange}>
                    <div className="p-4 border-2 border-dashed border-spotify-light-gray rounded-lg text-center">
                      <Album className="h-6 w-6 text-spotify-text-gray mx-auto mb-2" />
                      <p className="text-sm text-spotify-text-gray">
                        Click to upload cover art
                      </p>
                    </div>
                  </FormFileUpload>
                </FormField>
              </div>
            </div>
          </div>

          {/* Basic Information - 3 columns */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <Music className="h-5 w-5" />
              Album Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField label="Album Title" required error={errors.title}>
                <FormInput
                  placeholder="Enter album title"
                  value={formData.title}
                  onChange={(value) => handleInputChange("title", value)}
                />
              </FormField>

              <FormField label="Artist" required error={errors.artist}>
                <FormInput
                  placeholder="Enter artist name"
                  value={formData.artist}
                  onChange={(value) => handleInputChange("artist", value)}
                />
              </FormField>

              <FormField label="Genre" required error={errors.genre}>
                <FormSelect
                  value={formData.genre}
                  onChange={(value) => handleInputChange("genre", value)}
                  options={genreOptions}
                  placeholder="Select genre"
                />
              </FormField>

              <FormField
                label="Release Date"
                required
                error={errors.releaseDate}
              >
                <input
                  type="date"
                  value={formData.releaseDate}
                  onChange={(e) =>
                    handleInputChange("releaseDate", e.target.value)
                  }
                  className="enhanced-date-picker w-full"
                />
              </FormField>

              <FormField label="Total Tracks" error={errors.totalTracks as any}>
                <FormInput
                  type="number"
                  placeholder="Number of tracks"
                  value={formData.totalTracks?.toString() || ""}
                  onChange={(value) =>
                    handleInputChange("totalTracks", parseInt(value) || 0)
                  }
                />
              </FormField>

              <FormField label="Duration">
                <FormInput
                  placeholder="e.g., 45:30"
                  value={formData.duration || ""}
                  onChange={(value) => handleInputChange("duration", value)}
                />
              </FormField>
            </div>
          </div>

          {/* Additional Details - 2 columns */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Additional Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField label="Record Label">
                <FormInput
                  placeholder="Enter record label"
                  value={formData.label || ""}
                  onChange={(value) => handleInputChange("label", value)}
                />
              </FormField>

              <FormField label="Language">
                <FormSelect
                  value={formData.language || "en"}
                  onChange={(value) => handleInputChange("language", value)}
                  options={languageOptions}
                  placeholder="Select language"
                />
              </FormField>

              <FormField label="Status" required>
                <FormSelect
                  value={formData.status}
                  onChange={(value) =>
                    handleInputChange(
                      "status",
                      value as "draft" | "published" | "archived"
                    )
                  }
                  options={statusOptions}
                  placeholder="Select status"
                />
              </FormField>

              <FormField label="Copyright">
                <FormInput
                  placeholder="© 2024 Record Label"
                  value={formData.copyright || ""}
                  onChange={(value) => handleInputChange("copyright", value)}
                />
              </FormField>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <Music className="h-5 w-5" />
              Description
            </h3>
            <FormField label="Album Description">
              <FormTextarea
                placeholder="Describe this album..."
                value={formData.description || ""}
                onChange={(value) => handleInputChange("description", value)}
                rows={3}
              />
            </FormField>
          </div>

          {/* Tags and Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <Music className="h-5 w-5" />
              Tags & Settings
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="explicit"
                    checked={formData.explicit || false}
                    onChange={(e) =>
                      handleInputChange("explicit", e.target.checked)
                    }
                    className="w-4 h-4 text-spotify-green bg-spotify-light-gray border-spotify-light-gray rounded focus:ring-spotify-green focus:ring-2 focus:ring-spotify-green/20"
                  />
                  <label htmlFor="explicit" className="text-sm text-white">
                    Contains explicit content
                  </label>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="sticky bottom-0 bg-spotify-gray border-t border-spotify-light-gray pt-4">
            <Button
              type="button"
              variant="ghost"
              onClick={() => onOpenChange(false)}
              className="text-spotify-text-gray hover:text-white"
            >
              Cancel
            </Button>
            <FormSubmit loading={loading}>
              {initialData?.id ? "Update Album" : "Create Album"}
            </FormSubmit>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
