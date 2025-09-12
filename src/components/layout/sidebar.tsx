"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/logo";
import {
  Home,
  Search,
  Library,
  Plus,
  Heart,
  User,
  Settings,
  BarChart3,
  Users,
  Music,
  Album,
  Mic,
  PlayCircle,
  Download,
  Upload,
} from "lucide-react";

interface SidebarProps {
  userType: "admin" | "artist" | "user";
}

const adminNavItems = [
  { name: "Dashboard", href: "/admin", icon: BarChart3 },
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Artists", href: "/admin/artists", icon: Mic },
  { name: "Songs", href: "/admin/songs", icon: Music },
  { name: "Albums", href: "/admin/albums", icon: Album },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

const artistNavItems = [
  { name: "Dashboard", href: "/artist", icon: BarChart3 },
  { name: "My Songs", href: "/artist/songs", icon: Music },
  { name: "My Albums", href: "/artist/albums", icon: Album },
  { name: "Upload", href: "/artist/upload", icon: Upload },
  { name: "Analytics", href: "/artist/analytics", icon: BarChart3 },
];

const userNavItems = [
  { name: "Home", href: "/user", icon: Home },
  { name: "Search", href: "/user/search", icon: Search },
  { name: "Your Library", href: "/user/library", icon: Library },
  { name: "Liked Songs", href: "/user/liked", icon: Heart },
  { name: "Playlists", href: "/user/playlists", icon: Plus },
];

export function Sidebar({ userType }: SidebarProps) {
  const pathname = usePathname();

  const getNavItems = () => {
    switch (userType) {
      case "admin":
        return adminNavItems;
      case "artist":
        return artistNavItems;
      case "user":
        return userNavItems;
      default:
        return [];
    }
  };

  const navItems = getNavItems();

  return (
    <div className="w-64 bg-gradient-to-b from-spotify-black via-spotify-gray to-spotify-black h-full flex flex-col shadow-2xl">
      {/* Logo */}
      <div className="p-6 animate-fade-in-up">
        <Logo size="md" showText={true} />
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3">
        <ul className="space-y-2">
          {navItems.map((item, index) => {
            const isActive = pathname === item.href;
            return (
              <li
                key={item.name}
                className="animate-slide-in-left"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 group hover-lift",
                    isActive
                      ? "text-white bg-gradient-to-r from-spotify-green/20 to-spotify-green-hover/20 border border-spotify-green/30 shadow-lg shadow-spotify-green/20"
                      : "text-spotify-text-gray hover:text-white hover:bg-gradient-to-r hover:from-spotify-light-gray/50 hover:to-spotify-gray/50"
                  )}
                >
                  <item.icon
                    className={`h-5 w-5 group-hover:scale-110 transition-transform duration-300 ${
                      isActive ? "text-spotify-green" : ""
                    }`}
                  />
                  <span className="group-hover:translate-x-1 transition-transform duration-300">
                    {item.name}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-spotify-light-gray/50 animate-fade-in-up">
        <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-spotify-light-gray/30 to-spotify-gray/30 rounded-xl hover:from-spotify-light-gray/50 hover:to-spotify-gray/50 transition-all duration-300 group">
          <div className="w-10 h-10 bg-gradient-to-br from-spotify-green to-spotify-green-hover rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
            <User className="h-5 w-5 text-black" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-white truncate group-hover:text-gradient transition-all duration-300">
              {userType === "admin"
                ? "Admin User"
                : userType === "artist"
                ? "Artist Name"
                : "User Name"}
            </p>
            <p className="text-xs text-spotify-text-gray truncate group-hover:text-white transition-colors duration-300">
              {userType.charAt(0).toUpperCase() + userType.slice(1)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
