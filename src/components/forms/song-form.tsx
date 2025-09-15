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
import { Music, Clock, Calendar, User, Album, Upload } from "lucide-react";

interface SongFormData {
  id?: string;
  title: string;
  artist: string;
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
    artist: "",
    album: "",
    genre: "",
    duration: "",
    description: "",
    status: "draft",
    ...initialData,
  });

  const [errors, setErrors] = React.useState<Partial<SongFormData>>({});
  const [audioFile, setAudioFile] = React.useState<File | null>(null);
  const [coverFile, setCoverFile] = React.useState<File | null>(null);
  const [showCustomArtist, setShowCustomArtist] = React.useState(false);

  React.useEffect(() => {
    if (initialData) {
      setFormData({ ...formData, ...initialData });
    }
  }, [initialData]);

  const validateForm = (): boolean => {
    const newErrors: Partial<SongFormData> = {};

    if (!formData.title.trim()) {
      newErrors.title = "Song title is required";
    }

    if (!formData.artist.trim()) {
      newErrors.artist = "Artist is required";
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

  const handleInputChange = (field: keyof SongFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const artistOptions = [
    ...artists.map((artist) => ({
      value: artist.id,
      label: artist.name,
    })),
    { value: "add_new", label: "+ Add New Artist" },
  ];

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

              <FormField label="Artist" required error={errors.artist}>
                {showCustomArtist ? (
                  <div className="space-y-2">
                    <FormInput
                      placeholder="Enter artist name"
                      value={formData.artist}
                      onChange={(value) => handleInputChange("artist", value)}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setShowCustomArtist(false);
                        handleInputChange("artist", "");
                      }}
                      className="text-xs"
                    >
                      ← Back to select from list
                    </Button>
                  </div>
                ) : (
                  <FormSelect
                    value={formData.artist}
                    onChange={(value) => {
                      if (value === "add_new") {
                        setShowCustomArtist(true);
                        handleInputChange("artist", "");
                      } else {
                        handleInputChange("artist", value);
                      }
                    }}
                    options={artistOptions}
                    placeholder="Select artist"
                  />
                )}
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
