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
  FormDatePicker,
  FormSubmit,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  Album,
  Music,
  Calendar,
  User,
  MapPin,
  Clock,
  Search,
  X,
  ChevronDown,
} from "lucide-react";

interface AlbumFormData {
  id?: string;
  title: string;
  artist: string;
  artistId?: string;
  releaseDate: string;
  genres: string[];
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
    genres: [],
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

  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [coverFile, setCoverFile] = React.useState<File | null>(null);
  const [tagInput, setTagInput] = React.useState("");
  const [showGenreDropdown, setShowGenreDropdown] = React.useState(false);
  const [genreSearchTerm, setGenreSearchTerm] = React.useState("");
  const [isGenreSelectFocused, setIsGenreSelectFocused] = React.useState(false);

  React.useEffect(() => {
    if (initialData) {
      setFormData({ ...formData, ...initialData });
    }
  }, [initialData]);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (showGenreDropdown && !target.closest(".genre-search-container")) {
        setShowGenreDropdown(false);
        setGenreSearchTerm("");
        setIsGenreSelectFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showGenreDropdown]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = "Album title is required";
    }

    if (!formData.artist.trim()) {
      newErrors.artist = "Artist name is required";
    }

    if (!formData.releaseDate) {
      newErrors.releaseDate = "Release date is required";
    }

    if (!formData.genres.length) {
      newErrors.genres = "At least one genre is required";
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
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  // Filter genres based on search term
  const filteredGenres = React.useMemo(() => {
    if (!genreSearchTerm.trim()) return genreOptions;
    return genreOptions.filter((genre) =>
      genre.label.toLowerCase().includes(genreSearchTerm.toLowerCase())
    );
  }, [genreSearchTerm]);

  const selectedGenres = genreOptions.filter((genre) =>
    formData.genres.includes(genre.value)
  );

  const handleGenreToggle = (genreValue: string) => {
    setFormData((prev) => {
      const currentGenres = prev.genres || [];
      const isSelected = currentGenres.includes(genreValue);

      if (isSelected) {
        return {
          ...prev,
          genres: currentGenres.filter((value) => value !== genreValue),
        };
      } else {
        return {
          ...prev,
          genres: [...currentGenres, genreValue],
        };
      }
    });
    // Reset focus state when selecting a genre
    setIsGenreSelectFocused(false);
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
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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

              <FormDatePicker
                label="Release Date"
                required
                error={errors.releaseDate}
                value={formData.releaseDate}
                onChange={(value) => handleInputChange("releaseDate", value)}
              />

              <FormField label="Genres" required error={errors.genres}>
                <div className="relative genre-search-container">
                  {/* Searchable Select Display */}
                  <div
                    className="enhanced-select cursor-pointer flex items-center justify-between"
                    style={{
                      borderColor:
                        isGenreSelectFocused || showGenreDropdown
                          ? "#1db954"
                          : undefined,
                      boxShadow:
                        isGenreSelectFocused || showGenreDropdown
                          ? "0 0 0 2px #1db954, 0 4px 12px rgba(0, 0, 0, 0.2)"
                          : undefined,
                      transform:
                        isGenreSelectFocused || showGenreDropdown
                          ? "translateY(-1px)"
                          : undefined,
                    }}
                    onClick={() => setShowGenreDropdown(!showGenreDropdown)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setShowGenreDropdown(!showGenreDropdown);
                      }
                    }}
                    onFocus={() => setIsGenreSelectFocused(true)}
                    onBlur={() => setIsGenreSelectFocused(false)}
                    tabIndex={0}
                    role="combobox"
                    aria-expanded={showGenreDropdown}
                    aria-haspopup="listbox"
                  >
                    <div className="flex items-center gap-2">
                      {selectedGenres.length === 0 ? (
                        <span className="text-spotify-text-gray">
                          Select genres
                        </span>
                      ) : selectedGenres.length === 1 ? (
                        <span className="text-white">
                          {selectedGenres[0].label}
                        </span>
                      ) : (
                        <div className="flex items-center gap-2">
                          <span className="text-white">
                            {selectedGenres[0].label}
                          </span>
                          <div className="bg-spotify-green text-black text-xs px-2 py-1 rounded-full font-medium whitespace-nowrap">
                            +{selectedGenres.length - 1} more
                          </div>
                        </div>
                      )}
                    </div>
                    <ChevronDown
                      className={`h-4 w-4 text-spotify-text-gray transition-transform duration-200 ${
                        showGenreDropdown ? "rotate-180" : ""
                      }`}
                    />
                  </div>

                  {/* Searchable Dropdown */}
                  {showGenreDropdown && (
                    <div className="absolute z-50 w-full mt-1 bg-spotify-light-gray border border-spotify-light-gray rounded-lg shadow-xl max-h-60 overflow-hidden">
                      {/* Search Input */}
                      <div className="p-3 border-b border-spotify-light-gray">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-spotify-text-gray" />
                          <input
                            type="text"
                            placeholder="Search genre"
                            value={genreSearchTerm}
                            onChange={(e) => setGenreSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-10 py-2 bg-black border border-spotify-light-gray rounded-lg text-white placeholder:text-spotify-text-gray focus:outline-none focus:border-spotify-green"
                            autoFocus
                          />
                          {genreSearchTerm && (
                            <button
                              type="button"
                              onClick={() => setGenreSearchTerm("")}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-spotify-text-gray hover:text-white"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Genres List */}
                      <div className="max-h-48 overflow-y-auto">
                        {filteredGenres.length > 0 ? (
                          filteredGenres.map((genre) => {
                            const isSelected = formData.genres.includes(
                              genre.value
                            );
                            return (
                              <label
                                key={genre.value}
                                className="flex items-center gap-3 p-3 hover:bg-spotify-gray/50 cursor-pointer transition-colors group"
                              >
                                <div className="relative">
                                  <input
                                    type="checkbox"
                                    checked={isSelected}
                                    onChange={() =>
                                      handleGenreToggle(genre.value)
                                    }
                                    className="sr-only"
                                  />
                                  <div
                                    className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                                      isSelected
                                        ? "bg-spotify-green border-spotify-green"
                                        : "border-spotify-text-gray group-hover:border-spotify-green/50"
                                    }`}
                                  >
                                    {isSelected && (
                                      <svg
                                        className="w-3 h-3 text-black"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                      >
                                        <path
                                          fillRule="evenodd"
                                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                          clipRule="evenodd"
                                        />
                                      </svg>
                                    )}
                                  </div>
                                </div>
                                <span className="text-white group-hover:text-white">
                                  {genre.label}
                                </span>
                              </label>
                            );
                          })
                        ) : (
                          <div className="p-3 text-center text-spotify-text-gray">
                            No genres found
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <FormField label="Tags">
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <FormInput
                      placeholder="Add a tag..."
                      value={tagInput}
                      onChange={(value) => setTagInput(value)}
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
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative">
                    <input
                      type="checkbox"
                      id="explicit"
                      checked={formData.explicit || false}
                      onChange={(e) =>
                        handleInputChange("explicit", e.target.checked)
                      }
                      className="sr-only"
                    />
                    <div
                      className={`w-5 h-5 rounded-md border-2 transition-all duration-200 flex items-center justify-center group-hover:scale-105 ${
                        formData.explicit
                          ? "bg-spotify-green border-spotify-green shadow-lg shadow-spotify-green/30"
                          : "bg-spotify-light-gray border-spotify-light-gray hover:border-spotify-green/50"
                      }`}
                    >
                      {formData.explicit && (
                        <svg
                          className="w-3 h-3 text-black"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                  </div>
                  <span className="text-sm text-white group-hover:text-spotify-green transition-colors duration-200 font-medium">
                    Contains explicit content
                  </span>
                </label>
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
