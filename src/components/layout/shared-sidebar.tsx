"use client";

import { OptimizedLink } from "./optimized-link";
import { usePathname } from "next/navigation";
import { useSidebar } from "@/contexts/sidebar-context";
import { cn } from "@/lib/utils";
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
  TrendingUp,
} from "lucide-react";

interface SidebarProps {
  userType: "admin" | "artist" | "user";
}

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

const getNavItems = (userType: "admin" | "artist" | "user"): NavItem[] => {
  switch (userType) {
    case "admin":
      return [
        { name: "Dashboard", href: "/admin", icon: BarChart3 },
        { name: "Users", href: "/admin/users", icon: Users },
        { name: "Artists", href: "/admin/artists", icon: Mic },
        { name: "Songs", href: "/admin/songs", icon: Music },
        { name: "Albums", href: "/admin/albums", icon: Album },
        { name: "Settings", href: "/admin/settings", icon: Settings },
      ];
    case "artist":
      return [
        { name: "Dashboard", href: "/artist", icon: BarChart3 },
        { name: "My Songs", href: "/artist/songs", icon: Music },
        { name: "My Albums", href: "/artist/albums", icon: Album },
        { name: "Upload", href: "/artist/upload", icon: Upload },
        { name: "Analytics", href: "/artist/analytics", icon: TrendingUp },
      ];
    case "user":
      return [
        { name: "Home", href: "/user", icon: Home },
        { name: "Search", href: "/user/search", icon: Search },
        { name: "Your Library", href: "/user/library", icon: Library },
        { name: "Liked Songs", href: "/user/liked", icon: Heart },
        { name: "Playlists", href: "/user/playlists", icon: Plus },
      ];
    default:
      return [];
  }
};

const getUserInfo = (userType: "admin" | "artist" | "user") => {
  switch (userType) {
    case "admin":
      return {
        name: "Admin User",
        role: "Administrator",
        avatar: "A",
      };
    case "artist":
      return {
        name: "Artist Name",
        role: "Musician",
        avatar: "AR",
      };
    case "user":
      return {
        name: "User Name",
        role: "Listener",
        avatar: "U",
      };
    default:
      return {
        name: "Unknown",
        role: "User",
        avatar: "?",
      };
  }
};

export function SharedSidebar({ userType }: SidebarProps) {
  const pathname = usePathname();
  const { isCollapsed } = useSidebar();
  const navItems = getNavItems(userType);
  const userInfo = getUserInfo(userType);

  return (
    <div
      className={cn(
        "bg-gradient-to-b from-spotify-black via-spotify-gray to-spotify-black h-full flex flex-col shadow-2xl transition-all duration-300",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="p-6 animate-fade-in-up">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-spotify-green to-spotify-green-hover rounded-full flex items-center justify-center shadow-lg">
            <span className="text-black font-bold text-sm">S</span>
          </div>
          {!isCollapsed && (
            <h1 className="text-2xl font-bold text-gradient">Spotify Clone</h1>
          )}
        </div>
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
                <OptimizedLink
                  href={item.href}
                  className={cn(
                    "flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 group hover-lift relative",
                    isActive
                      ? "text-white bg-gradient-to-r from-spotify-green/20 to-spotify-green-hover/20 border border-spotify-green/30 shadow-lg shadow-spotify-green/20"
                      : "text-spotify-text-gray hover:text-white hover:bg-gradient-to-r hover:from-spotify-light-gray/50 hover:to-spotify-gray/50"
                  )}
                >
                  <item.icon
                    className={cn(
                      "h-5 w-5 group-hover:scale-110 transition-transform duration-300",
                      isActive ? "text-spotify-green" : ""
                    )}
                  />
                  {!isCollapsed && (
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {item.name}
                    </span>
                  )}
                  {!isCollapsed && item.badge && (
                    <span className="ml-auto px-2 py-1 text-xs bg-spotify-green text-black rounded-full font-bold">
                      {item.badge}
                    </span>
                  )}
                  {isActive && (
                    <div className="absolute right-2 w-2 h-2 bg-spotify-green rounded-full animate-pulse" />
                  )}
                </OptimizedLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-spotify-light-gray/50 animate-fade-in-up">
        <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-spotify-light-gray/30 to-spotify-gray/30 rounded-xl hover:from-spotify-light-gray/50 hover:to-spotify-gray/50 transition-all duration-300 group">
          <div className="w-10 h-10 bg-gradient-to-br from-spotify-green to-spotify-green-hover rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
            <span className="text-black font-bold text-sm">
              {userInfo.avatar}
            </span>
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-white truncate group-hover:text-gradient transition-all duration-300">
                {userInfo.name}
              </p>
              <p className="text-xs text-spotify-text-gray truncate group-hover:text-white transition-colors duration-300">
                {userInfo.role}
              </p>
            </div>
          )}
          {!isCollapsed && (
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          )}
        </div>
      </div>
    </div>
  );
}
