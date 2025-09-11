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

  const artistOptions = artists.map((artist) => ({
    value: artist.id,
    label: artist.name,
  }));

  const albumOptions = albums.map((album) => ({
    value: album.id,
    label: album.name,
  }));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
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
          {/* File Uploads */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField label="Audio File" required>
              <FormFileUpload accept="audio/*" onChange={setAudioFile}>
                {formData.audioFile && (
                  <div className="space-y-2">
                    <div className="w-16 h-16 bg-spotify-light-gray rounded-lg flex items-center justify-center mx-auto">
                      <Music className="h-8 w-8 text-spotify-green" />
                    </div>
                    <p className="text-sm text-spotify-text-gray">
                      Audio File Selected
                    </p>
                  </div>
                )}
              </FormFileUpload>
            </FormField>

            <FormField label="Cover Art">
              <FormFileUpload accept="image/*" onChange={setCoverFile}>
                {formData.coverImage && (
                  <div className="space-y-2">
                    <img
                      src={formData.coverImage}
                      alt="Cover preview"
                      className="w-16 h-16 object-cover rounded-lg mx-auto"
                    />
                    <p className="text-sm text-spotify-text-gray">
                      Cover Art Preview
                    </p>
                  </div>
                )}
              </FormFileUpload>
            </FormField>
          </div>

          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Song Title" required error={errors.title}>
              <FormInput
                placeholder="Enter song title"
                value={formData.title}
                onChange={(value) => handleInputChange("title", value)}
              />
            </FormField>

            <FormField label="Artist" required error={errors.artist}>
              {artists.length > 0 ? (
                <FormSelect
                  value={formData.artist}
                  onChange={(value) => handleInputChange("artist", value)}
                  options={artistOptions}
                  placeholder="Select artist"
                />
              ) : (
                <FormInput
                  placeholder="Enter artist name"
                  value={formData.artist}
                  onChange={(value) => handleInputChange("artist", value)}
                />
              )}
            </FormField>

            <FormField label="Album">
              {albums.length > 0 ? (
                <FormSelect
                  value={formData.album || ""}
                  onChange={(value) => handleInputChange("album", value)}
                  options={albumOptions}
                  placeholder="Select album (optional)"
                />
              ) : (
                <FormInput
                  placeholder="Enter album name (optional)"
                  value={formData.album || ""}
                  onChange={(value) => handleInputChange("album", value)}
                />
              )}
            </FormField>

            <FormField label="Genre" required error={errors.genre}>
              <FormSelect
                value={formData.genre}
                onChange={(value) => handleInputChange("genre", value)}
                options={genreOptions}
                placeholder="Select genre"
              />
            </FormField>

            <FormField label="Duration" required error={errors.duration}>
              <FormInput
                placeholder="MM:SS (e.g., 3:45)"
                value={formData.duration}
                onChange={(value) => handleInputChange("duration", value)}
              />
            </FormField>

            <FormField label="Release Date">
              <input
                type="date"
                value={formData.releaseDate || ""}
                onChange={(e) =>
                  handleInputChange("releaseDate", e.target.value)
                }
                className="flex w-full rounded-md border border-spotify-light-gray bg-spotify-light-gray px-3 py-2 text-sm text-white focus:border-spotify-green focus:ring-2 focus:ring-spotify-green/20 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
              />
            </FormField>
          </div>

          {/* Description and Lyrics */}
          <FormField label="Description">
            <FormTextarea
              placeholder="Describe the song, its inspiration, or any special notes..."
              value={formData.description || ""}
              onChange={(value) => handleInputChange("description", value)}
              rows={3}
            />
          </FormField>

          <FormField label="Lyrics">
            <FormTextarea
              placeholder="Enter song lyrics (optional)"
              value={formData.lyrics || ""}
              onChange={(value) => handleInputChange("lyrics", value)}
              rows={6}
            />
          </FormField>

          {/* Tags */}
          <FormField label="Tags">
            <FormInput
              placeholder="Enter tags separated by commas (e.g., upbeat, summer, party)"
              value={formData.tags || ""}
              onChange={(value) => handleInputChange("tags", value)}
            />
          </FormField>

          {/* Status */}
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
              {initialData?.id ? "Update Song" : "Upload Song"}
            </FormSubmit>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
