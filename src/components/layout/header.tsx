"use client";

import { Search, Bell, User, Menu } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/contexts/sidebar-context";
import { useProfile } from "@/contexts/profile-context";
import { useRouter } from "next/navigation";

interface HeaderProps {
  userType: "admin" | "artist" | "user";
}

export function Header({ userType }: HeaderProps) {
  const { toggleSidebar } = useSidebar();
  const { profile } = useProfile();
  const router = useRouter();

  const handleProfileClick = () => {
    router.push(`/${userType}/settings`);
  };

  return (
    <header className="bg-spotify-gray/30 backdrop-blur-md border-b border-spotify-light-gray/50 shadow-xl">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Menu Toggle Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="mr-4 text-spotify-text-gray hover:text-white hover:bg-spotify-light-gray/50"
        >
          <Menu className="h-5 w-5" />
        </Button>
        {/* Search Bar */}
        <div className="flex-1 max-w-md">
          <div className="relative animate-fade-in-up">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/70 z-10" />
            <Input
              placeholder="What do you want to listen to?"
              className="spotify-input h-12 text-lg w-full pl-12"
            />
          </div>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-4 animate-fade-in-up">
          {/* Notifications */}
          <Button
            variant="ghost"
            size="icon"
            className="text-spotify-text-gray hover:text-white hover:scale-110 transition-all duration-300 hover:bg-spotify-light-gray/50 rounded-full"
          >
            <Bell className="h-5 w-5" />
          </Button>

          {/* User Menu */}
          <div
            className="flex items-center gap-3 group cursor-pointer"
            onClick={handleProfileClick}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-spotify-green to-spotify-green-hover rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <User className="h-5 w-5 text-black" />
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-bold text-white group-hover:text-gradient transition-all duration-300">
                {profile?.name ||
                  (userType === "admin"
                    ? "Admin User"
                    : userType === "artist"
                    ? "Artist Name"
                    : "User Name")}
              </p>
              <p className="text-xs text-spotify-text-gray group-hover:text-white transition-colors duration-300">
                {profile?.userType
                  ? profile.userType.charAt(0).toUpperCase() +
                    profile.userType.slice(1)
                  : userType.charAt(0).toUpperCase() + userType.slice(1)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
