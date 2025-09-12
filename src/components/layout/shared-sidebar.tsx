"use client";

import { OptimizedLink } from "./optimized-link";
import { usePathname } from "next/navigation";
import { useSidebar } from "@/contexts/sidebar-context";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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
  const { isCollapsed, isInitialized } = useSidebar();
  const navItems = getNavItems(userType);
  const userInfo = getUserInfo(userType);

  // Don't render until sidebar state is initialized to prevent flash
  if (!isInitialized) {
    return (
      <div className="w-64 bg-gradient-to-b from-spotify-black via-spotify-gray to-spotify-black h-full flex flex-col shadow-2xl">
        <div className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-spotify-green to-spotify-green-hover rounded-full flex items-center justify-center shadow-lg">
              <span className="text-black font-bold text-sm">S</span>
            </div>
            <h1 className="text-2xl font-bold text-gradient">Spotify Clone</h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <TooltipProvider>
      <div
        className={cn(
          "bg-gradient-to-b from-spotify-black via-spotify-gray to-spotify-black h-full flex flex-col shadow-2xl transition-all duration-300",
          isCollapsed ? "w-20" : "w-64"
        )}
      >
        {/* Logo */}
        <div className={cn("animate-fade-in-up", isCollapsed ? "p-3" : "p-6")}>
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "bg-gradient-to-br from-spotify-green to-spotify-green-hover rounded-full flex items-center justify-center shadow-lg transition-all duration-300",
                isCollapsed ? "w-12 h-12" : "w-8 h-8"
              )}
            >
              <span
                className={cn(
                  "text-black font-bold",
                  isCollapsed ? "text-lg" : "text-sm"
                )}
              >
                S
              </span>
            </div>
            {!isCollapsed && (
              <h1 className="text-2xl font-bold text-gradient">
                Spotify Clone
              </h1>
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
                  {isCollapsed ? (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="relative">
                          <OptimizedLink
                            href={item.href}
                            className={cn(
                              "flex items-center justify-center px-3 py-4 rounded-xl text-sm font-medium transition-all duration-300 group hover-lift relative w-full",
                              isActive
                                ? "text-white bg-gradient-to-r from-spotify-green/20 to-spotify-green-hover/20 border border-spotify-green/30 shadow-lg shadow-spotify-green/20"
                                : "text-spotify-text-gray hover:text-white hover:bg-gradient-to-r hover:from-spotify-light-gray/50 hover:to-spotify-gray/50"
                            )}
                          >
                            <item.icon
                              className={cn(
                                "h-7 w-7 group-hover:scale-110 transition-transform duration-300",
                                isActive ? "text-spotify-green" : ""
                              )}
                            />
                          </OptimizedLink>
                          {isActive && (
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-spotify-green rounded-full animate-pulse" />
                          )}
                        </div>
                      </TooltipTrigger>
                      <TooltipContent
                        side="right"
                        className="bg-spotify-gray border-spotify-light-gray text-white"
                      >
                        <p className="font-medium">{item.name}</p>
                      </TooltipContent>
                    </Tooltip>
                  ) : (
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
                      <span className="group-hover:translate-x-1 transition-transform duration-300">
                        {item.name}
                      </span>
                      {item.badge && (
                        <span className="ml-auto px-2 py-1 text-xs bg-spotify-green text-black rounded-full font-bold">
                          {item.badge}
                        </span>
                      )}
                      {isActive && (
                        <div className="absolute right-2 w-2 h-2 bg-spotify-green rounded-full animate-pulse" />
                      )}
                    </OptimizedLink>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User Profile */}
        <div
          className={cn(
            "border-t border-spotify-light-gray/50 animate-fade-in-up",
            isCollapsed ? "p-2" : "p-4"
          )}
        >
          {isCollapsed ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex justify-center p-3 bg-gradient-to-r from-spotify-light-gray/30 to-spotify-gray/30 rounded-xl hover:from-spotify-light-gray/50 hover:to-spotify-gray/50 transition-all duration-300 group cursor-pointer">
                  <div className="w-12 h-12 bg-gradient-to-br from-spotify-green to-spotify-green-hover rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <span className="text-black font-bold text-lg">
                      {userInfo.avatar}
                    </span>
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                </div>
              </TooltipTrigger>
              <TooltipContent
                side="right"
                className="bg-spotify-gray border-spotify-light-gray text-white"
              >
                <div>
                  <p className="font-bold">{userInfo.name}</p>
                  <p className="text-xs text-spotify-text-gray">
                    {userInfo.role}
                  </p>
                </div>
              </TooltipContent>
            </Tooltip>
          ) : (
            <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-spotify-light-gray/30 to-spotify-gray/30 rounded-xl hover:from-spotify-light-gray/50 hover:to-spotify-gray/50 transition-all duration-300 group">
              <div className="w-10 h-10 bg-gradient-to-br from-spotify-green to-spotify-green-hover rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <span className="text-black font-bold text-sm">
                  {userInfo.avatar}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-white truncate group-hover:text-gradient transition-all duration-300">
                  {userInfo.name}
                </p>
                <p className="text-xs text-spotify-text-gray truncate group-hover:text-white transition-colors duration-300">
                  {userInfo.role}
                </p>
              </div>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            </div>
          )}
        </div>
      </div>
    </TooltipProvider>
  );
}
