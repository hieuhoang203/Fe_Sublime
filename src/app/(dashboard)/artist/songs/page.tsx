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
import { useSongDrawer } from "@/contexts/song-drawer-context";
import {
  Music,
  Plus,
  Edit,
  Trash2,
  Play,
  Pause,
  MoreVertical,
  Search,
  Filter,
  Download,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useConfirmDialog } from "@/components/ui/confirm-dialog";

interface Song {
  id: string;
  title: string;
  album?: string;
  genre: string;
  duration: string;
  status: "draft" | "pending" | "approved" | "rejected";
  plays: number;
  releaseDate?: string;
  coverImage?: string;
  audioFile?: string;
}

export default function ArtistSongs() {
  const { confirm, ConfirmDialog } = useConfirmDialog();
  const { openDrawer } = useSongDrawer();
  const [showSongForm, setShowSongForm] = useState(false);
  const [editingSong, setEditingSong] = useState<Song | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  // Mock data - replace with actual API calls
  const [songs, setSongs] = useState<Song[]>([
    {
      id: "1",
      title: "Summer Vibes",
      album: "Summer Collection",
      genre: "Pop",
      duration: 225, // 3:45 in seconds
      status: "approved",
      plays: 45234,
      releaseDate: "2024-06-15",
      coverImage: "/api/placeholder/64/64",
      coverUrl: "",
      isLiked: false,
      playCount: 45234,
      lyrics:
        "Summer vibes are calling me\nTo the beach where I want to be\nWaves are crashing on the shore\nThis is what I'm living for",
    },
    {
      id: "2",
      title: "Midnight Dreams",
      album: "Night Songs",
      genre: "Electronic",
      duration: 252, // 4:12 in seconds
      status: "approved",
      plays: 32156,
      releaseDate: "2024-05-20",
      coverImage: "/api/placeholder/64/64",
      coverUrl: "",
      isLiked: true,
      playCount: 32156,
      lyrics:
        "In the midnight hour\nWhen the world is still\nI close my eyes and dream\nOf a love that's real",
    },
    {
      id: "3",
      title: "New Beginning",
      album: "Fresh Start",
      genre: "Indie",
      duration: 208, // 3:28 in seconds
      status: "pending",
      plays: 0,
      releaseDate: "2024-07-01",
      coverImage: "/api/placeholder/64/64",
      coverUrl: "",
      isLiked: false,
      playCount: 0,
      lyrics:
        "A new beginning starts today\nWith every step I find my way\nThe past is gone, the future's bright\nI'm ready for this new light",
    },
    {
      id: "4",
      title: "City Lights",
      album: "Urban Stories",
      genre: "Hip Hop",
      duration: 235, // 3:55 in seconds
      status: "approved",
      plays: 67432,
      releaseDate: "2024-04-10",
      coverImage: "/api/placeholder/64/64",
      coverUrl: "",
      isLiked: true,
      playCount: 67432,
      lyrics:
        "City lights shining bright\nIn the urban jungle tonight\nConcrete dreams and neon signs\nThis is where my story begins",
    },
  ]);

  const filteredSongs = songs.filter((song) => {
    const matchesSearch =
      song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      song.album?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      song.genre.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "all" || song.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleAddSong = () => {
    setEditingSong(null);
    setShowSongForm(true);
  };

  const handleEditSong = (song: Song) => {
    setEditingSong(song);
    setShowSongForm(true);
  };

  const handleDeleteSong = async (songId: string) => {
    const confirmed = await confirm({
      title: "Delete Song",
      description:
        "Are you sure you want to delete this song? This action cannot be undone.",
      variant: "destructive",
      confirmText: "Delete",
      onConfirm: () => {
        setSongs((prev) => prev.filter((song) => song.id !== songId));
      },
    });
  };

  const handleSongSubmit = (data: any) => {
    if (editingSong) {
      // Update existing song
      setSongs((prev) =>
        prev.map((song) =>
          song.id === editingSong.id ? { ...song, ...data } : song
        )
      );
    } else {
      // Add new song
      const newSong: Song = {
        id: Date.now().toString(),
        ...data,
        plays: 0,
      };
      setSongs((prev) => [newSong, ...prev]);
    }
    setShowSongForm(false);
    setEditingSong(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "pending":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "rejected":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      case "draft":
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const formatPlays = (plays: number) => {
    if (plays >= 1000000) {
      return `${(plays / 1000000).toFixed(1)}M`;
    } else if (plays >= 1000) {
      return `${(plays / 1000).toFixed(1)}K`;
    }
    return plays.toString();
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">My Songs</h1>
          <p className="text-spotify-text-gray mt-2">
            Manage your music library
          </p>
        </div>
        <Button onClick={handleAddSong} variant="spotify">
          <Plus className="h-4 w-4 mr-2" />
          Add New Song
        </Button>
      </div>

      {/* Search and Filter */}
      <Card className="bg-spotify-gray border-spotify-light-gray">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-spotify-text-gray" />
              <Input
                placeholder="Search songs, albums, or genres..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 bg-spotify-light-gray border border-spotify-light-gray text-white placeholder:text-spotify-text-gray focus:border-spotify-green focus:ring-2 focus:ring-spotify-green/20"
              />
            </div>
            <div className="flex gap-2">
              <div className="custom-select-wrapper">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="enhanced-select"
                >
                  <option
                    value="all"
                    className="bg-spotify-light-gray text-white"
                  >
                    All Status
                  </option>
                  <option
                    value="draft"
                    className="bg-spotify-light-gray text-white"
                  >
                    Draft
                  </option>
                  <option
                    value="pending"
                    className="bg-spotify-light-gray text-white"
                  >
                    Pending
                  </option>
                  <option
                    value="approved"
                    className="bg-spotify-light-gray text-white"
                  >
                    Approved
                  </option>
                  <option
                    value="rejected"
                    className="bg-spotify-light-gray text-white"
                  >
                    Rejected
                  </option>
                </select>
              </div>
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
            Songs ({filteredSongs.length})
          </CardTitle>
          <CardDescription className="text-spotify-text-gray">
            Your uploaded songs and their performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {filteredSongs.map((song) => (
              <div
                key={song.id}
                className="flex items-center gap-4 p-4 bg-gradient-to-r from-spotify-light-gray/50 to-spotify-gray/50 rounded-xl hover:from-spotify-light-gray hover:to-spotify-gray transition-all duration-300 group cursor-pointer"
                onClick={() => openDrawer(song)}
              >
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
                    {song.album && `${song.album} • `}
                    {song.genre} • {Math.floor(song.duration / 60)}:
                    {(song.duration % 60).toString().padStart(2, "0")}
                  </p>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="text-xs text-spotify-text-gray">
                      {formatPlays(song.plays)} plays
                    </span>
                    {song.releaseDate && (
                      <span className="text-xs text-spotify-text-gray">
                        Released{" "}
                        {new Date(song.releaseDate).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>

                {/* Status */}
                <div className="flex items-center gap-3">
                  <span
                    className={`text-xs px-3 py-1 rounded-full font-medium border ${getStatusColor(
                      song.status
                    )}`}
                  >
                    {song.status.charAt(0).toUpperCase() + song.status.slice(1)}
                  </span>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
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
                      onClick={() => handleEditSong(song)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-spotify-text-gray hover:text-red-400"
                      onClick={() => handleDeleteSong(song.id)}
                    >
                      <Trash2 className="h-4 w-4" />
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
              </div>
            ))}

            {filteredSongs.length === 0 && (
              <div className="text-center py-12">
                <Music className="h-12 w-12 text-spotify-text-gray mx-auto mb-4" />
                <h3 className="text-white text-lg font-medium mb-2">
                  No songs found
                </h3>
                <p className="text-spotify-text-gray mb-4">
                  {searchTerm || filterStatus !== "all"
                    ? "Try adjusting your search or filter criteria"
                    : "Start by uploading your first song"}
                </p>
                {!searchTerm && filterStatus === "all" && (
                  <Button onClick={handleAddSong} variant="spotify">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Your First Song
                  </Button>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Song Form Dialog */}
      <SongForm
        open={showSongForm}
        onOpenChange={setShowSongForm}
        onSubmit={handleSongSubmit}
        initialData={editingSong || undefined}
        loading={false}
        artists={[{ id: "current-artist", name: "Current Artist" }]}
        albums={[
          { id: "1", name: "Summer Collection" },
          { id: "2", name: "Night Songs" },
          { id: "3", name: "Fresh Start" },
          { id: "4", name: "Urban Stories" },
        ]}
      />

      {/* Confirm Dialog */}
      {ConfirmDialog}
    </div>
  );
}
