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
  Pause,
  Shuffle,
  Repeat,
  Heart,
  Download,
  MoreVertical,
  Search,
  Filter,
  Clock,
  Music,
  Plus,
  Trash2,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useConfirmDialog } from "@/components/ui/confirm-dialog";

interface LikedSong {
  id: string;
  title: string;
  artist: string;
  album?: string;
  duration: string;
  likedAt: string;
  coverImage?: string;
  genre?: string;
}

export default function LikedSongs() {
  const { confirm, ConfirmDialog } = useConfirmDialog();
  const [isPlaying, setIsPlaying] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterGenre, setFilterGenre] = useState<string>("all");

  // Mock data - replace with actual API calls
  const [likedSongs, setLikedSongs] = useState<LikedSong[]>([
    {
      id: "1",
      title: "Summer Vibes",
      artist: "Current Artist",
      album: "Summer Collection",
      duration: "3:45",
      likedAt: "2024-06-20",
      coverImage: "/api/placeholder/64/64",
      genre: "Pop",
    },
    {
      id: "2",
      title: "Midnight Dreams",
      artist: "Another Artist",
      album: "Night Songs",
      duration: "4:12",
      likedAt: "2024-06-18",
      coverImage: "/api/placeholder/64/64",
      genre: "Electronic",
    },
    {
      id: "3",
      title: "City Lights",
      artist: "Urban Artist",
      album: "Urban Stories",
      duration: "3:55",
      likedAt: "2024-06-15",
      coverImage: "/api/placeholder/64/64",
      genre: "Hip Hop",
    },
    {
      id: "4",
      title: "New Beginning",
      artist: "Indie Artist",
      album: "Fresh Start",
      duration: "3:28",
      likedAt: "2024-06-10",
      coverImage: "/api/placeholder/64/64",
      genre: "Indie",
    },
    {
      id: "5",
      title: "Ocean Waves",
      artist: "Ambient Artist",
      album: "Nature Sounds",
      duration: "5:20",
      likedAt: "2024-06-08",
      coverImage: "/api/placeholder/64/64",
      genre: "Ambient",
    },
    {
      id: "6",
      title: "Dance Floor",
      artist: "EDM Artist",
      album: "Party Hits",
      duration: "3:15",
      likedAt: "2024-06-05",
      coverImage: "/api/placeholder/64/64",
      genre: "Electronic",
    },
  ]);

  const genres = Array.from(
    new Set(likedSongs.map((song) => song.genre).filter(Boolean))
  );

  const filteredSongs = likedSongs.filter((song) => {
    const matchesSearch =
      song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
      song.album?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesGenre = filterGenre === "all" || song.genre === filterGenre;

    return matchesSearch && matchesGenre;
  });

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleUnlikeSong = async (songId: string) => {
    const confirmed = await confirm({
      title: "Remove from Liked Songs",
      description:
        "Are you sure you want to remove this song from your liked songs?",
      variant: "destructive",
      confirmText: "Remove",
      onConfirm: () => {
        setLikedSongs((prev) => prev.filter((song) => song.id !== songId));
      },
    });
  };

  const formatDuration = (duration: string) => {
    return duration;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const totalDuration = likedSongs.reduce((total, song) => {
    const [minutes, seconds] = song.duration.split(":").map(Number);
    return total + minutes * 60 + seconds;
  }, 0);

  const formatTotalDuration = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <MainLayout userType="user">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Cover Image */}
          <div className="w-64 h-64 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
            <Heart className="h-24 w-24 text-white" />
          </div>

          {/* Playlist Info */}
          <div className="flex-1 space-y-4">
            <div>
              <span className="text-sm text-spotify-text-gray mb-2 block">
                Playlist
              </span>
              <h1 className="text-4xl font-bold text-white mb-2">
                Liked Songs
              </h1>
              <p className="text-spotify-text-gray text-lg">
                Songs you've liked will appear here
              </p>
            </div>

            {/* Playlist Stats */}
            <div className="flex items-center gap-6 text-spotify-text-gray">
              <span className="flex items-center gap-1">
                <Music className="h-4 w-4" />
                {likedSongs.length} songs
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {formatTotalDuration(totalDuration)}
              </span>
              <span>
                Last updated {formatDate(likedSongs[0]?.likedAt || "")}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-4">
              <Button
                onClick={handlePlayPause}
                variant="spotify"
                size="lg"
                className="h-14 px-8"
                disabled={likedSongs.length === 0}
              >
                {isPlaying ? (
                  <Pause className="h-6 w-6 mr-2" />
                ) : (
                  <Play className="h-6 w-6 mr-2" />
                )}
                {isPlaying ? "Pause" : "Play"}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-14 w-14"
                disabled={likedSongs.length === 0}
              >
                <Shuffle className="h-6 w-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-14 w-14"
                disabled={likedSongs.length === 0}
              >
                <Repeat className="h-6 w-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-14 w-14"
                disabled={likedSongs.length === 0}
              >
                <Download className="h-6 w-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-14 w-14"
                disabled={likedSongs.length === 0}
              >
                <MoreVertical className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <Card className="bg-spotify-gray border-spotify-light-gray">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-spotify-text-gray" />
                <Input
                  placeholder="Search in your liked songs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-spotify-light-gray border-0 text-white placeholder:text-spotify-text-gray"
                />
              </div>
              <div className="flex gap-2">
                <select
                  value={filterGenre}
                  onChange={(e) => setFilterGenre(e.target.value)}
                  className="px-3 py-2 bg-spotify-light-gray border border-spotify-light-gray rounded-md text-white text-sm focus:border-spotify-green focus:ring-2 focus:ring-spotify-green/20 focus:outline-none"
                >
                  <option value="all">All Genres</option>
                  {genres.map((genre) => (
                    <option key={genre} value={genre}>
                      {genre}
                    </option>
                  ))}
                </select>
                <Button variant="spotifySecondary" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Songs List */}
        <Card className="bg-spotify-gray border-spotify-light-gray">
          <CardHeader>
            <CardTitle className="text-white">
              Liked Songs ({filteredSongs.length})
            </CardTitle>
            <CardDescription className="text-spotify-text-gray">
              All songs you've liked
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {filteredSongs.map((song, index) => (
                <div
                  key={song.id}
                  className="flex items-center gap-4 p-4 bg-gradient-to-r from-spotify-light-gray/50 to-spotify-gray/50 rounded-xl hover:from-spotify-light-gray hover:to-spotify-gray transition-all duration-300 group"
                >
                  {/* Track Number */}
                  <div className="w-8 text-center text-spotify-text-gray text-sm">
                    {index + 1}
                  </div>

                  {/* Cover Image */}
                  <div className="w-12 h-12 bg-spotify-light-gray rounded-lg flex items-center justify-center overflow-hidden">
                    {song.coverImage ? (
                      <img
                        src={song.coverImage}
                        alt={song.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Music className="h-6 w-6 text-spotify-text-gray" />
                    )}
                  </div>

                  {/* Song Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-medium truncate group-hover:text-gradient transition-all duration-300">
                      {song.title}
                    </h3>
                    <p className="text-spotify-text-gray text-sm truncate">
                      {song.artist}
                      {song.album && ` • ${song.album}`}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-spotify-text-gray">
                        Liked {formatDate(song.likedAt)}
                      </span>
                      {song.genre && (
                        <>
                          <span className="text-xs text-spotify-text-gray">
                            •
                          </span>
                          <span className="text-xs text-spotify-text-gray">
                            {song.genre}
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Duration */}
                  <div className="text-spotify-text-gray text-sm">
                    {formatDuration(song.duration)}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-red-400 hover:text-red-300"
                      onClick={() => handleUnlikeSong(song.id)}
                    >
                      <Heart className="h-4 w-4 fill-current" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-spotify-text-gray hover:text-white"
                    >
                      <Play className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-spotify-text-gray hover:text-white"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}

              {filteredSongs.length === 0 && (
                <div className="text-center py-12">
                  <Heart className="h-12 w-12 text-spotify-text-gray mx-auto mb-4" />
                  <h3 className="text-white text-lg font-medium mb-2">
                    {searchTerm || filterGenre !== "all"
                      ? "No songs found"
                      : "No liked songs yet"}
                  </h3>
                  <p className="text-spotify-text-gray mb-4">
                    {searchTerm || filterGenre !== "all"
                      ? "Try adjusting your search or filter criteria"
                      : "Start liking songs to see them here"}
                  </p>
                  {!searchTerm && filterGenre === "all" && (
                    <Button variant="spotify">
                      <Plus className="h-4 w-4 mr-2" />
                      Discover Music
                    </Button>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Confirm Dialog */}
      {ConfirmDialog}
    </MainLayout>
  );
}
