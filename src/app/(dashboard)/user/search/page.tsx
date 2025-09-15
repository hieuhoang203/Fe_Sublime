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
import { useSongDrawer } from "@/contexts/song-drawer-context";
import {
  Search,
  Play,
  Heart,
  MoreHorizontal,
  Clock,
  Music,
  Album,
  Users,
  Mic,
} from "lucide-react";
import { useState } from "react";

export default function UserSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<
    "all" | "songs" | "artists" | "albums" | "playlists"
  >("all");
  const { openDrawer } = useSongDrawer();

  const searchResults = {
    songs: [
      {
        id: "1",
        title: "Summer Vibes",
        artist: "John Doe",
        album: "Summer Collection",
        duration: 225, // 3:45 in seconds
        cover: "🎵",
        coverUrl: "",
        isLiked: false,
        releaseDate: "2024-06-15",
        genre: "Pop",
        playCount: 1250000,
        lyrics:
          "Summer vibes are calling me\nTo the beach where I want to be\nWaves are crashing on the shore\nThis is what I'm living for",
      },
      {
        id: "2",
        title: "Midnight Dreams",
        artist: "Jane Smith",
        album: "Night Songs",
        duration: 252, // 4:12 in seconds
        cover: "🌙",
        coverUrl: "",
        isLiked: true,
        releaseDate: "2024-05-20",
        genre: "R&B",
        playCount: 890000,
        lyrics:
          "In the midnight hour\nWhen the world is still\nI close my eyes and dream\nOf a love that's real",
      },
      {
        id: "3",
        title: "City Lights",
        artist: "Mike Johnson",
        album: "Urban Stories",
        duration: 208, // 3:28 in seconds
        cover: "🏙️",
        coverUrl: "",
        isLiked: false,
        releaseDate: "2024-04-10",
        genre: "Hip-Hop",
        playCount: 2100000,
        lyrics:
          "City lights shining bright\nIn the urban jungle tonight\nConcrete dreams and neon signs\nThis is where my story begins",
      },
    ],
    artists: [
      {
        id: 1,
        name: "John Doe",
        followers: "1.2M",
        songs: 24,
        cover: "👨‍🎤",
        isFollowing: false,
      },
      {
        id: 2,
        name: "Jane Smith",
        followers: "856K",
        songs: 18,
        cover: "👩‍🎤",
        isFollowing: false,
      },
      {
        id: 3,
        name: "Mike Johnson",
        followers: "2.1M",
        songs: 35,
        cover: "👨‍🎵",
        isFollowing: false,
      },
    ],
    albums: [
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
    ],
    playlists: [
      {
        id: 1,
        name: "Chill Vibes",
        description: "Relaxing music for any time",
        songs: 25,
        cover: "🌊",
        creator: "Spotify",
      },
      {
        id: 2,
        name: "Workout Mix",
        description: "High energy songs",
        songs: 18,
        cover: "💪",
        creator: "Music Lover",
      },
      {
        id: 3,
        name: "Road Trip",
        description: "Perfect for driving",
        songs: 45,
        cover: "🚗",
        creator: "Traveler",
      },
    ],
  };

  const recentSearches = [
    "summer vibes",
    "john doe",
    "chill music",
    "workout playlist",
    "jazz",
  ];

  const tabs = [
    { id: "all", name: "All", icon: Search },
    { id: "songs", name: "Songs", icon: Music },
    { id: "artists", name: "Artists", icon: Mic },
    { id: "albums", name: "Albums", icon: Album },
    { id: "playlists", name: "Playlists", icon: Users },
  ];

  const renderResults = () => {
    if (!searchQuery) {
      return (
        <div className="space-y-6">
          {/* Recent Searches */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">
              Recent Searches
            </h2>
            <div className="space-y-2">
              {recentSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => setSearchQuery(search)}
                  className="flex items-center gap-3 p-3 bg-spotify-light-gray hover:bg-spotify-hover rounded-lg transition-colors w-full text-left"
                >
                  <Clock className="h-4 w-4 text-spotify-text-gray" />
                  <span className="text-white">{search}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Browse Categories */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Browse</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {[
                { name: "Pop", cover: "🎵", color: "bg-pink-500" },
                { name: "Rock", cover: "🎸", color: "bg-red-500" },
                { name: "Hip Hop", cover: "🎤", color: "bg-purple-500" },
                { name: "Electronic", cover: "🎧", color: "bg-blue-500" },
                { name: "Jazz", cover: "🎷", color: "bg-yellow-500" },
                { name: "Classical", cover: "🎼", color: "bg-green-500" },
              ].map((category) => (
                <Card
                  key={category.name}
                  className="bg-spotify-gray border-spotify-light-gray hover:bg-spotify-hover transition-colors cursor-pointer group"
                >
                  <CardContent className="p-4">
                    <div className="text-center">
                      <div
                        className={`w-16 h-16 ${category.color} rounded-full flex items-center justify-center mx-auto mb-3`}
                      >
                        <span className="text-2xl">{category.cover}</span>
                      </div>
                      <p className="text-white font-medium">{category.name}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      );
    }

    switch (activeTab) {
      case "songs":
        return (
          <div className="space-y-4">
            {searchResults.songs.map((song) => (
              <div
                key={song.id}
                className="flex items-center gap-4 p-4 bg-spotify-light-gray rounded-lg hover:bg-spotify-hover transition-colors group cursor-pointer"
                onClick={() => openDrawer(song)}
              >
                <div className="text-2xl">{song.cover}</div>
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
                    {Math.floor(song.duration / 60)}:
                    {(song.duration % 60).toString().padStart(2, "0")}
                  </span>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-white/70 hover:text-red-400 hover:bg-red-400/10"
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-white/70 hover:text-white hover:bg-white/10"
                    >
                      <Play className="h-4 w-4" />
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
        );
      case "artists":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {searchResults.artists.map((artist) => (
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
                    <Button variant="spotify" size="sm" className="mt-3 w-full">
                      Follow
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        );
      case "albums":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {searchResults.albums.map((album) => (
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
                      className="opacity-0 group-hover:opacity-100 transition-opacity mt-2"
                    >
                      <Play className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        );
      case "playlists":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {searchResults.playlists.map((playlist) => (
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
                        by {playlist.creator} • {playlist.songs} songs
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Play className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        );
      default:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Songs</h2>
              <div className="space-y-2">
                {searchResults.songs.slice(0, 3).map((song) => (
                  <div
                    key={song.id}
                    className="flex items-center gap-4 p-3 bg-spotify-light-gray rounded-lg hover:bg-spotify-hover transition-colors group"
                  >
                    <div className="text-xl">{song.cover}</div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-white truncate">
                        {song.title}
                      </h3>
                      <p className="text-sm text-spotify-text-gray truncate">
                        {song.artist}
                      </p>
                    </div>
                    <span className="text-sm text-spotify-text-gray">
                      {song.duration}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Artists</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {searchResults.artists.map((artist) => (
                  <Card
                    key={artist.id}
                    className="bg-spotify-gray border-spotify-light-gray hover:bg-spotify-hover transition-colors cursor-pointer"
                  >
                    <CardContent className="p-4 text-center">
                      <div className="text-3xl mb-2">{artist.cover}</div>
                      <h3 className="font-medium text-white text-sm">
                        {artist.name}
                      </h3>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Search Header */}
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-spotify-text-gray z-10" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="What do you want to listen to?"
              className="pl-14 pr-4 bg-spotify-light-gray border border-spotify-light-gray text-white placeholder:text-spotify-text-gray text-lg h-12 w-full focus:border-spotify-green focus:ring-2 focus:ring-spotify-green/20"
            />
          </div>
        </div>
      </div>

      {/* Tabs */}
      {searchQuery && (
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
      )}

      {/* Results */}
      <div>{renderResults()}</div>
    </div>
  );
}
