"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { AlbumForm } from "@/components/forms/album-form";
import { AlbumFilter } from "@/components/ui/album-filter";
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
  const [filterOpen, setFilterOpen] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState<Record<string, string>>(
    {}
  );
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
      coverImage: "/api/placeholder/300/300",
      status: "published",
      songCount: 12,
      duration: "45:30",
      totalPlays: 125000,
      createdAt: "2024-06-01T10:00:00Z",
      updatedAt: "2024-06-15T14:30:00Z",
    },
    {
      id: "2",
      title: "Midnight Dreams",
      artist: "Sarah Wilson",
      artistId: "2",
      releaseDate: "2024-05-20",
      genre: "electronic",
      description: "Electronic beats for late night listening",
      status: "published",
      songCount: 8,
      duration: "32:15",
      totalPlays: 89000,
      createdAt: "2024-05-10T09:00:00Z",
      updatedAt: "2024-05-20T16:45:00Z",
    },
    {
      id: "3",
      title: "Acoustic Sessions",
      artist: "Mike Johnson",
      artistId: "3",
      releaseDate: "2024-04-10",
      genre: "folk",
      description: "Intimate acoustic performances",
      coverImage: "/api/placeholder/300/300",
      status: "draft",
      songCount: 6,
      duration: "28:45",
      totalPlays: 45000,
      createdAt: "2024-04-01T11:00:00Z",
      updatedAt: "2024-04-10T13:20:00Z",
    },
    {
      id: "4",
      title: "Urban Vibes",
      artist: "Alex Chen",
      artistId: "4",
      releaseDate: "2024-03-25",
      genre: "hip-hop",
      description: "Fresh urban sounds from the city",
      coverImage: "/api/placeholder/300/300",
      status: "published",
      songCount: 15,
      duration: "52:10",
      totalPlays: 200000,
      createdAt: "2024-03-15T08:00:00Z",
      updatedAt: "2024-03-25T12:00:00Z",
    },
    {
      id: "5",
      title: "Classical Moments",
      artist: "Emma Davis",
      artistId: "5",
      releaseDate: "2024-02-14",
      genre: "classical",
      description: "Timeless classical compositions",
      coverImage: "/api/placeholder/300/300",
      status: "archived",
      songCount: 10,
      duration: "38:20",
      totalPlays: 75000,
      createdAt: "2024-02-01T14:00:00Z",
      updatedAt: "2024-02-14T10:30:00Z",
    },
  ];

  const filteredAlbums = albums.filter((album) => {
    // Existing search and status filters
    const matchesSearch =
      album.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      album.artist.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || album.status === statusFilter;

    // Applied filters from filter modal
    if (
      appliedFilters.search &&
      !album.title
        .toLowerCase()
        .includes(appliedFilters.search.toLowerCase()) &&
      !album.artist.toLowerCase().includes(appliedFilters.search.toLowerCase())
    ) {
      return false;
    }

    if (appliedFilters.status && album.status !== appliedFilters.status) {
      return false;
    }

    if (appliedFilters.artist && album.artist !== appliedFilters.artist) {
      return false;
    }

    if (
      appliedFilters.dateFrom &&
      album.releaseDate < appliedFilters.dateFrom
    ) {
      return false;
    }

    if (appliedFilters.dateTo && album.releaseDate > appliedFilters.dateTo) {
      return false;
    }

    return matchesSearch && matchesStatus;
  });

  const handleAlbumSubmit = async (data: any) => {
    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Album submitted:", data);
    setAlbumFormOpen(false);
    setEditingAlbum(null);
    setLoading(false);
  };

  const handleEditAlbum = (album: any) => {
    setEditingAlbum(album);
    setAlbumFormOpen(true);
  };

  const handleToggleStatus = (albumId: string) => {
    console.log("Toggle status for album:", albumId);
  };

  const handleDeleteAlbum = async (albumId: string) => {
    const album = albums.find((a) => a.id === albumId);
    const confirmed = await confirm({
      title: "Delete Album",
      description: `Are you sure you want to delete "${album?.title}" by ${album?.artist}? This will also remove all songs in this album. This action cannot be undone.`,
      variant: "destructive",
      confirmText: "Delete Album",
      cancelText: "Cancel",
      onConfirm: () => {
        console.log("Album deleted:", albumId);
        // Add actual delete logic here
      },
    });

    if (confirmed) {
      setLoading(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Album deleted:", albumId);
      setLoading(false);
    }
  };

  const handleApplyFilters = (filters: Record<string, string>) => {
    setAppliedFilters(filters);
  };

  const handleClearFilters = () => {
    setAppliedFilters({});
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "draft":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "archived":
        return "bg-gray-500/20 text-gray-400 border-spotify-light-gray/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-spotify-light-gray/30";
    }
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
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Albums</h1>
        <p className="text-spotify-text-gray mt-2">
          Manage and organize your music albums
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-spotify-gray border-spotify-light-gray">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-spotify-text-gray">
                  Total Albums
                </p>
                <p className="text-2xl font-bold text-white">{albums.length}</p>
              </div>
              <div className="h-12 w-12 bg-spotify-green/20 rounded-lg flex items-center justify-center">
                <Album className="h-6 w-6 text-spotify-green" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-spotify-gray border-spotify-light-gray">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-spotify-text-gray">
                  Published
                </p>
                <p className="text-2xl font-bold text-white">
                  {albums.filter((a) => a.status === "published").length}
                </p>
              </div>
              <div className="h-12 w-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                <Eye className="h-6 w-6 text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-spotify-gray border-spotify-light-gray">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-spotify-text-gray">
                  Drafts
                </p>
                <p className="text-2xl font-bold text-white">
                  {albums.filter((a) => a.status === "draft").length}
                </p>
              </div>
              <div className="h-12 w-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                <EyeOff className="h-6 w-6 text-yellow-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-spotify-gray border-spotify-light-gray">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-spotify-text-gray">
                  Total Plays
                </p>
                <p className="text-2xl font-bold text-white">
                  {formatNumber(
                    albums.reduce((sum, album) => sum + album.totalPlays, 0)
                  )}
                </p>
              </div>
              <div className="h-12 w-12 bg-spotify-green/20 rounded-lg flex items-center justify-center">
                <Music className="h-6 w-6 text-spotify-green" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="bg-spotify-gray border-spotify-light-gray">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-spotify-text-gray h-4 w-4" />
                <Input
                  placeholder="Search albums..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 bg-spotify-light-gray border border-spotify-light-gray text-white placeholder:text-spotify-text-gray focus:border-spotify-green focus:ring-2 focus:ring-spotify-green/20"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <div className="custom-select-wrapper">
                <select
                  value={statusFilter}
                  onChange={(e) =>
                    setStatusFilter(
                      e.target.value as
                        | "all"
                        | "draft"
                        | "published"
                        | "archived"
                    )
                  }
                  className="bg-spotify-light-gray border border-spotify-light-gray text-white focus:border-spotify-green focus:ring-2 focus:ring-spotify-green/20 rounded-md px-3 py-2"
                >
                  <option
                    value="all"
                    className="bg-spotify-light-gray text-white"
                  >
                    All Status
                  </option>
                  <option
                    value="published"
                    className="bg-spotify-light-gray text-white"
                  >
                    Published
                  </option>
                  <option
                    value="draft"
                    className="bg-spotify-light-gray text-white"
                  >
                    Draft
                  </option>
                  <option
                    value="archived"
                    className="bg-spotify-light-gray text-white"
                  >
                    Archived
                  </option>
                </select>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="border-spotify-light-gray text-spotify-text-gray hover:bg-spotify-hover hover:text-white"
                onClick={() => setFilterOpen(true)}
              >
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Albums Table */}
      <Card className="bg-spotify-gray border-spotify-light-gray">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-white">All Albums</CardTitle>
              <CardDescription className="text-spotify-text-gray">
                {filteredAlbums.length} album
                {filteredAlbums.length !== 1 ? "s" : ""} found
              </CardDescription>
            </div>
            <Button
              onClick={() => {
                setEditingAlbum(null);
                setAlbumFormOpen(true);
              }}
              className="bg-spotify-green hover:bg-spotify-green-dark text-black font-medium"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add New Album
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredAlbums.map((album) => (
              <div
                key={album.id}
                className="flex items-center justify-between p-4 bg-spotify-gray rounded-lg border border-spotify-light-gray hover:bg-spotify-hover transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={album.coverImage} alt={album.title} />
                    <AvatarFallback className="bg-spotify-light-gray">
                      <Music className="h-6 w-6 text-spotify-green" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-white truncate">
                      {album.title}
                    </h3>
                    <p className="text-sm text-spotify-text-gray truncate">
                      by {album.artist}
                    </p>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-xs text-spotify-text-gray">
                        {album.songCount} songs
                      </span>
                      <span className="text-xs text-spotify-text-gray">
                        {album.duration}
                      </span>
                      <span className="text-xs text-spotify-text-gray">
                        {formatNumber(album.totalPlays)} plays
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                      album.status
                    )}`}
                  >
                    {album.status}
                  </span>
                  <div className="flex items-center space-x-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEditAlbum(album)}
                      className="h-8 w-8 text-blue-400 hover:text-blue-300 hover:bg-blue-400/10"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleToggleStatus(album.id)}
                      className="h-8 w-8 text-yellow-400 hover:text-yellow-300 hover:bg-yellow-400/10"
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
                      onClick={() => handleDeleteAlbum(album.id)}
                      className="h-8 w-8 text-red-400 hover:text-red-300 hover:bg-red-400/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-gray-400 hover:text-gray-300 hover:bg-gray-400/10"
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

      {/* Album Form */}
      <AlbumForm
        open={albumFormOpen}
        onOpenChange={setAlbumFormOpen}
        onSubmit={handleAlbumSubmit}
        initialData={editingAlbum}
        loading={loading}
      />

      {/* Album Filter */}
      <AlbumFilter
        isOpen={filterOpen}
        onClose={() => setFilterOpen(false)}
        onApply={handleApplyFilters}
        onClear={handleClearFilters}
        appliedFilters={appliedFilters}
      />

      {/* Confirm Dialog */}
      {ConfirmDialog}
    </div>
  );
}
