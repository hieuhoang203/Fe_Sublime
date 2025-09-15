"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { GenreForm } from "@/components/forms/genre-form";
import {
  ConfirmDialog,
  useConfirmDialog,
} from "@/components/ui/confirm-dialog";
import {
  Music,
  Plus,
  Search,
  Edit,
  Trash2,
  Filter,
  MoreHorizontal,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Genre {
  id: string;
  name: string;
  description?: string;
  color?: string;
  songCount?: number;
  createdAt: string;
  updatedAt: string;
}

export default function AdminGenres() {
  const { confirm, ConfirmDialog } = useConfirmDialog();
  const [showForm, setShowForm] = useState(false);
  const [editingGenre, setEditingGenre] = useState<Genre | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterColor, setFilterColor] = useState<string>("all");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Mock data - replace with actual API calls
  const [genres, setGenres] = useState<Genre[]>([
    {
      id: "1",
      name: "Pop",
      description: "Popular music with catchy melodies and mainstream appeal",
      color: "#1DB954",
      songCount: 245,
      createdAt: "2024-01-15",
      updatedAt: "2024-01-15",
    },
    {
      id: "2",
      name: "Rock",
      description:
        "Guitar-driven music with strong rhythms and powerful vocals",
      color: "#FF6B6B",
      songCount: 189,
      createdAt: "2024-01-15",
      updatedAt: "2024-01-15",
    },
    {
      id: "3",
      name: "Electronic",
      description: "Music created using electronic instruments and technology",
      color: "#4ECDC4",
      songCount: 156,
      createdAt: "2024-01-15",
      updatedAt: "2024-01-15",
    },
    {
      id: "4",
      name: "Hip Hop",
      description: "Rhythmic music with rapping and urban culture influences",
      color: "#45B7D1",
      songCount: 203,
      createdAt: "2024-01-15",
      updatedAt: "2024-01-15",
    },
    {
      id: "5",
      name: "Jazz",
      description: "Improvisational music with complex harmonies and rhythms",
      color: "#96CEB4",
      songCount: 78,
      createdAt: "2024-01-15",
      updatedAt: "2024-01-15",
    },
    {
      id: "6",
      name: "Classical",
      description: "Traditional orchestral and chamber music",
      color: "#FFEAA7",
      songCount: 92,
      createdAt: "2024-01-15",
      updatedAt: "2024-01-15",
    },
  ]);

  const filteredGenres = genres.filter((genre) => {
    const matchesSearch = genre.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesColor = filterColor === "all" || genre.color === filterColor;
    return matchesSearch && matchesColor;
  });

  const handleCreateGenre = async (
    genreData: Omit<Genre, "id" | "createdAt" | "updatedAt">
  ) => {
    setLoading(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const newGenre: Genre = {
        ...genreData,
        id: Date.now().toString(),
        songCount: 0,
        createdAt: new Date().toISOString().split("T")[0],
        updatedAt: new Date().toISOString().split("T")[0],
      };

      setGenres((prev) => [newGenre, ...prev]);
      setShowForm(false);
    } catch (err) {
      setError("Failed to create genre. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateGenre = async (
    genreData: Omit<Genre, "id" | "createdAt" | "updatedAt">
  ) => {
    if (!editingGenre) return;

    setLoading(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setGenres((prev) =>
        prev.map((genre) =>
          genre.id === editingGenre.id
            ? {
                ...genre,
                ...genreData,
                updatedAt: new Date().toISOString().split("T")[0],
              }
            : genre
        )
      );

      setEditingGenre(null);
    } catch (err) {
      setError("Failed to update genre. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteGenre = async (genreId: string) => {
    const genre = genres.find((g) => g.id === genreId);
    if (!genre) return;

    const confirmed = await confirm({
      title: "Delete Genre",
      description: `Are you sure you want to delete "${genre.name}"? This action cannot be undone.`,
      confirmText: "Delete",
      cancelText: "Cancel",
      onConfirm: () => {
        // Delete logic will be handled here
        console.log("Deleting genre:", genreId);
      },
    });

    if (!confirmed) return;

    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      setGenres((prev) => prev.filter((g) => g.id !== genreId));
    } catch (err) {
      setError("Failed to delete genre. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleEditGenre = (genre: Genre) => {
    setEditingGenre(genre);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingGenre(null);
    setError(null);
  };

  const colorOptions = [
    { value: "all", label: "All Colors" },
    { value: "#1DB954", label: "Green" },
    { value: "#FF6B6B", label: "Red" },
    { value: "#4ECDC4", label: "Teal" },
    { value: "#45B7D1", label: "Blue" },
    { value: "#96CEB4", label: "Mint" },
    { value: "#FFEAA7", label: "Yellow" },
  ];

  if (showForm) {
    return (
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Button
              variant="ghost"
              onClick={handleCancelForm}
              className="text-spotify-text-gray hover:text-white mb-4"
            >
              ← Back to Genres
            </Button>
            <h1 className="text-2xl font-bold text-white">
              {editingGenre ? "Edit Genre" : "Add New Genre"}
            </h1>
          </div>

          <GenreForm
            genre={editingGenre}
            onSubmit={editingGenre ? handleUpdateGenre : handleCreateGenre}
            onCancel={handleCancelForm}
            loading={loading}
            error={error || undefined}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Genres</h1>
            <p className="text-spotify-text-gray">
              Manage music genres and categories
            </p>
          </div>
          <Button
            onClick={() => setShowForm(true)}
            className="bg-spotify-green hover:bg-spotify-green-hover text-black font-medium"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Genre
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-spotify-text-gray" />
              <Input
                type="text"
                placeholder="Search genres..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 bg-spotify-light-gray border-spotify-text-gray focus:border-spotify-green"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={filterColor}
              onChange={(e) => setFilterColor(e.target.value)}
              className="px-3 py-2 bg-spotify-light-gray border border-spotify-text-gray rounded-lg text-white focus:outline-none focus:border-spotify-green"
            >
              {colorOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">
            {error}
          </div>
        )}

        {/* Genres Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGenres.map((genre) => (
            <Card
              key={genre.id}
              className="bg-spotify-light-gray border-spotify-text-gray hover:border-spotify-green/50 transition-all duration-200 group"
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center shadow-lg"
                      style={{ backgroundColor: genre.color }}
                    >
                      <Music className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-white text-lg">
                        {genre.name}
                      </CardTitle>
                      <p className="text-spotify-text-gray text-sm">
                        {genre.songCount} songs
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEditGenre(genre)}
                      className="h-8 w-8 text-spotify-text-gray hover:text-white hover:bg-white/10 opacity-0 group-hover:opacity-100 transition-all duration-200"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteGenre(genre.id)}
                      className="h-8 w-8 text-spotify-text-gray hover:text-red-400 hover:bg-red-500/10 opacity-0 group-hover:opacity-100 transition-all duration-200"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                {genre.description && (
                  <p className="text-spotify-text-gray text-sm mb-4 line-clamp-2">
                    {genre.description}
                  </p>
                )}

                <div className="flex items-center justify-between text-xs text-spotify-text-gray">
                  <span>Created: {genre.createdAt}</span>
                  <span>Updated: {genre.updatedAt}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredGenres.length === 0 && (
          <div className="text-center py-12">
            <Music className="h-16 w-16 text-spotify-text-gray mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              {searchTerm || filterColor !== "all"
                ? "No genres found"
                : "No genres yet"}
            </h3>
            <p className="text-spotify-text-gray mb-6">
              {searchTerm || filterColor !== "all"
                ? "Try adjusting your search or filter criteria"
                : "Get started by creating your first genre"}
            </p>
            {!searchTerm && filterColor === "all" && (
              <Button
                onClick={() => setShowForm(true)}
                className="bg-spotify-green hover:bg-spotify-green-hover text-black font-medium"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add First Genre
              </Button>
            )}
          </div>
        )}

        {/* Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-spotify-light-gray border-spotify-text-gray">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-spotify-green/20 rounded-full flex items-center justify-center">
                  <Music className="h-5 w-5 text-spotify-green" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">
                    {genres.length}
                  </p>
                  <p className="text-spotify-text-gray text-sm">Total Genres</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-spotify-light-gray border-spotify-text-gray">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                  <Music className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">
                    {genres.reduce(
                      (sum, genre) => sum + (genre.songCount || 0),
                      0
                    )}
                  </p>
                  <p className="text-spotify-text-gray text-sm">Total Songs</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-spotify-light-gray border-spotify-text-gray">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center">
                  <Music className="h-5 w-5 text-purple-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">
                    {Math.round(
                      genres.reduce(
                        (sum, genre) => sum + (genre.songCount || 0),
                        0
                      ) / genres.length
                    ) || 0}
                  </p>
                  <p className="text-spotify-text-gray text-sm">
                    Avg Songs/Genre
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {ConfirmDialog}
    </div>
  );
}
