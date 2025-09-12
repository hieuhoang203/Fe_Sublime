"use client";

import { SharedSidebar } from "./shared-sidebar";
import { Header } from "./header";
import { MusicPlayer } from "@/components/ui/music-player";
import { SidebarProvider } from "@/contexts/sidebar-context";
import { ProfileProvider } from "@/contexts/profile-context";
import { SongDrawerProvider } from "@/contexts/song-drawer-context";
import { useMusicPlayer } from "@/contexts/music-player-context";
import { useSongDrawer } from "@/contexts/song-drawer-context";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  X,
  Play,
  Pause,
  Heart,
  Plus,
  Share2,
  Download,
  MoreHorizontal,
  Clock,
  Calendar,
  Music,
  Users,
  Eye,
  MessageCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AppLayoutProps {
  children: React.ReactNode;
}

// Function to determine user type from pathname
function getUserTypeFromPath(pathname: string): "admin" | "artist" | "user" {
  if (pathname.startsWith("/admin")) return "admin";
  if (pathname.startsWith("/artist")) return "artist";
  if (pathname.startsWith("/user")) return "user";
  return "user"; // default fallback
}

function AppLayoutContent({
  children,
  userType,
}: AppLayoutProps & { userType: "admin" | "artist" | "user" }) {
  const musicPlayer = useMusicPlayer();
  const { isOpen: isDrawerOpen, currentSong, closeDrawer } = useSongDrawer();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Unknown";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatPlayCount = (count?: number) => {
    if (!count) return "0";
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
    return count.toString();
  };

  return (
    <div className="flex h-screen bg-spotify-black">
      {/* Sidebar - Only re-render when userType changes */}
      <SharedSidebar userType={userType} />

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${
          isDrawerOpen ? "mr-96" : "mr-0"
        }`}
      >
        {/* Header - Only re-render when userType changes */}
        <Header userType={userType} />

        {/* Page Content - This will re-render on navigation */}
        <main className="flex-1 overflow-y-auto pb-20">{children}</main>
      </div>

      {/* Music Player - Fixed at bottom */}
      <div
        className={`fixed bottom-0 left-0 right-0 transition-all duration-300 ${
          isDrawerOpen ? "right-96" : "right-0"
        }`}
      >
        <MusicPlayer
          currentSong={musicPlayer.currentSong}
          isPlaying={musicPlayer.isPlaying}
          volume={musicPlayer.volume}
          isMuted={musicPlayer.isMuted}
          isShuffled={musicPlayer.isShuffled}
          repeatMode={musicPlayer.repeatMode}
          onPlayPause={musicPlayer.playPause}
          onSkipNext={musicPlayer.skipNext}
          onSkipPrevious={musicPlayer.skipPrevious}
          onVolumeChange={musicPlayer.setVolume}
          onMuteToggle={musicPlayer.toggleMute}
          onShuffleToggle={musicPlayer.toggleShuffle}
          onRepeatToggle={musicPlayer.toggleRepeat}
          onLikeToggle={musicPlayer.toggleLike}
          onSeek={musicPlayer.seekTo}
          onExpand={() => console.log("Expand player")}
          onQueueToggle={() => console.log("Toggle queue")}
        />
      </div>

      {/* Song Detail Drawer */}
      {isDrawerOpen && currentSong && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"
            onClick={closeDrawer}
          />

          {/* Drawer */}
          <div className="fixed top-0 right-0 h-full w-96 bg-spotify-gray border-l border-spotify-light-gray/50 backdrop-blur-md z-50 transform transition-transform duration-300 ease-in-out">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-spotify-light-gray/50">
              <h2 className="text-white text-lg font-semibold">Now Playing</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={closeDrawer}
                className="h-8 w-8 text-spotify-text-gray hover:text-white"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Content */}
            <div className="flex flex-col h-full overflow-y-auto">
              {/* Album Art */}
              <div className="p-6 flex justify-center">
                <div className="relative">
                  <Avatar className="w-64 h-64">
                    <AvatarImage src={currentSong.coverUrl} />
                    <AvatarFallback className="bg-gradient-to-br from-spotify-green to-spotify-green-hover text-black text-4xl font-bold">
                      {currentSong.title.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  {isPlaying && (
                    <div className="absolute inset-0 bg-black/20 rounded-full flex items-center justify-center">
                      <div className="w-8 h-8 bg-spotify-green rounded-full animate-pulse flex items-center justify-center">
                        <Pause className="h-4 w-4 text-black" />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Song Info */}
              <div className="px-6 pb-6">
                <h3 className="text-white text-2xl font-bold mb-2 line-clamp-2">
                  {currentSong.title}
                </h3>
                <p className="text-spotify-text-gray text-lg mb-4 line-clamp-1">
                  {currentSong.artist}
                </p>
                <p className="text-spotify-text-gray text-sm mb-6 line-clamp-1">
                  {currentSong.album}
                </p>

                {/* Action Buttons */}
                <div className="flex items-center gap-3 mb-6">
                  <Button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="h-12 w-12 bg-spotify-green hover:bg-spotify-green-hover text-black rounded-full"
                  >
                    {isPlaying ? (
                      <Pause className="h-5 w-5" />
                    ) : (
                      <Play className="h-5 w-5 ml-0.5" />
                    )}
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsLiked(!isLiked)}
                    className={cn(
                      "h-10 w-10",
                      isLiked
                        ? "text-spotify-green hover:text-spotify-green-hover"
                        : "text-spotify-text-gray hover:text-white"
                    )}
                  >
                    <Heart
                      className={cn("h-5 w-5", isLiked && "fill-current")}
                    />
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 text-spotify-text-gray hover:text-white"
                  >
                    <Plus className="h-5 w-5" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 text-spotify-text-gray hover:text-white"
                  >
                    <Share2 className="h-5 w-5" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 text-spotify-text-gray hover:text-white"
                  >
                    <Download className="h-5 w-5" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 text-spotify-text-gray hover:text-white"
                  >
                    <MoreHorizontal className="h-5 w-5" />
                  </Button>
                </div>

                {/* Song Details */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-sm">
                    <Clock className="h-4 w-4 text-spotify-text-gray" />
                    <span className="text-spotify-text-gray">Duration:</span>
                    <span className="text-white">
                      {formatTime(currentSong.duration)}
                    </span>
                  </div>

                  {currentSong.releaseDate && (
                    <div className="flex items-center gap-3 text-sm">
                      <Calendar className="h-4 w-4 text-spotify-text-gray" />
                      <span className="text-spotify-text-gray">Released:</span>
                      <span className="text-white">
                        {formatDate(currentSong.releaseDate)}
                      </span>
                    </div>
                  )}

                  {currentSong.genre && (
                    <div className="flex items-center gap-3 text-sm">
                      <Music className="h-4 w-4 text-spotify-text-gray" />
                      <span className="text-spotify-text-gray">Genre:</span>
                      <span className="text-white">{currentSong.genre}</span>
                    </div>
                  )}

                  {currentSong.playCount && (
                    <div className="flex items-center gap-3 text-sm">
                      <Eye className="h-4 w-4 text-spotify-text-gray" />
                      <span className="text-spotify-text-gray">Plays:</span>
                      <span className="text-white">
                        {formatPlayCount(currentSong.playCount)}
                      </span>
                    </div>
                  )}
                </div>

                {/* Lyrics Section */}
                {currentSong.lyrics && (
                  <div className="mt-8">
                    <h4 className="text-white text-lg font-semibold mb-4 flex items-center gap-2">
                      <MessageCircle className="h-5 w-5" />
                      Lyrics
                    </h4>
                    <div className="bg-spotify-light-gray/50 rounded-lg p-4 max-h-48 overflow-y-auto">
                      <p className="text-spotify-text-gray text-sm leading-relaxed whitespace-pre-line">
                        {currentSong.lyrics}
                      </p>
                    </div>
                  </div>
                )}

                {/* Similar Songs Section */}
                <div className="mt-8">
                  <h4 className="text-white text-lg font-semibold mb-4 flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Similar Songs
                  </h4>
                  <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-spotify-light-gray/30 transition-colors cursor-pointer"
                      >
                        <Avatar className="w-10 h-10">
                          <AvatarFallback className="bg-spotify-light-gray text-spotify-text-gray">
                            {i}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="text-white text-sm font-medium truncate">
                            Similar Song {i}
                          </p>
                          <p className="text-spotify-text-gray text-xs truncate">
                            Similar Artist {i}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-spotify-text-gray hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Play className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export function AppLayout({ children }: AppLayoutProps) {
  const pathname = usePathname();
  const userType = useMemo(() => getUserTypeFromPath(pathname), [pathname]);

  return (
    <ProfileProvider userType={userType}>
      <SidebarProvider>
        <SongDrawerProvider>
          <AppLayoutContent userType={userType}>{children}</AppLayoutContent>
        </SongDrawerProvider>
      </SidebarProvider>
    </ProfileProvider>
  );
}
