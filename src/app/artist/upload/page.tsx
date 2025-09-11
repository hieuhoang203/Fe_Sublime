"use client";

import { MainLayout } from "@/components/layout/main-layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, Music, Mic, Image, FileAudio, X } from "lucide-react";
import { useState } from "react";

export default function ArtistUpload() {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [songData, setSongData] = useState({
    title: "",
    album: "",
    genre: "",
    description: "",
  });

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setUploadedFiles((prev) => [...prev, ...files]);
  };

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Uploading:", { songData, uploadedFiles });
  };

  return (
    <MainLayout userType="artist">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-white">Upload Music</h1>
          <p className="text-spotify-text-gray mt-2">
            Share your music with the world
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Upload Area */}
          <Card className="bg-spotify-gray border-spotify-light-gray">
            <CardHeader>
              <CardTitle className="text-white">Upload Audio Files</CardTitle>
              <CardDescription className="text-spotify-text-gray">
                Drag and drop your audio files or click to browse
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-spotify-light-gray rounded-lg p-8 text-center hover:border-spotify-green transition-colors">
                <Upload className="h-12 w-12 text-spotify-text-gray mx-auto mb-4" />
                <p className="text-white mb-2">Drop your audio files here</p>
                <p className="text-spotify-text-gray text-sm mb-4">
                  Supports MP3, WAV, FLAC, and other audio formats
                </p>
                <input
                  type="file"
                  multiple
                  accept="audio/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="audio-upload"
                />
                <label htmlFor="audio-upload">
                  <Button variant="spotify" asChild>
                    <span>Choose Files</span>
                  </Button>
                </label>
              </div>

              {/* Uploaded Files */}
              {uploadedFiles.length > 0 && (
                <div className="mt-6 space-y-2">
                  <h4 className="text-white font-medium">Uploaded Files:</h4>
                  {uploadedFiles.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-spotify-light-gray rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <FileAudio className="h-5 w-5 text-spotify-green" />
                        <div>
                          <p className="text-white text-sm">{file.name}</p>
                          <p className="text-spotify-text-gray text-xs">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFile(index)}
                        className="h-8 w-8 text-red-400 hover:text-red-300"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Song Information */}
          <Card className="bg-spotify-gray border-spotify-light-gray">
            <CardHeader>
              <CardTitle className="text-white">Song Information</CardTitle>
              <CardDescription className="text-spotify-text-gray">
                Provide details about your music
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-white mb-2 block">
                    Song Title
                  </label>
                  <Input
                    value={songData.title}
                    onChange={(e) =>
                      setSongData((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                    placeholder="Enter song title"
                    className="bg-spotify-light-gray border-0 text-white placeholder:text-spotify-text-gray"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-white mb-2 block">
                    Album
                  </label>
                  <Input
                    value={songData.album}
                    onChange={(e) =>
                      setSongData((prev) => ({
                        ...prev,
                        album: e.target.value,
                      }))
                    }
                    placeholder="Enter album name"
                    className="bg-spotify-light-gray border-0 text-white placeholder:text-spotify-text-gray"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-white mb-2 block">
                    Genre
                  </label>
                  <Input
                    value={songData.genre}
                    onChange={(e) =>
                      setSongData((prev) => ({
                        ...prev,
                        genre: e.target.value,
                      }))
                    }
                    placeholder="e.g., Pop, Rock, Electronic"
                    className="bg-spotify-light-gray border-0 text-white placeholder:text-spotify-text-gray"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-white mb-2 block">
                    Cover Art
                  </label>
                  <div className="border-2 border-dashed border-spotify-light-gray rounded-lg p-4 text-center hover:border-spotify-green transition-colors">
                    <Image className="h-8 w-8 text-spotify-text-gray mx-auto mb-2" />
                    <p className="text-spotify-text-gray text-sm">
                      Upload cover art
                    </p>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      id="cover-upload"
                    />
                    <label htmlFor="cover-upload">
                      <Button
                        variant="spotifySecondary"
                        size="sm"
                        className="mt-2"
                      >
                        Choose Image
                      </Button>
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-white mb-2 block">
                  Description
                </label>
                <textarea
                  value={songData.description}
                  onChange={(e) =>
                    setSongData((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  placeholder="Tell us about your song..."
                  rows={4}
                  className="w-full bg-spotify-light-gray border-0 text-white placeholder:text-spotify-text-gray rounded-md p-3 resize-none"
                />
              </div>
            </CardContent>
          </Card>

          {/* Upload Options */}
          <Card className="bg-spotify-gray border-spotify-light-gray">
            <CardHeader>
              <CardTitle className="text-white">Upload Options</CardTitle>
              <CardDescription className="text-spotify-text-gray">
                Configure your upload settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">Make Public</p>
                    <p className="text-spotify-text-gray text-sm">
                      Allow others to discover and play your music
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-4 h-4 text-spotify-green"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">Allow Downloads</p>
                    <p className="text-spotify-text-gray text-sm">
                      Let users download your music
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-spotify-green"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">Auto-approve</p>
                    <p className="text-spotify-text-gray text-sm">
                      Skip manual review process
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-spotify-green"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end gap-4">
            <Button variant="spotifySecondary" type="button">
              Save as Draft
            </Button>
            <Button
              variant="spotify"
              type="submit"
              disabled={uploadedFiles.length === 0}
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload Music
            </Button>
          </div>
        </form>
      </div>
    </MainLayout>
  );
}
