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
  Music,
  Album,
  Users,
  TrendingUp,
  Play,
  Heart,
  Download,
} from "lucide-react";

export default function ArtistDashboard() {
  const stats = [
    {
      title: "Total Songs",
      value: "24",
      change: "+3 this month",
      icon: Music,
      color: "text-green-400",
    },
    {
      title: "Total Albums",
      value: "3",
      change: "+1 this month",
      icon: Album,
      color: "text-blue-400",
    },
    {
      title: "Followers",
      value: "12,543",
      change: "+234 this week",
      icon: Users,
      color: "text-purple-400",
    },
    {
      title: "Total Plays",
      value: "1.2M",
      change: "+15% this month",
      icon: Play,
      color: "text-orange-400",
    },
  ];

  const recentSongs = [
    {
      id: 1,
      title: "Summer Vibes",
      album: "Summer Collection",
      plays: "45,234",
      status: "Published",
    },
    {
      id: 2,
      title: "Midnight Dreams",
      album: "Night Songs",
      plays: "32,156",
      status: "Published",
    },
    {
      id: 3,
      title: "New Beginning",
      album: "Fresh Start",
      plays: "28,901",
      status: "Pending",
    },
    {
      id: 4,
      title: "City Lights",
      album: "Urban Stories",
      plays: "67,432",
      status: "Published",
    },
  ];

  const topAlbums = [
    {
      id: 1,
      name: "Summer Collection",
      songs: 8,
      plays: "234,567",
      cover: "🎵",
    },
    { id: 2, name: "Night Songs", songs: 6, plays: "189,234", cover: "🌙" },
    { id: 3, name: "Fresh Start", songs: 10, plays: "156,789", cover: "🌅" },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Artist Dashboard</h1>
          <p className="text-spotify-text-gray mt-2">
            Manage your music and track your success
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="spotifySecondary" size="sm" asChild>
            <a href="/artist/upload">
              <Download className="h-4 w-4 mr-2" />
              Upload Music
            </a>
          </Button>
          <Button variant="spotify" size="sm" asChild>
            <a href="/artist/songs">
              <Music className="h-4 w-4 mr-2" />
              Manage Songs
            </a>
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card
            key={stat.title}
            className="spotify-card-enhanced hover-lift hover-glow animate-fade-in-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-spotify-text-gray">
                {stat.title}
              </CardTitle>
              <stat.icon
                className={`h-5 w-5 ${stat.color} group-hover:scale-110 transition-transform duration-300`}
              />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white mb-2">
                {stat.value}
              </div>
              <p className="text-sm text-green-400 flex items-center gap-2 font-medium">
                <TrendingUp className="h-4 w-4" />
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Songs and Top Albums */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Songs */}
        <Card className="spotify-card-glass hover-lift animate-fade-in-up">
          <CardHeader>
            <CardTitle className="text-white text-xl font-bold">
              Recent Songs
            </CardTitle>
            <CardDescription className="text-spotify-text-gray text-base">
              Your latest uploads
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentSongs.map((song, index) => (
                <div
                  key={song.id}
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-spotify-light-gray/50 to-spotify-gray/50 rounded-xl hover:from-spotify-light-gray hover:to-spotify-gray transition-all duration-300 group animate-slide-in-left"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex-1">
                    <p className="text-sm font-bold text-white group-hover:text-gradient transition-all duration-300">
                      {song.title}
                    </p>
                    <p className="text-xs text-spotify-text-gray group-hover:text-white transition-colors duration-300">
                      {song.album}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-spotify-text-gray group-hover:text-white transition-colors duration-300 font-medium">
                      {song.plays} plays
                    </span>
                    <span
                      className={`text-xs px-3 py-1 rounded-full font-medium ${
                        song.status === "Published"
                          ? "bg-green-500/20 text-green-400 border border-green-500/30"
                          : "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                      }`}
                    >
                      {song.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Albums */}
        <Card className="spotify-card-glass hover-lift animate-fade-in-up">
          <CardHeader>
            <CardTitle className="text-white text-xl font-bold">
              Top Albums
            </CardTitle>
            <CardDescription className="text-spotify-text-gray text-base">
              Your most popular albums
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topAlbums.map((album, index) => (
                <div
                  key={album.id}
                  className="flex items-center gap-4 p-4 bg-gradient-to-r from-spotify-light-gray/50 to-spotify-gray/50 rounded-xl hover:from-spotify-light-gray hover:to-spotify-gray transition-all duration-300 group animate-slide-in-left"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="text-3xl group-hover:scale-110 transition-transform duration-300">
                    {album.cover}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-white group-hover:text-gradient transition-all duration-300">
                      {album.name}
                    </p>
                    <p className="text-xs text-spotify-text-gray group-hover:text-white transition-colors duration-300">
                      {album.songs} songs
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-white group-hover:text-gradient transition-all duration-300">
                      {album.plays}
                    </p>
                    <p className="text-xs text-spotify-text-gray group-hover:text-white transition-colors duration-300">
                      total plays
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="bg-spotify-gray border-spotify-light-gray">
        <CardHeader>
          <CardTitle className="text-white">Quick Actions</CardTitle>
          <CardDescription className="text-spotify-text-gray">
            Common tasks for artists
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <a
              href="/artist/upload"
              className="p-4 bg-spotify-light-gray hover:bg-spotify-hover rounded-lg transition-colors text-left block"
            >
              <Music className="h-6 w-6 text-green-400 mb-2" />
              <p className="text-sm font-medium text-white">Upload Music</p>
              <p className="text-xs text-spotify-text-gray">Add new music</p>
            </a>
            <a
              href="/artist/songs"
              className="p-4 bg-spotify-light-gray hover:bg-spotify-hover rounded-lg transition-colors text-left block"
            >
              <Music className="h-6 w-6 text-blue-400 mb-2" />
              <p className="text-sm font-medium text-white">Manage Songs</p>
              <p className="text-xs text-spotify-text-gray">
                Edit your tracks
              </p>
            </a>
            <a
              href="/artist/albums"
              className="p-4 bg-spotify-light-gray hover:bg-spotify-hover rounded-lg transition-colors text-left block"
            >
              <Album className="h-6 w-6 text-purple-400 mb-2" />
              <p className="text-sm font-medium text-white">Manage Albums</p>
              <p className="text-xs text-spotify-text-gray">
                Organize your songs
              </p>
            </a>
            <a
              href="/artist/analytics"
              className="p-4 bg-spotify-light-gray hover:bg-spotify-hover rounded-lg transition-colors text-left block"
            >
              <TrendingUp className="h-6 w-6 text-orange-400 mb-2" />
              <p className="text-sm font-medium text-white">View Analytics</p>
              <p className="text-xs text-spotify-text-gray">
                Track performance
              </p>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
