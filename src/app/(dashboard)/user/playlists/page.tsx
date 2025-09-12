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
import { PlaylistForm } from "@/components/forms/playlist-form";
import {
  Music,
  Plus,
  Edit,
  Trash2,
  Play,
  MoreVertical,
  Search,
  Filter,
  Users,
  Lock,
  Globe,
  Clock,
  Heart,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Link from "next/link";
import { useConfirmDialog } from "@/components/ui/confirm-dialog";

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
}

export default function UserPlaylists() {
  const { confirm, ConfirmDialog } = useConfirmDialog();
  const [showPlaylistForm, setShowPlaylistForm] = useState(false);
  const [editingPlaylist, setEditingPlaylist] = useState<Playlist | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string>("all");

  // Mock data - replace with actual API calls
  const [playlists, setPlaylists] = useState<Playlist[]>([
    {
      id: "1",
      name: "My Favorites",
      description: "All my favorite songs in one place",
      coverImage: "/api/placeholder/120/120",
      isPublic: true,
      isCollaborative: false,
      tags: ["favorites", "pop", "rock"],
      songCount: 24,
      duration: "1:23:45",
      createdAt: "2024-01-15",
      updatedAt: "2024-06-20",
      owner: "You",
      followers: 12,
    },
    {
      id: "2",
      name: "Workout Mix",
      description: "High energy songs for my workouts",
      coverImage: "/api/placeholder/120/120",
      isPublic: true,
      isCollaborative: true,
      tags: ["workout", "energy", "motivation"],
      songCount: 18,
      duration: "1:15:30",
      createdAt: "2024-02-10",
      updatedAt: "2024-06-18",
      owner: "You",
      followers: 8,
    },
    {
      id: "3",
      name: "Chill Vibes",
      description: "Relaxing music for quiet moments",
      coverImage: "/api/placeholder/120/120",
      isPublic: false,
      isCollaborative: false,
      tags: ["chill", "ambient", "relaxing"],
      songCount: 32,
      duration: "2:45:12",
      createdAt: "2024-03-05",
      updatedAt: "2024-06-15",
      owner: "You",
      followers: 0,
    },
    {
      id: "4",
      name: "Party Hits",
      description: "The best party songs for any occasion",
      coverImage: "/api/placeholder/120/120",
      isPublic: true,
      isCollaborative: true,
      tags: ["party", "dance", "fun"],
      songCount: 28,
      duration: "1:52:18",
      createdAt: "2024-04-12",
      updatedAt: "2024-06-22",
      owner: "You",
      followers: 25,
    },
  ]);

  const filteredPlaylists = playlists.filter((playlist) => {
    const matchesSearch =
      playlist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      playlist.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      playlist.tags?.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );

    let matchesFilter = true;
    if (filterType === "public") {
      matchesFilter = playlist.isPublic;
    } else if (filterType === "private") {
      matchesFilter = !playlist.isPublic;
    } else if (filterType === "collaborative") {
      matchesFilter = playlist.isCollaborative;
    }

    return matchesSearch && matchesFilter;
  });

  const handleAddPlaylist = () => {
    setEditingPlaylist(null);
    setShowPlaylistForm(true);
  };

  const handleEditPlaylist = (playlist: Playlist) => {
    setEditingPlaylist(playlist);
    setShowPlaylistForm(true);
  };

  const handleDeletePlaylist = async (playlistId: string) => {
    const confirmed = await confirm({
      title: "Delete Playlist",
      description:
        "Are you sure you want to delete this playlist? This action cannot be undone.",
      variant: "destructive",
      confirmText: "Delete",
      onConfirm: () => {
        setPlaylists((prev) =>
          prev.filter((playlist) => playlist.id !== playlistId)
        );
      },
    });
  };

  const handlePlaylistSubmit = (data: any) => {
    if (editingPlaylist) {
      // Update existing playlist
      setPlaylists((prev) =>
        prev.map((playlist) =>
          playlist.id === editingPlaylist.id
            ? { ...playlist, ...data }
            : playlist
        )
      );
    } else {
      // Add new playlist
      const newPlaylist: Playlist = {
        id: Date.now().toString(),
        ...data,
        songCount: 0,
        duration: "0:00",
        createdAt: new Date().toISOString().split("T")[0],
        updatedAt: new Date().toISOString().split("T")[0],
        owner: "You",
        followers: 0,
      };
      setPlaylists((prev) => [newPlaylist, ...prev]);
    }
    setShowPlaylistForm(false);
    setEditingPlaylist(null);
  };

  const formatDuration = (duration: string) => {
    return duration;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">My Playlists</h1>
          <p className="text-spotify-text-gray mt-2">
            Organize your favorite music
          </p>
        </div>
        <Button onClick={handleAddPlaylist} variant="spotify">
          <Plus className="h-4 w-4 mr-2" />
          Create Playlist
        </Button>
      </div>

      {/* Search and Filter */}
      <Card className="bg-spotify-gray border-spotify-light-gray">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-spotify-text-gray" />
              <Input
                placeholder="Search playlists, descriptions, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-spotify-light-gray border border-spotify-light-gray text-white placeholder:text-spotify-text-gray focus:border-spotify-green focus:ring-2 focus:ring-spotify-green/20"
              />
            </div>
            <div className="flex gap-2">
              <div className="custom-select-wrapper">
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="enhanced-select"
                >
                  <option
                    value="all"
                    className="bg-spotify-light-gray text-white"
                  >
                    All Playlists
                  </option>
                  <option
                    value="public"
                    className="bg-spotify-light-gray text-white"
                  >
                    Public
                  </option>
                  <option
                    value="private"
                    className="bg-spotify-light-gray text-white"
                  >
                    Private
                  </option>
                  <option
                    value="collaborative"
                    className="bg-spotify-light-gray text-white"
                  >
                    Collaborative
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

      {/* Playlists Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredPlaylists.map((playlist) => (
          <Card
            key={playlist.id}
            className="bg-spotify-gray border-spotify-light-gray hover:border-spotify-green/50 transition-all duration-300 group"
          >
            <CardContent className="p-0">
              {/* Playlist Cover */}
              <div className="relative">
                <Link href={`/user/playlist/${playlist.id}`}>
                  <div className="w-full h-48 bg-spotify-light-gray flex items-center justify-center overflow-hidden cursor-pointer">
                    {playlist.coverImage ? (
                      <img
                        src={playlist.coverImage}
                        alt={playlist.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Music className="h-16 w-16 text-spotify-text-gray" />
                    )}
                  </div>
                </Link>

                {/* Play Button Overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Button
                    variant="spotify"
                    size="icon"
                    className="h-12 w-12 rounded-full"
                  >
                    <Play className="h-6 w-6" />
                  </Button>
                </div>

                {/* Privacy Icons */}
                <div className="absolute top-3 left-3 flex gap-1">
                  {playlist.isPublic ? (
                    <Globe className="h-4 w-4 text-spotify-green" />
                  ) : (
                    <Lock className="h-4 w-4 text-spotify-text-gray" />
                  )}
                  {playlist.isCollaborative && (
                    <Users className="h-4 w-4 text-blue-400" />
                  )}
                </div>

                {/* Actions Menu */}
                <div className="absolute top-3 right-3">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-white/70 hover:text-white hover:bg-black/30"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Playlist Info */}
              <div className="p-4 space-y-3">
                <div>
                  <Link href={`/user/playlist/${playlist.id}`}>
                    <h3 className="text-white font-bold text-lg truncate group-hover:text-gradient transition-all duration-300 cursor-pointer">
                      {playlist.name}
                    </h3>
                  </Link>
                  {playlist.description && (
                    <p className="text-spotify-text-gray text-sm line-clamp-2 mt-1">
                      {playlist.description}
                    </p>
                  )}
                </div>

                {/* Playlist Stats */}
                <div className="flex items-center justify-between text-sm text-spotify-text-gray">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Music className="h-4 w-4" />
                      {playlist.songCount} songs
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {formatDuration(playlist.duration)}
                    </span>
                  </div>
                  {playlist.followers > 0 && (
                    <span className="flex items-center gap-1">
                      <Heart className="h-4 w-4" />
                      {playlist.followers}
                    </span>
                  )}
                </div>

                {/* Tags */}
                {playlist.tags && playlist.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {playlist.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-spotify-light-gray text-white text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                    {playlist.tags.length > 3 && (
                      <span className="px-2 py-1 bg-spotify-light-gray text-spotify-text-gray text-xs rounded-full">
                        +{playlist.tags.length - 3}
                      </span>
                    )}
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-spotify-text-gray hover:text-white"
                      onClick={() => handleEditPlaylist(playlist)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-spotify-text-gray hover:text-red-400"
                      onClick={() => handleDeletePlaylist(playlist.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <span className="text-xs text-spotify-text-gray">
                    Updated {new Date(playlist.updatedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredPlaylists.length === 0 && (
          <div className="col-span-full text-center py-12">
            <Music className="h-12 w-12 text-spotify-text-gray mx-auto mb-4" />
            <h3 className="text-white text-lg font-medium mb-2">
              No playlists found
            </h3>
            <p className="text-spotify-text-gray mb-4">
              {searchTerm || filterType !== "all"
                ? "Try adjusting your search or filter criteria"
                : "Start by creating your first playlist"}
            </p>
            {!searchTerm && filterType === "all" && (
              <Button onClick={handleAddPlaylist} variant="spotify">
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Playlist
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Playlist Form Dialog */}
      <PlaylistForm
        open={showPlaylistForm}
        onOpenChange={setShowPlaylistForm}
        onSubmit={handlePlaylistSubmit}
        initialData={editingPlaylist || undefined}
        loading={false}
      />

      {/* Confirm Dialog */}
      {ConfirmDialog}
    </div>
  );
}
