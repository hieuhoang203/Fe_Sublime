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
import { AlbumForm } from "@/components/forms/album-form";
import {
  Album,
  Plus,
  Edit,
  Trash2,
  Play,
  Music,
  MoreVertical,
  Search,
  Filter,
  Calendar,
  Clock,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useConfirmDialog } from "@/components/ui/confirm-dialog";

interface AlbumData {
  id: string;
  title: string;
  artist: string;
  releaseDate: string;
  genre: string;
  description?: string;
  coverImage?: string;
  totalTracks: number;
  duration?: string;
  status: "draft" | "published" | "archived";
  label?: string;
  copyright?: string;
  language?: string;
  explicit?: boolean;
  tags?: string[];
  plays: number;
}

export default function ArtistAlbums() {
  const { confirm, ConfirmDialog } = useConfirmDialog();
  const [showAlbumForm, setShowAlbumForm] = useState(false);
  const [editingAlbum, setEditingAlbum] = useState<AlbumData | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  // Mock data - replace with actual API calls
  const [albums, setAlbums] = useState<AlbumData[]>([
    {
      id: "1",
      title: "Summer Collection",
      artist: "Current Artist",
      releaseDate: "2024-06-15",
      genre: "Pop",
      description:
        "A collection of upbeat summer tracks perfect for sunny days.",
      coverImage: "/api/placeholder/120/120",
      totalTracks: 8,
      duration: "32:15",
      status: "published",
      label: "Independent",
      copyright: "© 2024 Current Artist",
      language: "en",
      explicit: false,
      tags: ["summer", "upbeat", "pop"],
      plays: 234567,
    },
    {
      id: "2",
      title: "Night Songs",
      artist: "Current Artist",
      releaseDate: "2024-05-20",
      genre: "Electronic",
      description: "Dark and atmospheric electronic music for late nights.",
      coverImage: "/api/placeholder/120/120",
      totalTracks: 6,
      duration: "28:45",
      status: "published",
      label: "Independent",
      copyright: "© 2024 Current Artist",
      language: "en",
      explicit: false,
      tags: ["electronic", "dark", "atmospheric"],
      plays: 189234,
    },
    {
      id: "3",
      title: "Fresh Start",
      artist: "Current Artist",
      releaseDate: "2024-07-01",
      genre: "Indie",
      description: "New beginnings and fresh perspectives in indie music.",
      coverImage: "/api/placeholder/120/120",
      totalTracks: 10,
      duration: "42:30",
      status: "draft",
      label: "Independent",
      copyright: "© 2024 Current Artist",
      language: "en",
      explicit: false,
      tags: ["indie", "fresh", "new"],
      plays: 0,
    },
  ]);

  const filteredAlbums = albums.filter((album) => {
    const matchesSearch =
      album.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      album.genre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      album.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "all" || album.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleAddAlbum = () => {
    setEditingAlbum(null);
    setShowAlbumForm(true);
  };

  const handleEditAlbum = (album: AlbumData) => {
    setEditingAlbum(album);
    setShowAlbumForm(true);
  };

  const handleDeleteAlbum = async (albumId: string) => {
    const confirmed = await confirm({
      title: "Delete Album",
      description:
        "Are you sure you want to delete this album? This action cannot be undone and will remove all associated songs.",
      variant: "destructive",
      confirmText: "Delete",
      onConfirm: () => {
        setAlbums((prev) => prev.filter((album) => album.id !== albumId));
      },
    });
  };

  const handleAlbumSubmit = (data: any) => {
    if (editingAlbum) {
      // Update existing album
      setAlbums((prev) =>
        prev.map((album) =>
          album.id === editingAlbum.id ? { ...album, ...data } : album
        )
      );
    } else {
      // Add new album
      const newAlbum: AlbumData = {
        id: Date.now().toString(),
        ...data,
        plays: 0,
      };
      setAlbums((prev) => [newAlbum, ...prev]);
    }
    setShowAlbumForm(false);
    setEditingAlbum(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "draft":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "archived":
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
          <h1 className="text-3xl font-bold text-white">My Albums</h1>
          <p className="text-spotify-text-gray mt-2">
            Manage your album collection
          </p>
        </div>
        <Button onClick={handleAddAlbum} variant="spotify">
          <Plus className="h-4 w-4 mr-2" />
          Create New Album
        </Button>
      </div>

      {/* Search and Filter */}
      <Card className="bg-spotify-gray border-spotify-light-gray">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-spotify-text-gray" />
              <Input
                placeholder="Search albums, genres, or descriptions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-spotify-light-gray border border-spotify-light-gray text-white placeholder:text-spotify-text-gray focus:border-spotify-green focus:ring-2 focus:ring-spotify-green/20"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 bg-spotify-light-gray border border-spotify-light-gray rounded-md text-white text-sm focus:border-spotify-green focus:ring-2 focus:ring-spotify-green/20 focus:outline-none"
              >
                <option value="all">All Status</option>
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
              <Button variant="spotifySecondary" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Albums Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAlbums.map((album) => (
          <Card
            key={album.id}
            className="bg-spotify-gray border-spotify-light-gray hover:border-spotify-green/50 transition-all duration-300 group"
          >
            <CardContent className="p-0">
              {/* Album Cover */}
              <div className="relative">
                <div className="w-full h-48 bg-spotify-light-gray flex items-center justify-center overflow-hidden">
                  {album.coverImage ? (
                    <img
                      src={album.coverImage}
                      alt={album.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Album className="h-16 w-16 text-spotify-text-gray" />
                  )}
                </div>

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

                {/* Status Badge */}
                <div className="absolute top-3 right-3">
                  <span
                    className={`text-xs px-2 py-1 rounded-full font-medium border ${getStatusColor(
                      album.status
                    )}`}
                  >
                    {album.status.charAt(0).toUpperCase() +
                      album.status.slice(1)}
                  </span>
                </div>
              </div>

              {/* Album Info */}
              <div className="p-4 space-y-3">
                <div>
                  <h3 className="text-white font-bold text-lg truncate group-hover:text-gradient transition-all duration-300">
                    {album.title}
                  </h3>
                  <p className="text-spotify-text-gray text-sm">
                    {album.artist} • {album.genre}
                  </p>
                </div>

                {album.description && (
                  <p className="text-spotify-text-gray text-sm line-clamp-2">
                    {album.description}
                  </p>
                )}

                {/* Album Stats */}
                <div className="flex items-center justify-between text-sm text-spotify-text-gray">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Music className="h-4 w-4" />
                      {album.totalTracks} tracks
                    </span>
                    {album.duration && (
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {album.duration}
                      </span>
                    )}
                  </div>
                  <span className="font-medium text-white">
                    {formatPlays(album.plays)} plays
                  </span>
                </div>

                {/* Release Date */}
                <div className="flex items-center gap-1 text-xs text-spotify-text-gray">
                  <Calendar className="h-3 w-3" />
                  Released {new Date(album.releaseDate).toLocaleDateString()}
                </div>

                {/* Tags */}
                {album.tags && album.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {album.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-spotify-light-gray text-white text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                    {album.tags.length > 3 && (
                      <span className="px-2 py-1 bg-spotify-light-gray text-spotify-text-gray text-xs rounded-full">
                        +{album.tags.length - 3}
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
                      onClick={() => handleEditAlbum(album)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-spotify-text-gray hover:text-red-400"
                      onClick={() => handleDeleteAlbum(album.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-spotify-text-gray hover:text-white"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredAlbums.length === 0 && (
          <div className="col-span-full text-center py-12">
            <Album className="h-12 w-12 text-spotify-text-gray mx-auto mb-4" />
            <h3 className="text-white text-lg font-medium mb-2">
              No albums found
            </h3>
            <p className="text-spotify-text-gray mb-4">
              {searchTerm || filterStatus !== "all"
                ? "Try adjusting your search or filter criteria"
                : "Start by creating your first album"}
            </p>
            {!searchTerm && filterStatus === "all" && (
              <Button onClick={handleAddAlbum} variant="spotify">
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Album
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Album Form Dialog */}
      <AlbumForm
        open={showAlbumForm}
        onOpenChange={setShowAlbumForm}
        onSubmit={handleAlbumSubmit}
        initialData={editingAlbum || undefined}
        loading={false}
      />

      {/* Confirm Dialog */}
      {ConfirmDialog}
    </div>
  );
}
