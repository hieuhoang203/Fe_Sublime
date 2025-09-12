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
import {
  Library,
  Search,
  Plus,
  Play,
  Heart,
  MoreHorizontal,
  Clock,
  Music,
  Album,
  Users,
} from "lucide-react";
import { useState } from "react";

export default function UserLibrary() {
  const [activeTab, setActiveTab] = useState<
    "playlists" | "artists" | "albums" | "songs"
  >("playlists");

  const playlists = [
    {
      id: 1,
      name: "My Favorites",
      description: "Songs I love",
      songs: 25,
      cover: "❤️",
      lastPlayed: "2 hours ago",
    },
    {
      id: 2,
      name: "Workout Mix",
      description: "High energy songs",
      songs: 18,
      cover: "💪",
      lastPlayed: "1 day ago",
    },
    {
      id: 3,
      name: "Chill Vibes",
      description: "Relaxing music",
      songs: 32,
      cover: "🌊",
      lastPlayed: "3 days ago",
    },
    {
      id: 4,
      name: "Road Trip",
      description: "Perfect for driving",
      songs: 45,
      cover: "🚗",
      lastPlayed: "1 week ago",
    },
  ];

  const artists = [
    {
      id: 1,
      name: "John Doe",
      followers: "1.2M",
      songs: 24,
      cover: "👨‍🎤",
      isFollowing: true,
    },
    {
      id: 2,
      name: "Jane Smith",
      followers: "856K",
      songs: 18,
      cover: "👩‍🎤",
      isFollowing: true,
    },
    {
      id: 3,
      name: "Mike Johnson",
      followers: "2.1M",
      songs: 35,
      cover: "👨‍🎵",
      isFollowing: false,
    },
    {
      id: 4,
      name: "Sarah Wilson",
      followers: "643K",
      songs: 12,
      cover: "👩‍🎵",
      isFollowing: true,
    },
  ];

  const albums = [
    {
      id: 1,
      name: "Summer Collection",
      artist: "John Doe",
      songs: 12,
      year: "2024",
      cover: "☀️",
    },
    {
      id: 2,
      name: "Night Songs",
      artist: "Jane Smith",
      songs: 8,
      year: "2024",
      cover: "🌙",
    },
    {
      id: 3,
      name: "Urban Stories",
      artist: "Mike Johnson",
      songs: 15,
      year: "2023",
      cover: "🏙️",
    },
    {
      id: 4,
      name: "Nature Sounds",
      artist: "Sarah Wilson",
      songs: 10,
      year: "2024",
      cover: "🌿",
    },
  ];

  const songs = [
    {
      id: 1,
      title: "Summer Vibes",
      artist: "John Doe",
      album: "Summer Collection",
      duration: "3:45",
      isLiked: true,
    },
    {
      id: 2,
      title: "Midnight Dreams",
      artist: "Jane Smith",
      album: "Night Songs",
      duration: "4:12",
      isLiked: false,
    },
    {
      id: 3,
      title: "City Lights",
      artist: "Mike Johnson",
      album: "Urban Stories",
      duration: "3:28",
      isLiked: true,
    },
    {
      id: 4,
      title: "Ocean Waves",
      artist: "Sarah Wilson",
      album: "Nature Sounds",
      duration: "5:15",
      isLiked: false,
    },
  ];

  const tabs = [
    { id: "playlists", name: "Playlists", icon: Library },
    { id: "artists", name: "Artists", icon: Users },
    { id: "albums", name: "Albums", icon: Album },
    { id: "songs", name: "Songs", icon: Music },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "playlists":
        return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {playlists.map((playlist) => (
            <Card
              key={playlist.id}
              className="bg-spotify-gray border-spotify-light-gray hover:bg-spotify-hover transition-colors cursor-pointer group"
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="text-3xl">{playlist.cover}</div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-white truncate">
                      {playlist.name}
                    </h3>
                    <p className="text-sm text-spotify-text-gray truncate">
                      {playlist.description}
                    </p>
                    <p className="text-xs text-spotify-text-gray">
                      {playlist.songs} songs
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-green-400 hover:text-green-300 hover:bg-green-400/10"
                  >
                    <Play className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        );
      case "artists":
        return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {artists.map((artist) => (
            <Card
              key={artist.id}
              className="bg-spotify-gray border-spotify-light-gray hover:bg-spotify-hover transition-colors cursor-pointer group"
            >
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="text-4xl mb-3">{artist.cover}</div>
                  <h3 className="font-medium text-white truncate">
                    {artist.name}
                  </h3>
                  <p className="text-sm text-spotify-text-gray">
                    {artist.followers} followers
                  </p>
                  <p className="text-xs text-spotify-text-gray">
                    {artist.songs} songs
                  </p>
                  <Button
                    variant={
                      artist.isFollowing ? "spotifySecondary" : "spotify"
                    }
                    size="sm"
                    className="mt-3 w-full"
                  >
                    {artist.isFollowing ? "Following" : "Follow"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        );
      case "albums":
        return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {albums.map((album) => (
            <Card
              key={album.id}
              className="bg-spotify-gray border-spotify-light-gray hover:bg-spotify-hover transition-colors cursor-pointer group"
            >
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="text-4xl mb-3">{album.cover}</div>
                  <h3 className="font-medium text-white truncate">
                    {album.name}
                  </h3>
                  <p className="text-sm text-spotify-text-gray truncate">
                    {album.artist}
                  </p>
                  <p className="text-xs text-spotify-text-gray">
                    {album.year} • {album.songs} songs
                  </p>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="opacity-0 group-hover:opacity-100 transition-opacity mt-2 text-green-400 hover:text-green-300 hover:bg-green-400/10"
                  >
                    <Play className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        );
      case "songs":
        return (
        <Card className="bg-spotify-gray border-spotify-light-gray">
          <CardContent className="p-0">
            <div className="space-y-1">
              {songs.map((song, index) => (
                <div
                  key={song.id}
                  className="flex items-center gap-4 p-4 hover:bg-spotify-light-gray transition-colors group"
                >
                  <span className="text-spotify-text-gray text-sm w-6">
                    {index + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-white truncate">
                      {song.title}
                    </h3>
                    <p className="text-sm text-spotify-text-gray truncate">
                      {song.artist} • {song.album}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-spotify-text-gray">
                      {song.duration}
                    </span>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-white/70 hover:text-red-400 hover:bg-red-400/10"
                      >
                        <Heart
                          className={`h-4 w-4 ${
                            song.isLiked ? "text-red-400 fill-current" : "text-current"
                          }`}
                        />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-white/70 hover:text-white hover:bg-white/10"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Your Library</h1>
          <p className="text-spotify-text-gray mt-2">
            Your personal music collection
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="spotifySecondary" size="sm">
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
          <Button variant="spotify" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Create Playlist
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-spotify-light-gray p-1 rounded-lg w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? "bg-spotify-gray text-white"
                : "text-spotify-text-gray hover:text-white"
            }`}
          >
            <tab.icon className="h-4 w-4" />
            {tab.name}
          </button>
        ))}
      </div>

      {/* Content */}
      <div>{renderContent()}</div>
    </div>
  );
}
