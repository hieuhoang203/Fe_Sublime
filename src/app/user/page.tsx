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
import {
  Play,
  Heart,
  Plus,
  MoreHorizontal,
  Clock,
  Music,
  Album,
} from "lucide-react";

export default function UserDashboard() {
  const recentlyPlayed = [
    {
      id: 1,
      title: "Summer Vibes",
      artist: "John Doe",
      album: "Summer Collection",
      duration: "3:45",
      cover: "🎵",
    },
    {
      id: 2,
      title: "Midnight Dreams",
      artist: "Jane Smith",
      album: "Night Songs",
      duration: "4:12",
      cover: "🌙",
    },
    {
      id: 3,
      title: "City Lights",
      artist: "Mike Johnson",
      album: "Urban Stories",
      duration: "3:28",
      cover: "🏙️",
    },
    {
      id: 4,
      title: "Ocean Waves",
      artist: "Sarah Wilson",
      album: "Nature Sounds",
      duration: "5:15",
      cover: "🌊",
    },
  ];

  const madeForYou = [
    {
      id: 1,
      title: "Made for You",
      description: "Your personal music mix",
      cover: "🎧",
      songs: 25,
    },
    {
      id: 2,
      title: "Recently Played",
      description: "Continue where you left off",
      cover: "⏯️",
      songs: 12,
    },
    {
      id: 3,
      title: "Liked Songs",
      description: "Songs you've liked",
      cover: "❤️",
      songs: 156,
    },
    {
      id: 4,
      title: "Discover Weekly",
      description: "Your weekly mixtape",
      cover: "🔍",
      songs: 30,
    },
  ];

  const topArtists = [
    { id: 1, name: "John Doe", followers: "1.2M", cover: "👨‍🎤" },
    { id: 2, name: "Jane Smith", followers: "856K", cover: "👩‍🎤" },
    { id: 3, name: "Mike Johnson", followers: "2.1M", cover: "👨‍🎵" },
    { id: 4, name: "Sarah Wilson", followers: "643K", cover: "👩‍🎵" },
  ];

  return (
    <MainLayout userType="user">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Good afternoon</h1>
            <p className="text-spotify-text-gray mt-2">
              Welcome back to your music
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="spotifySecondary" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Create Playlist
            </Button>
            <Button variant="spotify" size="sm">
              <Music className="h-4 w-4 mr-2" />
              Browse Music
            </Button>
          </div>
        </div>

        {/* Made for You */}
        <div className="animate-fade-in-up">
          <h2 className="text-3xl font-bold text-white mb-6 text-gradient">
            Made for You
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {madeForYou.map((playlist, index) => (
              <Card
                key={playlist.id}
                className="spotify-card-enhanced cursor-pointer group hover-lift hover-glow animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="text-4xl group-hover:scale-110 transition-transform duration-300">
                      {playlist.cover}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-white truncate text-lg group-hover:text-gradient transition-all duration-300">
                        {playlist.title}
                      </h3>
                      <p className="text-sm text-spotify-text-gray truncate group-hover:text-white transition-colors duration-300">
                        {playlist.description}
                      </p>
                      <p className="text-xs text-spotify-text-gray group-hover:text-white transition-colors duration-300 font-medium">
                        {playlist.songs} songs
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 bg-spotify-green hover:bg-spotify-green-hover text-black"
                    >
                      <Play className="h-5 w-5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recently Played */}
        <div className="animate-fade-in-up">
          <h2 className="text-3xl font-bold text-white mb-6 text-gradient">
            Recently Played
          </h2>
          <Card className="spotify-card-glass hover-lift">
            <CardContent className="p-0">
              <div className="space-y-1">
                {recentlyPlayed.map((song, index) => (
                  <div
                    key={song.id}
                    className="flex items-center gap-4 p-4 hover:bg-gradient-to-r hover:from-spotify-light-gray/50 hover:to-spotify-gray/50 transition-all duration-300 group animate-slide-in-left"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="text-3xl group-hover:scale-110 transition-transform duration-300">
                      {song.cover}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-white truncate text-lg group-hover:text-gradient transition-all duration-300">
                        {song.title}
                      </h3>
                      <p className="text-sm text-spotify-text-gray truncate group-hover:text-white transition-colors duration-300">
                        {song.artist} • {song.album}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-spotify-text-gray group-hover:text-white transition-colors duration-300 font-medium">
                        {song.duration}
                      </span>
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 hover:scale-110 hover:text-red-400 transition-all duration-300"
                        >
                          <Heart className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 hover:scale-110 transition-all duration-300"
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
        </div>

        {/* Top Artists */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">
            Your Top Artists
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {topArtists.map((artist) => (
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
                    <Button
                      variant="spotifySecondary"
                      size="sm"
                      className="mt-3 w-full"
                    >
                      Follow
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Access */}
        <Card className="bg-spotify-gray border-spotify-light-gray">
          <CardHeader>
            <CardTitle className="text-white">Quick Access</CardTitle>
            <CardDescription className="text-spotify-text-gray">
              Your most used features
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button className="p-4 bg-spotify-light-gray hover:bg-spotify-hover rounded-lg transition-colors text-left">
                <Heart className="h-6 w-6 text-red-400 mb-2" />
                <p className="text-sm font-medium text-white">Liked Songs</p>
                <p className="text-xs text-spotify-text-gray">156 songs</p>
              </button>
              <button className="p-4 bg-spotify-light-gray hover:bg-spotify-hover rounded-lg transition-colors text-left">
                <Album className="h-6 w-6 text-blue-400 mb-2" />
                <p className="text-sm font-medium text-white">My Playlists</p>
                <p className="text-xs text-spotify-text-gray">12 playlists</p>
              </button>
              <button className="p-4 bg-spotify-light-gray hover:bg-spotify-hover rounded-lg transition-colors text-left">
                <Clock className="h-6 w-6 text-green-400 mb-2" />
                <p className="text-sm font-medium text-white">
                  Recently Played
                </p>
                <p className="text-xs text-spotify-text-gray">
                  Continue listening
                </p>
              </button>
              <button className="p-4 bg-spotify-light-gray hover:bg-spotify-hover rounded-lg transition-colors text-left">
                <Music className="h-6 w-6 text-purple-400 mb-2" />
                <p className="text-sm font-medium text-white">Browse Music</p>
                <p className="text-xs text-spotify-text-gray">
                  Discover new songs
                </p>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
