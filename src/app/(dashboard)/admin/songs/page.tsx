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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SongForm } from "@/components/forms/song-form";
import { useConfirmDialog } from "@/components/ui/confirm-dialog";
import { useSongDrawer } from "@/contexts/song-drawer-context";
import {
  Music,
  Search,
  Filter,
  MoreHorizontal,
  Check,
  X,
  Play,
  Pause,
  Clock,
  User,
  Album,
  Plus,
  Edit,
  Trash2,
} from "lucide-react";
import { useState } from "react";

export default function AdminSongs() {
  const [activeTab, setActiveTab] = useState<
    "all" | "pending" | "approved" | "rejected"
  >("all");
  const [songFormOpen, setSongFormOpen] = useState(false);
  const [editingSong, setEditingSong] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const { confirm, ConfirmDialog } = useConfirmDialog();
  const { openDrawer } = useSongDrawer();

  const songs = [
    {
      id: "1",
      title: "Summer Vibes",
      artist: "John Doe",
      album: "Summer Collection",
      duration: 225, // 3:45 in seconds
      status: "approved" as const,
      uploadDate: "2024-01-15",
      plays: 12345,
      genre: "pop",
      coverImage: "",
      coverUrl: "",
      isLiked: false,
      releaseDate: "2024-01-15",
      playCount: 12345,
      lyrics:
        "Summer vibes are calling me\nTo the beach where I want to be\nWaves are crashing on the shore\nThis is what I'm living for",
    },
    {
      id: "2",
      title: "Midnight Dreams",
      artist: "Jane Smith",
      album: "Night Songs",
      duration: 252, // 4:12 in seconds
      status: "pending" as const,
      uploadDate: "2024-01-20",
      plays: 0,
      genre: "electronic",
      coverImage: "",
      coverUrl: "",
      isLiked: true,
      releaseDate: "2024-01-20",
      playCount: 0,
      lyrics:
        "In the midnight hour\nWhen the world is still\nI close my eyes and dream\nOf a love that's real",
    },
    {
      id: "3",
      title: "City Lights",
      artist: "Mike Johnson",
      album: "Urban Stories",
      duration: 208, // 3:28 in seconds
      status: "rejected" as const,
      uploadDate: "2024-01-18",
      plays: 0,
      genre: "hip-hop",
      coverImage: "",
      coverUrl: "",
      isLiked: false,
      releaseDate: "2024-01-18",
      playCount: 0,
      lyrics:
        "City lights shining bright\nIn the urban jungle tonight\nConcrete dreams and neon signs\nThis is where my story begins",
    },
    {
      id: "4",
      title: "Ocean Waves",
      artist: "Sarah Wilson",
      album: "Nature Sounds",
      duration: 315, // 5:15 in seconds
      status: "approved" as const,
      uploadDate: "2024-01-22",
      plays: 8765,
      genre: "ambient",
      coverImage: "",
      coverUrl: "",
      isLiked: true,
      releaseDate: "2024-01-22",
      playCount: 8765,
      lyrics:
        "Ocean waves crash against the shore\nNature's symphony forevermore\nIn the rhythm of the sea\nI find my peace and harmony",
    },
  ];

  const handleSongSubmit = async (data: any) => {
    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("Song submitted:", data);
    setLoading(false);
    setSongFormOpen(false);
    setEditingSong(null);
  };

  const handleEditSong = (song: any) => {
    setEditingSong(song);
    setSongFormOpen(true);
  };

  const handleAddSong = () => {
    setEditingSong(null);
    setSongFormOpen(true);
  };

  const handleDeleteSong = async (songId: string) => {
    const song = songs.find((s) => s.id === songId);
    const confirmed = await confirm({
      title: "Delete Song",
      description: `Are you sure you want to delete "${song?.title}" by ${song?.artist}? This action cannot be undone.`,
      variant: "destructive",
      confirmText: "Delete Song",
      cancelText: "Cancel",
      onConfirm: () => {
        console.log("Item deleted");
        // Add actual delete logic here
      },
    });

    if (confirmed) {
      setLoading(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Song deleted:", songId);
      setLoading(false);
    }
  };

  const stats = [
    {
      title: "Total Songs",
      value: "45,678",
      change: "+15%",
      color: "text-blue-400",
    },
    {
      title: "Pending Review",
      value: "234",
      change: "+8%",
      color: "text-yellow-400",
    },
    {
      title: "Approved",
      value: "43,456",
      change: "+12%",
      color: "text-green-400",
    },
    { title: "Rejected", value: "1,988", change: "-2%", color: "text-red-400" },
  ];

  const tabs = [
    { id: "all", name: "All Songs", count: songs.length },
    {
      id: "pending",
      name: "Pending",
      count: songs.filter((s) => s.status === "pending").length,
    },
    {
      id: "approved",
      name: "Approved",
      count: songs.filter((s) => s.status === "approved").length,
    },
    {
      id: "rejected",
      name: "Rejected",
      count: songs.filter((s) => s.status === "rejected").length,
    },
  ];

  const filteredSongs = songs.filter((song) => {
    if (activeTab === "all") return true;
    return song.status.toLowerCase() === activeTab;
  });

  const handleApprove = (songId: string) => {
    console.log("Approving song:", songId);
  };

  const handleReject = (songId: string) => {
    console.log("Rejecting song:", songId);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Song Management</h1>
          <p className="text-spotify-text-gray mt-2">
            Review and manage all uploaded songs
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="spotifySecondary" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="spotify" size="sm">
            <Music className="h-4 w-4 mr-2" />
            Bulk Actions
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card
            key={stat.title}
            className="bg-spotify-gray border-spotify-light-gray"
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-spotify-text-gray">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                </div>
                <div className={`text-sm ${stat.color}`}>{stat.change}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search and Filters */}
      <Card className="bg-spotify-gray border-spotify-light-gray">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/70" />
                <Input
                  placeholder="Search songs by title, artist, or album..."
                  className="pl-10 bg-spotify-light-gray border border-spotify-light-gray text-white placeholder:text-spotify-text-gray focus:border-spotify-green focus:ring-2 focus:ring-spotify-green/20"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="spotifySecondary" size="sm">
                All Genres
              </Button>
              <Button variant="spotifySecondary" size="sm">
                Sort by Date
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <div className="flex space-x-1 bg-spotify-light-gray p-1 rounded-lg w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? "bg-spotify-gray text-white"
                : "text-spotify-text-gray hover:text-white"
            }`}
          >
            {tab.name}
            <span className="bg-spotify-light-gray text-spotify-text-gray px-2 py-1 rounded-full text-xs">
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Songs Table */}
      <Card className="bg-spotify-gray border-spotify-light-gray">
        <CardHeader>
          <CardTitle className="text-white">Songs</CardTitle>
          <CardDescription className="text-spotify-text-gray">
            Manage and review uploaded songs
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-spotify-light-gray">
                <tr>
                  <th className="text-left p-4 text-sm font-medium text-spotify-text-gray">
                    Song
                  </th>
                  <th className="text-left p-4 text-sm font-medium text-spotify-text-gray">
                    Artist
                  </th>
                  <th className="text-left p-4 text-sm font-medium text-spotify-text-gray">
                    Album
                  </th>
                  <th className="text-left p-4 text-sm font-medium text-spotify-text-gray">
                    Genre
                  </th>
                  <th className="text-left p-4 text-sm font-medium text-spotify-text-gray">
                    Status
                  </th>
                  <th className="text-left p-4 text-sm font-medium text-spotify-text-gray">
                    Plays
                  </th>
                  <th className="text-left p-4 text-sm font-medium text-spotify-text-gray">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredSongs.map((song) => (
                  <tr
                    key={song.id}
                    className="border-b border-spotify-light-gray hover:bg-spotify-hover transition-colors cursor-pointer"
                    onClick={() => openDrawer(song)}
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={song.coverUrl} />
                          <AvatarFallback className="bg-spotify-light-gray">
                            <Music className="h-5 w-5 text-white/70" />
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-white">{song.title}</p>
                          <p className="text-sm text-spotify-text-gray flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {Math.floor(song.duration / 60)}:
                            {(song.duration % 60).toString().padStart(2, "0")}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="bg-spotify-light-gray text-spotify-green font-semibold text-xs">
                            {song.artist.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-white">{song.artist}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Album className="h-4 w-4 text-white/70" />
                        <span className="text-white">{song.album}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-1 bg-spotify-light-gray text-spotify-text-gray rounded-full text-xs">
                        {song.genre}
                      </span>
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          song.status === "approved"
                            ? "bg-green-500/20 text-green-400"
                            : song.status === "pending"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {song.status.charAt(0).toUpperCase() +
                          song.status.slice(1)}
                      </span>
                    </td>
                    <td className="p-4 text-white">
                      {song.plays.toLocaleString()}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {song.status === "pending" && (
                          <>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-green-400 hover:text-green-300"
                              onClick={() => handleApprove(song.id)}
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-red-400 hover:text-red-300"
                              onClick={() => handleReject(song.id)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-blue-400 hover:text-blue-300 hover:bg-blue-400/10"
                          onClick={() => handleEditSong(song)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-red-400 hover:text-red-300 hover:bg-red-400/10"
                          onClick={() => handleDeleteSong(song.id)}
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

      {/* Add Song Button */}
      <div className="mt-6 flex justify-end">
        <Button
          onClick={handleAddSong}
          className="bg-gradient-to-r from-spotify-green to-spotify-green-hover hover:from-spotify-green-hover hover:to-spotify-green text-black font-bold"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New Song
        </Button>
      </div>

      {/* Song Form */}
      <SongForm
        open={songFormOpen}
        onOpenChange={setSongFormOpen}
        onSubmit={handleSongSubmit}
        initialData={editingSong}
        loading={loading}
        artists={[
          { id: "1", name: "John Doe" },
          { id: "2", name: "Jane Smith" },
          { id: "3", name: "Mike Johnson" },
          { id: "4", name: "Sarah Wilson" },
        ]}
      />

      {/* Confirm Dialog */}
      {ConfirmDialog}
    </div>
  );
}
