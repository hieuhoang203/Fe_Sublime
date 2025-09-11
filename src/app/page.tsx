"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Users,
  Mic,
  User,
  ArrowRight,
  Music,
  Album,
  BarChart3,
} from "lucide-react";

export default function Home() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<
    "admin" | "artist" | "user" | null
  >(null);

  const roles = [
    {
      id: "admin",
      title: "Admin",
      description:
        "Manage users, artists, songs, and albums. View analytics and approve content.",
      icon: Users,
      color: "text-red-400",
      bgColor: "bg-red-500/10",
      features: [
        "User Management",
        "Content Moderation",
        "Analytics Dashboard",
        "System Settings",
      ],
    },
    {
      id: "artist",
      title: "Artist",
      description:
        "Upload music, create albums, track your performance and manage your profile.",
      icon: Mic,
      color: "text-green-400",
      bgColor: "bg-green-500/10",
      features: [
        "Upload Songs",
        "Create Albums",
        "View Analytics",
        "Manage Profile",
      ],
    },
    {
      id: "user",
      title: "User",
      description:
        "Listen to music, create playlists, follow artists and discover new songs.",
      icon: User,
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
      features: [
        "Music Streaming",
        "Create Playlists",
        "Follow Artists",
        "Discover Music",
      ],
    },
  ];

  const handleRoleSelect = (roleId: "admin" | "artist" | "user") => {
    setSelectedRole(roleId);
  };

  const handleContinue = () => {
    if (selectedRole) {
      router.push(`/${selectedRole}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-spotify-black via-spotify-gray to-spotify-black text-white">
      {/* Header */}
      <div className="bg-spotify-gray/30 backdrop-blur-md border-b border-spotify-light-gray/50 shadow-2xl">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between animate-fade-in-up">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-spotify-green to-spotify-green-hover rounded-full flex items-center justify-center shadow-lg hover:shadow-spotify-green/30 transition-all duration-300 hover:scale-110">
                <span className="text-black font-bold text-lg">S</span>
              </div>
              <h1 className="text-3xl font-bold text-gradient">
                Spotify Clone
              </h1>
            </div>
            <div className="text-spotify-text-gray text-lg font-medium">
              Choose your role to continue
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-5xl font-bold mb-6 text-gradient">
            Welcome to Spotify Clone
          </h2>
          <p className="text-xl text-spotify-text-gray max-w-2xl mx-auto leading-relaxed">
            Experience music like never before. Choose your role to access the
            platform and start your musical journey.
          </p>
        </div>

        {/* Role Selection */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {roles.map((role, index) => (
            <Card
              key={role.id}
              className={`spotify-card-enhanced cursor-pointer group hover-lift hover-glow ${
                selectedRole === role.id
                  ? "ring-2 ring-spotify-green shadow-spotify-green/30 shadow-2xl"
                  : ""
              } animate-fade-in-up`}
              style={{ animationDelay: `${index * 0.2}s` }}
              onClick={() =>
                handleRoleSelect(role.id as "admin" | "artist" | "user")
              }
            >
              <CardHeader className="text-center">
                <div
                  className={`w-20 h-20 ${role.bgColor} rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}
                >
                  <role.icon
                    className={`h-10 w-10 ${role.color} group-hover:scale-110 transition-transform duration-300`}
                  />
                </div>
                <CardTitle className="text-2xl text-white font-bold group-hover:text-gradient transition-all duration-300">
                  {role.title}
                </CardTitle>
                <CardDescription className="text-spotify-text-gray text-base leading-relaxed">
                  {role.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {role.features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-3 text-sm text-spotify-text-gray group-hover:text-white transition-colors duration-300"
                    >
                      <div className="w-2 h-2 bg-spotify-green rounded-full shadow-sm group-hover:shadow-spotify-green/50 transition-all duration-300"></div>
                      <span className="group-hover:translate-x-1 transition-transform duration-300">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Continue Button */}
        {selectedRole && (
          <div className="text-center animate-fade-in-up">
            <Button
              onClick={handleContinue}
              className="spotify-button-enhanced px-10 py-4 text-lg font-bold"
            >
              Continue as {roles.find((r) => r.id === selectedRole)?.title}
              <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </div>
        )}

        {/* Features Overview */}
        <div className="mt-20 animate-fade-in-up">
          <h3 className="text-3xl font-bold text-center mb-12 text-gradient">
            Platform Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Music,
                title: "Music Streaming",
                description: "High-quality audio streaming",
                delay: "0s",
              },
              {
                icon: Album,
                title: "Playlist Creation",
                description: "Create and share playlists",
                delay: "0.2s",
              },
              {
                icon: Users,
                title: "Social Features",
                description: "Follow artists and friends",
                delay: "0.4s",
              },
              {
                icon: BarChart3,
                title: "Analytics",
                description: "Track your music journey",
                delay: "0.6s",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="text-center group hover-lift hover-glow animate-fade-in-up"
                style={{ animationDelay: feature.delay }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-spotify-green/20 to-spotify-green-hover/20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-spotify-green/30 group-hover:scale-110 transition-all duration-300">
                  <feature.icon className="h-8 w-8 text-spotify-green group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h4 className="font-bold text-white mb-3 text-lg group-hover:text-gradient transition-all duration-300">
                  {feature.title}
                </h4>
                <p className="text-sm text-spotify-text-gray group-hover:text-white transition-colors duration-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
