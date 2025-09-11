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
import { Avatar } from "@/components/ui/avatar";
import { AlbumForm } from "@/components/forms/album-form";
import { useConfirmDialog } from "@/components/ui/confirm-dialog";
import {
  Album,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Plus,
  Music,
  Calendar,
  Clock,
  User,
  ExternalLink,
} from "lucide-react";
import { useState } from "react";

export default function AdminAlbums() {
  const [albumFormOpen, setAlbumFormOpen] = useState(false);
  const [editingAlbum, setEditingAlbum] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "draft" | "published" | "archived"
  >("all");
  const { confirm, ConfirmDialog } = useConfirmDialog();

  const albums = [
    {
      id: "1",
      title: "Summer Collection",
      artist: "John Doe",
      artistId: "1",
      releaseDate: "2024-06-15",
      genre: "pop",
      description: "A collection of summer hits and feel-good songs",
      coverImage: "",
      totalTracks: 12,
      duration: "45:30",
      status: "published" as const,
      label: "Universal Music",
      copyright: "© 2024 Universal Music",
      language: "en",
      explicit: false,
      tags: ["summer", "pop", "feel-good"],
      plays: 125430,
      likes: 8940,
      createdAt: "2024-06-01",
    },
    {
      id: "2",
      title: "Midnight Dreams",
      artist: "Jane Smith",
      artistId: "2",
      releaseDate: "2024-05-20",
      genre: "electronic",
      description: "Electronic ambient music for late night listening",
      coverImage: "",
      totalTracks: 8,
      duration: "38:45",
      status: "published" as const,
      label: "Independent",
      copyright: "© 2024 Jane Smith",
      language: "en",
      explicit: false,
      tags: ["electronic", "ambient", "night"],
      plays: 67890,
      likes: 4320,
      createdAt: "2024-05-15",
    },
    {
      id: "3",
      title: "Urban Stories",
      artist: "Mike Johnson",
      artistId: "3",
      releaseDate: "2024-04-10",
      genre: "hip-hop",
      description: "Raw and authentic hip-hop storytelling",
      coverImage: "",
      totalTracks: 15,
      duration: "52:15",
      status: "draft" as const,
      label: "Def Jam",
      copyright: "© 2024 Def Jam Recordings",
      language: "en",
      explicit: true,
      tags: ["hip-hop", "urban", "storytelling"],
      plays: 23450,
      likes: 1890,
      createdAt: "2024-04-05",
    },
    {
      id: "4",
      title: "Jazz Nights",
      artist: "Sarah Wilson",
      artistId: "4",
      releaseDate: "2024-03-25",
      genre: "jazz",
      description: "Smooth jazz for sophisticated evenings",
      coverImage: "",
      totalTracks: 10,
      duration: "41:20",
      status: "published" as const,
      label: "Blue Note",
      copyright: "© 2024 Blue Note Records",
      language: "en",
      explicit: false,
      tags: ["jazz", "smooth", "evening"],
      plays: 45670,
      likes: 3210,
      createdAt: "2024-03-20",
    },
    {
      id: "5",
      title: "Rock Revolution",
      artist: "David Brown",
      artistId: "5",
      releaseDate: "2024-02-14",
      genre: "rock",
      description: "High-energy rock anthems for the modern age",
      coverImage: "",
      totalTracks: 14,
      duration: "48:30",
      status: "archived" as const,
      label: "Warner Music",
      copyright: "© 2024 Warner Music Group",
      language: "en",
      explicit: true,
      tags: ["rock", "energy", "anthems"],
      plays: 78920,
      likes: 5670,
      createdAt: "2024-02-10",
    },
  ];

  const handleAlbumSubmit = async (data: any) => {
    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Album data:", data);
    setLoading(false);
    setAlbumFormOpen(false);
    setEditingAlbum(null);
  };

  const handleAddAlbum = () => {
    setEditingAlbum(null);
    setAlbumFormOpen(true);
  };

  const handleEditAlbum = (album: any) => {
    setEditingAlbum(album);
    setAlbumFormOpen(true);
  };

  const handleToggleStatus = (albumId: string) => {
    console.log("Toggle status for album:", albumId);
  };

  const handleDeleteAlbum = async (albumId: string) => {
    const album = albums.find(a => a.id === albumId);
    const confirmed = await confirm({
      title: "Delete Album",
      description: `Are you sure you want to delete "${album?.title}" by ${album?.artist}? This will also remove all songs in this album. This action cannot be undone.`,
      variant: "destructive",
      confirmText: "Delete Album",
      cancelText: "Cancel"
    });

    if (confirmed) {
      setLoading(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Album deleted:", albumId);
      setLoading(false);
    }
  };

  const filteredAlbums = albums.filter((album) => {
    const matchesSearch =
      album.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      album.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
      album.genre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      album.label?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || album.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getGenreColor = (genre: string) => {
    const colors: { [key: string]: string } = {
      pop: "bg-pink-500/20 text-pink-400",
      rock: "bg-red-500/20 text-red-400",
      "hip-hop": "bg-purple-500/20 text-purple-400",
      electronic: "bg-blue-500/20 text-blue-400",
      jazz: "bg-yellow-500/20 text-yellow-400",
      classical: "bg-indigo-500/20 text-indigo-400",
      country: "bg-green-500/20 text-green-400",
      "r&b": "bg-orange-500/20 text-orange-400",
      blues: "bg-cyan-500/20 text-cyan-400",
      folk: "bg-emerald-500/20 text-emerald-400",
      reggae: "bg-lime-500/20 text-lime-400",
      other: "bg-gray-500/20 text-gray-400",
    };
    return colors[genre] || colors.other;
  };

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      draft: "bg-yellow-500/20 text-yellow-400",
      published: "bg-green-500/20 text-green-400",
      archived: "bg-gray-500/20 text-gray-400",
    };
    return colors[status] || colors.draft;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  };

  return (
    <MainLayout userType="admin">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Manage Albums</h1>
            <p className="text-spotify-text-gray mt-2">
              Manage album releases, metadata, and content
            </p>
          </div>
        </div>

        {/* Search and Filters */}
        <Card className="bg-spotify-gray border-spotify-light-gray">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/70" />
                  <Input
                    placeholder="Search albums by title, artist, genre, or label..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-spotify-light-gray border-0 text-white placeholder:text-spotify-text-gray"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant={
                    statusFilter === "all" ? "spotify" : "spotifySecondary"
                  }
                  size="sm"
                  onClick={() => setStatusFilter("all")}
                >
                  All
                </Button>
                <Button
                  variant={
                    statusFilter === "published"
                      ? "spotify"
                      : "spotifySecondary"
                  }
                  size="sm"
                  onClick={() => setStatusFilter("published")}
                >
                  Published
                </Button>
                <Button
                  variant={
                    statusFilter === "draft" ? "spotify" : "spotifySecondary"
                  }
                  size="sm"
                  onClick={() => setStatusFilter("draft")}
                >
                  Draft
                </Button>
                <Button
                  variant={
                    statusFilter === "archived" ? "spotify" : "spotifySecondary"
                  }
                  size="sm"
                  onClick={() => setStatusFilter("archived")}
                >
                  Archived
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Albums Table */}
        <Card className="bg-spotify-gray border-spotify-light-gray">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Album className="h-5 w-5 text-spotify-green" />
              Albums ({filteredAlbums.length})
            </CardTitle>
            <CardDescription className="text-spotify-text-gray">
              Manage album releases and their metadata
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-spotify-light-gray">
                  <tr>
                    <th className="text-left p-4 text-sm font-medium text-spotify-text-gray">
                      Album
                    </th>
                    <th className="text-left p-4 text-sm font-medium text-spotify-text-gray">
                      Artist
                    </th>
                    <th className="text-left p-4 text-sm font-medium text-spotify-text-gray">
                      Genre
                    </th>
                    <th className="text-left p-4 text-sm font-medium text-spotify-text-gray">
                      Tracks
                    </th>
                    <th className="text-left p-4 text-sm font-medium text-spotify-text-gray">
                      Status
                    </th>
                    <th className="text-left p-4 text-sm font-medium text-spotify-text-gray">
                      Plays
                    </th>
                    <th className="text-left p-4 text-sm font-medium text-spotify-text-gray">
                      Release Date
                    </th>
                    <th className="text-left p-4 text-sm font-medium text-spotify-text-gray">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAlbums.map((album) => (
                    <tr
                      key={album.id}
                      className="border-b border-spotify-light-gray hover:bg-spotify-hover transition-colors"
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-spotify-light-gray rounded-lg flex items-center justify-center overflow-hidden">
                            {album.coverImage ? (
                              <img
                                src={album.coverImage}
                                alt={album.title}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <Album className="h-6 w-6 text-white/70" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-white">
                              {album.title}
                            </p>
                            <p className="text-sm text-spotify-text-gray">
                              {album.label}
                            </p>
                            {album.explicit && (
                              <span className="text-xs text-red-400 font-bold">
                                EXPLICIT
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-white/70" />
                          <span className="text-white">{album.artist}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getGenreColor(
                            album.genre
                          )}`}
                        >
                          {album.genre.charAt(0).toUpperCase() +
                            album.genre.slice(1)}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-1 text-sm text-white">
                          <Music className="h-4 w-4 text-white/70" />
                          {album.totalTracks}
                        </div>
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            album.status
                          )}`}
                        >
                          {album.status.charAt(0).toUpperCase() +
                            album.status.slice(1)}
                        </span>
                      </td>
                      <td className="p-4 text-sm text-white">
                        {formatNumber(album.plays)}
                      </td>
                      <td className="p-4 text-sm text-spotify-text-gray">
                        {formatDate(album.releaseDate)}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-blue-400 hover:text-blue-300 hover:bg-blue-400/10"
                            onClick={() => handleEditAlbum(album)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-yellow-400 hover:text-yellow-300 hover:bg-yellow-400/10"
                            onClick={() => handleToggleStatus(album.id)}
                          >
                            {album.status === "published" ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-red-400 hover:text-red-300 hover:bg-red-400/10"
                            onClick={() => handleDeleteAlbum(album.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Add Album Button */}
        <div className="mt-6 flex justify-end">
          <Button
            onClick={handleAddAlbum}
            className="bg-gradient-to-r from-spotify-green to-spotify-green-hover hover:from-spotify-green-hover hover:to-spotify-green text-black font-bold"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New Album
          </Button>
        </div>
      </div>

      {/* Album Form */}
      <AlbumForm
        open={albumFormOpen}
        onOpenChange={setAlbumFormOpen}
        onSubmit={handleAlbumSubmit}
        initialData={editingAlbum}
        loading={loading}
      />

      {/* Confirm Dialog */}
      <ConfirmDialog />
    </MainLayout>
  );
}
