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
import { ArtistForm } from "@/components/forms/artist-form";
import {
  Mic,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  UserCheck,
  UserX,
  Plus,
  Music,
  Users,
  MapPin,
  Calendar,
  ExternalLink,
} from "lucide-react";
import { useState } from "react";

export default function AdminArtists() {
  const [artistFormOpen, setArtistFormOpen] = useState(false);
  const [editingArtist, setEditingArtist] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "active" | "inactive"
  >("all");

  const artists = [
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      phone: "+1 234 567 8900",
      status: "active" as const,
      joinDate: "2024-01-15",
      lastActive: "2 hours ago",
      avatar: "",
      bio: "Singer-songwriter with a passion for acoustic music",
      location: "Los Angeles, CA",
      genre: "pop",
      followers: 12543,
      totalSongs: 24,
      socialLinks: {
        instagram: "https://instagram.com/johndoe",
        twitter: "https://twitter.com/johndoe",
        youtube: "https://youtube.com/johndoe",
        spotify: "https://open.spotify.com/artist/johndoe",
      },
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "+1 234 567 8901",
      status: "active" as const,
      joinDate: "2024-01-10",
      lastActive: "1 day ago",
      avatar: "",
      bio: "Electronic music producer and DJ",
      location: "New York, NY",
      genre: "electronic",
      followers: 8567,
      totalSongs: 18,
      socialLinks: {
        instagram: "https://instagram.com/janesmith",
        twitter: "https://twitter.com/janesmith",
        youtube: "https://youtube.com/janesmith",
        spotify: "https://open.spotify.com/artist/janesmith",
      },
    },
    {
      id: "3",
      name: "Mike Johnson",
      email: "mike@example.com",
      phone: "+1 234 567 8902",
      status: "inactive" as const,
      joinDate: "2024-01-05",
      lastActive: "1 week ago",
      avatar: "",
      bio: "Rock guitarist and vocalist",
      location: "Chicago, IL",
      genre: "rock",
      followers: 21000,
      totalSongs: 35,
      socialLinks: {
        instagram: "https://instagram.com/mikejohnson",
        twitter: "https://twitter.com/mikejohnson",
        youtube: "https://youtube.com/mikejohnson",
        spotify: "https://open.spotify.com/artist/mikejohnson",
      },
    },
    {
      id: "4",
      name: "Sarah Wilson",
      email: "sarah@example.com",
      phone: "+1 234 567 8903",
      status: "active" as const,
      joinDate: "2024-01-20",
      lastActive: "3 hours ago",
      avatar: "",
      bio: "Jazz vocalist and pianist",
      location: "New Orleans, LA",
      genre: "jazz",
      followers: 15432,
      totalSongs: 12,
      socialLinks: {
        instagram: "https://instagram.com/sarahwilson",
        twitter: "https://twitter.com/sarahwilson",
        youtube: "https://youtube.com/sarahwilson",
        spotify: "https://open.spotify.com/artist/sarahwilson",
      },
    },
    {
      id: "5",
      name: "David Brown",
      email: "david@example.com",
      phone: "+1 234 567 8904",
      status: "active" as const,
      joinDate: "2024-01-18",
      lastActive: "5 minutes ago",
      avatar: "",
      bio: "Hip-hop artist and producer",
      location: "Atlanta, GA",
      genre: "hip-hop",
      followers: 32000,
      totalSongs: 28,
      socialLinks: {
        instagram: "https://instagram.com/davidbrown",
        twitter: "https://twitter.com/davidbrown",
        youtube: "https://youtube.com/davidbrown",
        spotify: "https://open.spotify.com/artist/davidbrown",
      },
    },
  ];

  const handleArtistSubmit = async (data: any) => {
    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Artist data:", data);
    setLoading(false);
    setArtistFormOpen(false);
    setEditingArtist(null);
  };

  const handleAddArtist = () => {
    setEditingArtist(null);
    setArtistFormOpen(true);
  };

  const handleEditArtist = (artist: any) => {
    setEditingArtist(artist);
    setArtistFormOpen(true);
  };

  const handleToggleStatus = (artistId: string) => {
    console.log("Toggle status for artist:", artistId);
  };

  const handleDeleteArtist = (artistId: string) => {
    console.log("Delete artist:", artistId);
  };

  const filteredArtists = artists.filter((artist) => {
    const matchesSearch =
      artist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artist.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artist.genre.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || artist.status === statusFilter;
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
      other: "bg-gray-500/20 text-gray-400",
    };
    return colors[genre] || colors.other;
  };

  return (
    <MainLayout userType="admin">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Manage Artists</h1>
            <p className="text-spotify-text-gray mt-2">
              Manage artist profiles, music, and performance data
            </p>
          </div>
        </div>

        {/* Search and Filters */}
        <Card className="bg-spotify-gray border-spotify-light-gray">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-spotify-text-gray" />
                  <Input
                    placeholder="Search artists by name, email, or genre..."
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
                    statusFilter === "active" ? "spotify" : "spotifySecondary"
                  }
                  size="sm"
                  onClick={() => setStatusFilter("active")}
                >
                  Active
                </Button>
                <Button
                  variant={
                    statusFilter === "inactive" ? "spotify" : "spotifySecondary"
                  }
                  size="sm"
                  onClick={() => setStatusFilter("inactive")}
                >
                  Inactive
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Artists Table */}
        <Card className="bg-spotify-gray border-spotify-light-gray">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Mic className="h-5 w-5 text-spotify-green" />
              Artists ({filteredArtists.length})
            </CardTitle>
            <CardDescription className="text-spotify-text-gray">
              Manage artist profiles and their music content
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-spotify-light-gray">
                  <tr>
                    <th className="text-left p-4 text-sm font-medium text-spotify-text-gray">
                      Artist
                    </th>
                    <th className="text-left p-4 text-sm font-medium text-spotify-text-gray">
                      Genre
                    </th>
                    <th className="text-left p-4 text-sm font-medium text-spotify-text-gray">
                      Followers
                    </th>
                    <th className="text-left p-4 text-sm font-medium text-spotify-text-gray">
                      Songs
                    </th>
                    <th className="text-left p-4 text-sm font-medium text-spotify-text-gray">
                      Status
                    </th>
                    <th className="text-left p-4 text-sm font-medium text-spotify-text-gray">
                      Last Active
                    </th>
                    <th className="text-left p-4 text-sm font-medium text-spotify-text-gray">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredArtists.map((artist) => (
                    <tr
                      key={artist.id}
                      className="border-b border-spotify-light-gray hover:bg-spotify-hover transition-colors"
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <Avatar
                            src={artist.avatar}
                            fallback={artist.name.charAt(0).toUpperCase()}
                            size="sm"
                          />
                          <div>
                            <p className="font-medium text-white">
                              {artist.name}
                            </p>
                            <p className="text-sm text-spotify-text-gray">
                              {artist.email}
                            </p>
                            {artist.location && (
                              <div className="flex items-center gap-1 text-xs text-spotify-text-gray">
                                <MapPin className="h-3 w-3" />
                                {artist.location}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getGenreColor(
                            artist.genre
                          )}`}
                        >
                          {artist.genre.charAt(0).toUpperCase() +
                            artist.genre.slice(1)}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-1 text-sm text-white">
                          <Users className="h-4 w-4 text-spotify-text-gray" />
                          {artist.followers.toLocaleString()}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-1 text-sm text-white">
                          <Music className="h-4 w-4 text-spotify-text-gray" />
                          {artist.totalSongs}
                        </div>
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            artist.status === "active"
                              ? "bg-green-500/20 text-green-400"
                              : "bg-red-500/20 text-red-400"
                          }`}
                        >
                          {artist.status.charAt(0).toUpperCase() +
                            artist.status.slice(1)}
                        </span>
                      </td>
                      <td className="p-4 text-sm text-spotify-text-gray">
                        {artist.lastActive}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-blue-400 hover:text-blue-300 hover:bg-blue-400/10"
                            onClick={() => handleEditArtist(artist)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-yellow-400 hover:text-yellow-300 hover:bg-yellow-400/10"
                            onClick={() => handleToggleStatus(artist.id)}
                          >
                            {artist.status === "active" ? (
                              <UserX className="h-4 w-4" />
                            ) : (
                              <UserCheck className="h-4 w-4" />
                            )}
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-red-400 hover:text-red-300 hover:bg-red-400/10"
                            onClick={() => handleDeleteArtist(artist.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                          {artist.socialLinks?.spotify && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-green-400 hover:text-green-300 hover:bg-green-400/10"
                              onClick={() =>
                                window.open(
                                  artist.socialLinks.spotify,
                                  "_blank"
                                )
                              }
                            >
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Add Artist Button */}
        <div className="mt-6 flex justify-end">
          <Button
            onClick={handleAddArtist}
            className="bg-gradient-to-r from-spotify-green to-spotify-green-hover hover:from-spotify-green-hover hover:to-spotify-green text-black font-bold"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New Artist
          </Button>
        </div>
      </div>

      {/* Artist Form */}
      <ArtistForm
        open={artistFormOpen}
        onOpenChange={setArtistFormOpen}
        onSubmit={handleArtistSubmit}
        initialData={editingArtist}
        loading={loading}
      />
    </MainLayout>
  );
}
