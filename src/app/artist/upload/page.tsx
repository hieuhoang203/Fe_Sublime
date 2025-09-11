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
import { SongForm } from "@/components/forms/song-form";
import { AlbumForm } from "@/components/forms/album-form";
import { Upload, Music, Album, Plus } from "lucide-react";
import { useState } from "react";

export default function ArtistUpload() {
  const [showSongForm, setShowSongForm] = useState(false);
  const [showAlbumForm, setShowAlbumForm] = useState(false);
  const [uploadType, setUploadType] = useState<"song" | "album" | null>(null);

  const handleSongSubmit = (data: any) => {
    console.log("Song uploaded:", data);
    setShowSongForm(false);
    // Handle song upload logic here
  };

  const handleAlbumSubmit = (data: any) => {
    console.log("Album created:", data);
    setShowAlbumForm(false);
    // Handle album creation logic here
  };

  const handleUploadType = (type: "song" | "album") => {
    setUploadType(type);
    if (type === "song") {
      setShowSongForm(true);
    } else {
      setShowAlbumForm(true);
    }
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

        {/* Upload Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Upload Single Song */}
          <Card
            className="bg-spotify-gray border-spotify-light-gray hover:border-spotify-green/50 transition-all duration-300 cursor-pointer group"
            onClick={() => handleUploadType("song")}
          >
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-spotify-green to-spotify-green-hover rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Music className="h-8 w-8 text-black" />
              </div>
              <h3 className="text-white text-xl font-bold mb-2 group-hover:text-gradient transition-all duration-300">
                Upload Single Song
              </h3>
              <p className="text-spotify-text-gray mb-4">
                Upload a single track with detailed metadata and cover art
              </p>
              <Button
                variant="spotify"
                className="group-hover:scale-105 transition-transform duration-300"
              >
                <Plus className="h-4 w-4 mr-2" />
                Upload Song
              </Button>
            </CardContent>
          </Card>

          {/* Create Album */}
          <Card
            className="bg-spotify-gray border-spotify-light-gray hover:border-spotify-green/50 transition-all duration-300 cursor-pointer group"
            onClick={() => handleUploadType("album")}
          >
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-spotify-green to-spotify-green-hover rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Album className="h-8 w-8 text-black" />
              </div>
              <h3 className="text-white text-xl font-bold mb-2 group-hover:text-gradient transition-all duration-300">
                Create Album
              </h3>
              <p className="text-spotify-text-gray mb-4">
                Create a new album and organize multiple tracks together
              </p>
              <Button
                variant="spotify"
                className="group-hover:scale-105 transition-transform duration-300"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Album
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <Card className="bg-spotify-gray border-spotify-light-gray">
          <CardHeader>
            <CardTitle className="text-white">Quick Stats</CardTitle>
            <CardDescription className="text-spotify-text-gray">
              Your music performance overview
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-spotify-light-gray/50 rounded-lg">
                <Music className="h-6 w-6 text-spotify-green mx-auto mb-2" />
                <p className="text-2xl font-bold text-white">24</p>
                <p className="text-sm text-spotify-text-gray">Total Songs</p>
              </div>
              <div className="text-center p-4 bg-spotify-light-gray/50 rounded-lg">
                <Album className="h-6 w-6 text-blue-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-white">3</p>
                <p className="text-sm text-spotify-text-gray">Total Albums</p>
              </div>
              <div className="text-center p-4 bg-spotify-light-gray/50 rounded-lg">
                <Upload className="h-6 w-6 text-purple-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-white">1.2M</p>
                <p className="text-sm text-spotify-text-gray">Total Plays</p>
              </div>
              <div className="text-center p-4 bg-spotify-light-gray/50 rounded-lg">
                <Music className="h-6 w-6 text-orange-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-white">12.5K</p>
                <p className="text-sm text-spotify-text-gray">Followers</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Form Dialogs */}
        <SongForm
          open={showSongForm}
          onOpenChange={setShowSongForm}
          onSubmit={handleSongSubmit}
          loading={false}
          artists={[{ id: "current-artist", name: "Current Artist" }]}
          albums={[
            { id: "1", name: "Summer Collection" },
            { id: "2", name: "Night Songs" },
            { id: "3", name: "Fresh Start" },
            { id: "4", name: "Urban Stories" },
          ]}
        />

        <AlbumForm
          open={showAlbumForm}
          onOpenChange={setShowAlbumForm}
          onSubmit={handleAlbumSubmit}
          loading={false}
        />
      </div>
    </MainLayout>
  );
}
