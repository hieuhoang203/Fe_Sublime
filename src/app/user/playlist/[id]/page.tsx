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
  Plus,
  Share,
  Edit,
  Trash2,
  Clock,
  Users,
  Globe,
  Lock,
  Music,
  Search,
  Filter,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useParams } from "next/navigation";
import { useConfirmDialog } from "@/components/ui/confirm-dialog";

interface Song {
  id: string;
  title: string;
  artist: string;
  album?: string;
  duration: string;
  addedAt: string;
  isLiked: boolean;
  coverImage?: string;
}

interface Playlist {
  id: string;
  name: string;
  description?: string;
  coverImage?: string;
  isPublic: boolean;
  isCollaborative: boolean;
  tags?: string[];
  songCount: number;
  duration: string;
  createdAt: string;
  updatedAt: string;
  owner: string;
  followers: number;
  songs: Song[];
}

export default function PlaylistDetail() {
  const params = useParams();
  const playlistId = params.id as string;
  const { confirm, ConfirmDialog } = useConfirmDialog();

  const [isPlaying, setIsPlaying] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showEditForm, setShowEditForm] = useState(false);

  // Mock data - replace with actual API calls
  const [playlist, setPlaylist] = useState<Playlist>({
    id: playlistId,
    name: "My Favorites",
    description:
      "All my favorite songs in one place. A carefully curated collection of tracks that never fail to lift my mood.",
    coverImage: "/api/placeholder/300/300",
    isPublic: true,
    isCollaborative: false,
    tags: ["favorites", "pop", "rock", "indie"],
    songCount: 24,
    duration: "1:23:45",
    createdAt: "2024-01-15",
    updatedAt: "2024-06-20",
    owner: "You",
    followers: 12,
    songs: [
      {
        id: "1",
        title: "Summer Vibes",
        artist: "Current Artist",
        album: "Summer Collection",
        duration: "3:45",
        addedAt: "2024-06-20",
        isLiked: true,
        coverImage: "/api/placeholder/64/64",
      },
      {
        id: "2",
        title: "Midnight Dreams",
        artist: "Another Artist",
        album: "Night Songs",
        duration: "4:12",
        addedAt: "2024-06-18",
        isLiked: false,
        coverImage: "/api/placeholder/64/64",
      },
      {
        id: "3",
        title: "City Lights",
        artist: "Urban Artist",
        album: "Urban Stories",
        duration: "3:55",
        addedAt: "2024-06-15",
        isLiked: true,
        coverImage: "/api/placeholder/64/64",
      },
      {
        id: "4",
        title: "New Beginning",
        artist: "Indie Artist",
        album: "Fresh Start",
        duration: "3:28",
        addedAt: "2024-06-10",
        isLiked: false,
        coverImage: "/api/placeholder/64/64",
      },
    ],
  });

  const filteredSongs = playlist.songs.filter(
    (song) =>
      song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
      song.album?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleLikeSong = (songId: string) => {
    setPlaylist((prev) => ({
      ...prev,
      songs: prev.songs.map((song) =>
        song.id === songId ? { ...song, isLiked: !song.isLiked } : song
      ),
    }));
  };

  const handleRemoveSong = async (songId: string) => {
    const confirmed = await confirm({
      title: "Remove Song",
      description:
        "Are you sure you want to remove this song from the playlist?",
      variant: "destructive",
      confirmText: "Remove",
      onConfirm: () => {
        setPlaylist((prev) => ({
          ...prev,
          songs: prev.songs.filter((song) => song.id !== songId),
          songCount: prev.songCount - 1,
        }));
      },
    });
  };

  const formatDuration = (duration: string) => {
    return duration;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <MainLayout userType="user">
      <div className="p-6 space-y-6">
        {/* Playlist Header */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Cover Image */}
          <div className="w-64 h-64 bg-spotify-light-gray rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
            {playlist.coverImage ? (
              <img
                src={playlist.coverImage}
                alt={playlist.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <Music className="h-24 w-24 text-spotify-text-gray" />
            )}
          </div>

          {/* Playlist Info */}
          <div className="flex-1 space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                {playlist.isPublic ? (
                  <Globe className="h-4 w-4 text-spotify-green" />
                ) : (
                  <Lock className="h-4 w-4 text-spotify-text-gray" />
                )}
                {playlist.isCollaborative && (
                  <Users className="h-4 w-4 text-blue-400" />
                )}
                <span className="text-sm text-spotify-text-gray">
                  {playlist.isPublic ? "Public" : "Private"} playlist
                </span>
              </div>
              <h1 className="text-4xl font-bold text-white mb-2">
                {playlist.name}
              </h1>
              {playlist.description && (
                <p className="text-spotify-text-gray text-lg">
                  {playlist.description}
                </p>
              )}
            </div>

            {/* Playlist Stats */}
            <div className="flex items-center gap-6 text-spotify-text-gray">
              <span className="flex items-center gap-1">
                <Music className="h-4 w-4" />
                {playlist.songCount} songs
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {formatDuration(playlist.duration)}
              </span>
              {playlist.followers > 0 && (
                <span className="flex items-center gap-1">
                  <Heart className="h-4 w-4" />
                  {playlist.followers} followers
                </span>
              )}
              <span>Updated {formatDate(playlist.updatedAt)}</span>
            </div>

            {/* Tags */}
            {playlist.tags && playlist.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {playlist.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-spotify-light-gray text-white text-sm rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center gap-4">
              <Button
                onClick={handlePlayPause}
                variant="spotify"
                size="lg"
                className="h-14 px-8"
              >
                {isPlaying ? (
                  <Pause className="h-6 w-6 mr-2" />
                ) : (
                  <Play className="h-6 w-6 mr-2" />
                )}
                {isPlaying ? "Pause" : "Play"}
              </Button>
              <Button variant="ghost" size="icon" className="h-14 w-14">
                <Shuffle className="h-6 w-6" />
              </Button>
              <Button variant="ghost" size="icon" className="h-14 w-14">
                <Repeat className="h-6 w-6" />
              </Button>
              <Button variant="ghost" size="icon" className="h-14 w-14">
                <Heart className="h-6 w-6" />
              </Button>
              <Button variant="ghost" size="icon" className="h-14 w-14">
                <Download className="h-6 w-6" />
              </Button>
              <Button variant="ghost" size="icon" className="h-14 w-14">
                <Share className="h-6 w-6" />
              </Button>
              <Button variant="ghost" size="icon" className="h-14 w-14">
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
                  placeholder="Search songs in this playlist..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-spotify-light-gray border-0 text-white placeholder:text-spotify-text-gray"
                />
              </div>
              <div className="flex gap-2">
                <Button variant="spotifySecondary" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Songs
                </Button>
                <Button variant="spotifySecondary" size="sm">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Playlist
                </Button>
                <Button variant="spotifySecondary" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Sort
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Songs List */}
        <Card className="bg-spotify-gray border-spotify-light-gray">
          <CardHeader>
            <CardTitle className="text-white">
              Songs ({filteredSongs.length})
            </CardTitle>
            <CardDescription className="text-spotify-text-gray">
              All songs in this playlist
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
                    <p className="text-xs text-spotify-text-gray">
                      Added {formatDate(song.addedAt)}
                    </p>
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
                      className="h-8 w-8 text-white/70 hover:text-red-400 hover:bg-red-400/10"
                      onClick={() => handleLikeSong(song.id)}
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
                      <Play className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-white/70 hover:text-red-400 hover:bg-red-400/10"
                      onClick={() => handleRemoveSong(song.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-white/70 hover:text-white hover:bg-white/10"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}

              {filteredSongs.length === 0 && (
                <div className="text-center py-12">
                  <Music className="h-12 w-12 text-spotify-text-gray mx-auto mb-4" />
                  <h3 className="text-white text-lg font-medium mb-2">
                    No songs found
                  </h3>
                  <p className="text-spotify-text-gray mb-4">
                    {searchTerm
                      ? "Try adjusting your search criteria"
                      : "This playlist is empty"}
                  </p>
                  {!searchTerm && (
                    <Button variant="spotify">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Songs
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
