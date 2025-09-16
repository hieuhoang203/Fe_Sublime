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
  Music,
  Clock,
  Calendar,
  User,
  Album,
  Upload,
  Search,
  X,
  ChevronDown,
} from "lucide-react";

interface SongFormData {
  id?: string;
  title: string;
  artists: string[];
  album?: string;
  genre: string;
  duration: string;
  description?: string;
  audioFile?: string;
  coverImage?: string;
  status: "draft" | "pending" | "approved" | "rejected";
  releaseDate?: string;
  lyrics?: string;
  tags?: string;
}

interface SongFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: SongFormData) => void;
  initialData?: Partial<SongFormData>;
  loading?: boolean;
  artists?: Array<{ id: string; name: string }>;
  albums?: Array<{ id: string; name: string }>;
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

const statusOptions = [
  { value: "draft", label: "Draft" },
  { value: "pending", label: "Pending Review" },
  { value: "approved", label: "Approved" },
  { value: "rejected", label: "Rejected" },
];

export function SongForm({
  open,
  onOpenChange,
  onSubmit,
  initialData,
  loading = false,
  artists = [],
  albums = [],
}: SongFormProps) {
  const [formData, setFormData] = React.useState<SongFormData>({
    title: "",
    artists: [],
    album: "",
    genre: "",
    duration: "",
    description: "",
    status: "draft",
    ...initialData,
  });

  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [audioFile, setAudioFile] = React.useState<File | null>(null);
  const [coverFile, setCoverFile] = React.useState<File | null>(null);
  const [showArtistDropdown, setShowArtistDropdown] = React.useState(false);
  const [artistSearchTerm, setArtistSearchTerm] = React.useState("");

  React.useEffect(() => {
    if (initialData) {
      setFormData({ ...formData, ...initialData });
    }
  }, [initialData]);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (showArtistDropdown && !target.closest(".artist-search-container")) {
        setShowArtistDropdown(false);
        setArtistSearchTerm("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showArtistDropdown]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = "Song title is required";
    }

    if (!formData.artists.length) {
      newErrors.artists = "At least one artist is required";
    }

    if (!formData.genre.trim()) {
      newErrors.genre = "Genre is required";
    }

    if (!formData.duration.trim()) {
      newErrors.duration = "Duration is required";
    } else if (!/^\d+:\d{2}$/.test(formData.duration)) {
      newErrors.duration = "Duration must be in MM:SS format";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      onSubmit({
        ...formData,
        audioFile: audioFile
          ? URL.createObjectURL(audioFile)
          : formData.audioFile,
        coverImage: coverFile
          ? URL.createObjectURL(coverFile)
          : formData.coverImage,
      });
    }
  };

  const handleInputChange = (
    field: keyof SongFormData,
    value: string | string[]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleArtistToggle = (artistId: string) => {
    setFormData((prev) => {
      const currentArtists = prev.artists || [];
      const isSelected = currentArtists.includes(artistId);

      if (isSelected) {
        return {
          ...prev,
          artists: currentArtists.filter((id) => id !== artistId),
        };
      } else {
        return {
          ...prev,
          artists: [...currentArtists, artistId],
        };
      }
    });
  };

  const artistOptions = [
    ...artists.map((artist) => ({
      value: artist.id,
      label: artist.name,
    })),
  ];

  // Filter artists based on search term
  const filteredArtists = React.useMemo(() => {
    if (!artistSearchTerm.trim()) return artists;
    return artists.filter((artist) =>
      artist.name.toLowerCase().includes(artistSearchTerm.toLowerCase())
    );
  }, [artists, artistSearchTerm]);

  const selectedArtists = artists.filter((artist) =>
    formData.artists.includes(artist.id)
  );

  const albumOptions = [
    { value: "", label: "No Album" },
    ...albums.map((album) => ({
      value: album.id,
      label: album.name,
    })),
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-spotify-green to-spotify-green-hover rounded-full flex items-center justify-center">
              <Music className="h-5 w-5 text-black" />
            </div>
            {initialData?.id ? "Edit Song" : "Add New Song"}
          </DialogTitle>
          <DialogDescription>
            {initialData?.id
              ? "Update song information and metadata"
              : "Upload a new song with all necessary details"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 p-6 pt-0">
          {/* File Uploads - Compact Layout */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <Upload className="h-5 w-5" />
              File Uploads
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <FormField label="Audio File" required>
                <FormFileUpload accept="audio/*" onChange={setAudioFile}>
                  {formData.audioFile ? (
                    <div className="flex items-center gap-3 p-3 bg-spotify-light-gray/50 rounded-lg">
                      <div className="w-12 h-12 bg-spotify-light-gray rounded-lg flex items-center justify-center">
                        <Music className="h-6 w-6 text-spotify-green" />
                      </div>
                      <div>
                        <p className="text-sm text-white font-medium">
                          Audio File Selected
                        </p>
                        <p className="text-xs text-spotify-text-gray">
                          Click to change
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 border-2 border-dashed border-spotify-light-gray rounded-lg text-center">
                      <Music className="h-8 w-8 text-spotify-text-gray mx-auto mb-2" />
                      <p className="text-sm text-spotify-text-gray">
                        Click to upload audio file
                      </p>
                    </div>
                  )}
                </FormFileUpload>
              </FormField>

              <FormField label="Cover Art">
                <FormFileUpload accept="image/*" onChange={setCoverFile}>
                  {formData.coverImage ? (
                    <div className="flex items-center gap-3 p-3 bg-spotify-light-gray/50 rounded-lg">
                      <img
                        src={formData.coverImage}
                        alt="Cover preview"
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div>
                        <p className="text-sm text-white font-medium">
                          Cover Art Selected
                        </p>
                        <p className="text-xs text-spotify-text-gray">
                          Click to change
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 border-2 border-dashed border-spotify-light-gray rounded-lg text-center">
                      <Album className="h-8 w-8 text-spotify-text-gray mx-auto mb-2" />
                      <p className="text-sm text-spotify-text-gray">
                        Click to upload cover art
                      </p>
                    </div>
                  )}
                </FormFileUpload>
              </FormField>
            </div>
          </div>

          {/* Basic Information - 3 columns for better space usage */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <Music className="h-5 w-5" />
              Song Information
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <FormField label="Song Title" required error={errors.title}>
                <FormInput
                  placeholder="Enter song title"
                  value={formData.title}
                  onChange={(value) => handleInputChange("title", value)}
                />
              </FormField>

              <FormField label="Artists" required error={errors.artists}>
                <div className="relative artist-search-container">
                  {/* Searchable Select Display */}
                  <div
                    className="enhanced-select cursor-pointer flex items-center justify-between"
                    onClick={() => setShowArtistDropdown(!showArtistDropdown)}
                  >
                    <div className="flex items-center gap-2">
                      {selectedArtists.length === 0 ? (
                        <span className="text-spotify-text-gray">
                          Select artists
                        </span>
                      ) : selectedArtists.length === 1 ? (
                        <span className="text-white">
                          {selectedArtists[0].name}
                        </span>
                      ) : (
                        <div className="flex items-center gap-2">
                          <span className="text-white">
                            {selectedArtists[0].name}
                          </span>
                          <div className="bg-spotify-green/20 text-spotify-green px-2 py-1 rounded-full text-xs font-medium">
                            +{selectedArtists.length - 1}
                          </div>
                        </div>
                      )}
                    </div>
                    <ChevronDown
                      className={`h-4 w-4 text-spotify-text-gray transition-transform duration-200 ${
                        showArtistDropdown ? "rotate-180" : ""
                      }`}
                    />
                  </div>

                  {/* Searchable Dropdown */}
                  {showArtistDropdown && (
                    <div className="absolute z-50 w-full mt-1 bg-spotify-light-gray border border-spotify-light-gray rounded-lg shadow-xl max-h-60 overflow-hidden">
                      {/* Search Input */}
                      <div className="p-3 border-b border-spotify-light-gray">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-spotify-text-gray" />
                          <input
                            type="text"
                            placeholder="Search artist"
                            value={artistSearchTerm}
                            onChange={(e) =>
                              setArtistSearchTerm(e.target.value)
                            }
                            className="w-full pl-10 pr-10 py-2 bg-black border border-spotify-light-gray rounded-lg text-white placeholder:text-spotify-text-gray focus:outline-none focus:border-spotify-green"
                            autoFocus
                          />
                          {artistSearchTerm && (
                            <button
                              type="button"
                              onClick={() => setArtistSearchTerm("")}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-spotify-text-gray hover:text-white"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Artists List */}
                      <div className="max-h-48 overflow-y-auto">
                        {filteredArtists.length > 0 ? (
                          filteredArtists.map((artist) => {
                            const isSelected = formData.artists.includes(
                              artist.id
                            );
                            return (
                              <label
                                key={artist.id}
                                className="flex items-center gap-3 p-3 hover:bg-spotify-gray/50 cursor-pointer transition-colors group"
                              >
                                <div className="relative">
                                  <input
                                    type="checkbox"
                                    checked={isSelected}
                                    onChange={() =>
                                      handleArtistToggle(artist.id)
                                    }
                                    className="sr-only"
                                  />
                                  <div
                                    className={`w-5 h-5 rounded-md border-2 transition-all duration-200 flex items-center justify-center group-hover:scale-105 ${
                                      isSelected
                                        ? "bg-spotify-green border-spotify-green shadow-lg shadow-spotify-green/30"
                                        : "bg-spotify-light-gray border-spotify-light-gray hover:border-spotify-green/50"
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
                                <span className="text-white text-sm">
                                  {artist.name}
                                </span>
                              </label>
                            );
                          })
                        ) : (
                          <div className="p-3 text-center text-spotify-text-gray text-sm">
                            No artists found
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </FormField>

              <FormDatePicker
                label="Release Date"
                value={formData.releaseDate || ""}
                onChange={(value) => handleInputChange("releaseDate", value)}
              />

              <FormField label="Genre" required error={errors.genre}>
                <FormSelect
                  value={formData.genre}
                  onChange={(value) => handleInputChange("genre", value)}
                  options={genreOptions}
                  placeholder="Select genre"
                />
              </FormField>

              <FormField label="Album">
                <FormSelect
                  value={formData.album || ""}
                  onChange={(value) => handleInputChange("album", value)}
                  options={albumOptions}
                  placeholder="Select album (optional)"
                />
              </FormField>

              <FormField label="Duration" required error={errors.duration}>
                <FormInput
                  placeholder="MM:SS (e.g., 3:45)"
                  value={formData.duration}
                  onChange={(value) => handleInputChange("duration", value)}
                />
              </FormField>
            </div>
          </div>

          {/* Additional Information - Side by side */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Additional Information
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <FormField label="Description">
                <FormTextarea
                  placeholder="Describe the song, its inspiration..."
                  value={formData.description || ""}
                  onChange={(value) => handleInputChange("description", value)}
                  rows={3}
                />
              </FormField>

              <FormField label="Tags">
                <FormInput
                  placeholder="upbeat, summer, party"
                  value={formData.tags || ""}
                  onChange={(value) => handleInputChange("tags", value)}
                />
              </FormField>
            </div>
          </div>

          {/* Lyrics - Collapsible section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <Music className="h-5 w-5" />
              Lyrics (Optional)
            </h3>
            <FormField label="Song Lyrics">
              <FormTextarea
                placeholder="Enter song lyrics (optional)"
                value={formData.lyrics || ""}
                onChange={(value) => handleInputChange("lyrics", value)}
                rows={4}
              />
            </FormField>
          </div>

          {/* Status and Preview */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Status & Preview
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <FormField label="Status" required>
                <FormSelect
                  value={formData.status}
                  onChange={(value) =>
                    handleInputChange(
                      "status",
                      value as "draft" | "pending" | "approved" | "rejected"
                    )
                  }
                  options={statusOptions}
                  placeholder="Select status"
                />
              </FormField>

              {/* Song Preview (if editing) */}
              {initialData?.id && formData.audioFile && (
                <div className="p-4 bg-spotify-light-gray rounded-lg">
                  <h4 className="text-sm font-medium text-white mb-2">
                    Audio Preview
                  </h4>
                  <audio controls className="w-full">
                    <source src={formData.audioFile} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                </div>
              )}
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
              {initialData?.id ? "Update Song" : "Upload Song"}
            </FormSubmit>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
