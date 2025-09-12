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
  BarChart3,
  TrendingUp,
  Users,
  Play,
  Heart,
  Download,
  Clock,
  Calendar,
} from "lucide-react";

export default function ArtistAnalytics() {
  const stats = [
    {
      title: "Total Plays",
      value: "1,234,567",
      change: "+15.3%",
      icon: Play,
      color: "text-green-400",
    },
    {
      title: "Followers",
      value: "12,543",
      change: "+8.2%",
      icon: Users,
      color: "text-blue-400",
    },
    {
      title: "Likes",
      value: "45,678",
      change: "+12.1%",
      icon: Heart,
      color: "text-red-400",
    },
    {
      title: "Downloads",
      value: "8,901",
      change: "+5.7%",
      icon: Download,
      color: "text-purple-400",
    },
  ];

  const topSongs = [
    {
      id: 1,
      title: "Summer Vibes",
      plays: "234,567",
      likes: "12,345",
      duration: "3:45",
    },
    {
      id: 2,
      title: "Midnight Dreams",
      plays: "189,234",
      likes: "9,876",
      duration: "4:12",
    },
    {
      id: 3,
      title: "City Lights",
      plays: "156,789",
      likes: "8,432",
      duration: "3:28",
    },
    {
      id: 4,
      title: "Ocean Waves",
      plays: "123,456",
      likes: "6,789",
      duration: "5:15",
    },
  ];

  const monthlyData = [
    { month: "Jan", plays: 45000, followers: 1200 },
    { month: "Feb", plays: 52000, followers: 1350 },
    { month: "Mar", plays: 48000, followers: 1280 },
    { month: "Apr", plays: 61000, followers: 1450 },
    { month: "May", plays: 58000, followers: 1420 },
    { month: "Jun", plays: 67000, followers: 1580 },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Analytics</h1>
          <p className="text-spotify-text-gray mt-2">
            Track your music performance and audience growth
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="spotifySecondary" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Last 30 days
          </Button>
          <Button variant="spotify" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card
            key={stat.title}
            className="bg-spotify-gray border-spotify-light-gray"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-spotify-text-gray">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {stat.value}
              </div>
              <p className="text-xs text-green-400 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                {stat.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Plays Over Time */}
        <Card className="bg-spotify-gray border-spotify-light-gray">
          <CardHeader>
            <CardTitle className="text-white">Plays Over Time</CardTitle>
            <CardDescription className="text-spotify-text-gray">
              Monthly play count for the last 6 months
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center text-spotify-text-gray">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 mx-auto mb-4" />
                <p>Chart visualization will be implemented here</p>
                <div className="mt-4 space-y-2">
                  {monthlyData.map((data) => (
                    <div
                      key={data.month}
                      className="flex justify-between text-sm"
                    >
                      <span>{data.month}</span>
                      <span>{data.plays.toLocaleString()} plays</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Audience Growth */}
        <Card className="bg-spotify-gray border-spotify-light-gray">
          <CardHeader>
            <CardTitle className="text-white">Audience Growth</CardTitle>
            <CardDescription className="text-spotify-text-gray">
              Follower growth over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center text-spotify-text-gray">
              <div className="text-center">
                <Users className="h-12 w-12 mx-auto mb-4" />
                <p>Follower growth chart will be implemented here</p>
                <div className="mt-4 space-y-2">
                  {monthlyData.map((data) => (
                    <div
                      key={data.month}
                      className="flex justify-between text-sm"
                    >
                      <span>{data.month}</span>
                      <span>{data.followers.toLocaleString()} followers</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Songs */}
      <Card className="bg-spotify-gray border-spotify-light-gray">
        <CardHeader>
          <CardTitle className="text-white">Top Performing Songs</CardTitle>
          <CardDescription className="text-spotify-text-gray">
            Your most popular tracks this month
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topSongs.map((song, index) => (
              <div
                key={song.id}
                className="flex items-center justify-between p-4 bg-spotify-light-gray rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <span className="text-2xl font-bold text-spotify-text-gray w-8">
                    #{index + 1}
                  </span>
                  <div className="flex-1">
                    <h3 className="font-medium text-white">{song.title}</h3>
                    <p className="text-sm text-spotify-text-gray">
                      {song.duration}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <p className="text-sm font-medium text-white">
                      {song.plays}
                    </p>
                    <p className="text-xs text-spotify-text-gray">plays</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-white">
                      {song.likes}
                    </p>
                    <p className="text-xs text-spotify-text-gray">likes</p>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Play className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Geographic Data */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-spotify-gray border-spotify-light-gray">
          <CardHeader>
            <CardTitle className="text-white">Top Countries</CardTitle>
            <CardDescription className="text-spotify-text-gray">
              Where your music is most popular
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  country: "United States",
                  plays: "456,789",
                  percentage: "37%",
                },
                {
                  country: "United Kingdom",
                  plays: "234,567",
                  percentage: "19%",
                },
                { country: "Canada", plays: "189,234", percentage: "15%" },
                { country: "Germany", plays: "123,456", percentage: "10%" },
                { country: "France", plays: "98,765", percentage: "8%" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between"
                >
                  <div className="flex-1">
                    <p className="text-white font-medium">{item.country}</p>
                    <div className="w-full bg-spotify-light-gray rounded-full h-2 mt-1">
                      <div
                        className="bg-spotify-green h-2 rounded-full"
                        style={{ width: item.percentage }}
                      ></div>
                    </div>
                  </div>
                  <div className="text-right ml-4">
                    <p className="text-white font-medium">{item.plays}</p>
                    <p className="text-sm text-spotify-text-gray">
                      {item.percentage}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-spotify-gray border-spotify-light-gray">
          <CardHeader>
            <CardTitle className="text-white">Listening Hours</CardTitle>
            <CardDescription className="text-spotify-text-gray">
              Peak listening times
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  time: "6:00 PM - 8:00 PM",
                  percentage: "25%",
                  color: "bg-green-400",
                },
                {
                  time: "12:00 PM - 2:00 PM",
                  percentage: "20%",
                  color: "bg-blue-400",
                },
                {
                  time: "8:00 PM - 10:00 PM",
                  percentage: "18%",
                  color: "bg-purple-400",
                },
                {
                  time: "10:00 AM - 12:00 PM",
                  percentage: "15%",
                  color: "bg-orange-400",
                },
                {
                  time: "Other times",
                  percentage: "22%",
                  color: "bg-gray-400",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between"
                >
                  <div className="flex-1">
                    <p className="text-white font-medium">{item.time}</p>
                    <div className="w-full bg-spotify-light-gray rounded-full h-2 mt-1">
                      <div
                        className={`${item.color} h-2 rounded-full`}
                        style={{ width: item.percentage }}
                      ></div>
                    </div>
                  </div>
                  <div className="text-right ml-4">
                    <p className="text-white font-medium">
                      {item.percentage}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
