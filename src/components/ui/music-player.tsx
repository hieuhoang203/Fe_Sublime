"use client";

import * as React from "react";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Shuffle,
  Repeat,
  Heart,
  MoreHorizontal,
  Maximize2,
  List,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number;
  coverUrl?: string;
  isLiked?: boolean;
}

interface MusicPlayerProps {
  currentSong?: Song;
  isPlaying?: boolean;
  volume?: number;
  isMuted?: boolean;
  isShuffled?: boolean;
  repeatMode?: "none" | "one" | "all";
  onPlayPause?: () => void;
  onSkipNext?: () => void;
  onSkipPrevious?: () => void;
  onVolumeChange?: (volume: number) => void;
  onMuteToggle?: () => void;
  onShuffleToggle?: () => void;
  onRepeatToggle?: () => void;
  onLikeToggle?: () => void;
  onSeek?: (position: number) => void;
  onExpand?: () => void;
  onQueueToggle?: () => void;
}

export function MusicPlayer({
  currentSong = {
    id: "1",
    title: "Sample Song",
    artist: "Sample Artist",
    album: "Sample Album",
    duration: 180, // 3 minutes
    coverUrl: "",
    isLiked: true,
  },
  isPlaying = false,
  volume = 70,
  isMuted = false,
  isShuffled = false,
  repeatMode = "none",
  onPlayPause,
  onSkipNext,
  onSkipPrevious,
  onVolumeChange,
  onMuteToggle,
  onShuffleToggle,
  onRepeatToggle,
  onLikeToggle,
  onSeek,
  onExpand,
  onQueueToggle,
}: MusicPlayerProps) {
  const [currentTime, setCurrentTime] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);
  const volumeRef = useRef<HTMLDivElement>(null);

  // Mock progress update
  useEffect(() => {
    if (isPlaying && !isDragging && currentSong?.duration) {
      const interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= currentSong.duration) {
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, isDragging, currentSong?.duration]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current || !currentSong?.duration) return;

    const rect = progressRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;
    const newTime = percentage * currentSong.duration;

    setIsDragging(true);
    setCurrentTime(newTime);
    onSeek?.(newTime);

    // Reset dragging state after a short delay
    setTimeout(() => setIsDragging(false), 100);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value);
    onVolumeChange?.(newVolume);
  };

  const getRepeatIcon = () => {
    switch (repeatMode) {
      case "one":
        return <Repeat className="h-4 w-4" />;
      case "all":
        return <Repeat className="h-4 w-4" />;
      default:
        return <Repeat className="h-4 w-4" />;
    }
  };

  const getRepeatColor = () => {
    switch (repeatMode) {
      case "one":
        return "text-spotify-green hover:text-spotify-green-hover";
      case "all":
        return "text-spotify-green hover:text-spotify-green-hover";
      default:
        return "text-spotify-text-gray hover:text-white";
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-spotify-gray border-t border-spotify-light-gray/50 backdrop-blur-md z-50">
      <div className="flex items-center justify-between px-4 py-2 h-20">
        {/* Left Section - Song Info */}
        <div className="flex items-center gap-4 min-w-0 flex-1">
          <div className="relative">
            <Avatar className="w-14 h-14">
              <AvatarImage src={currentSong?.coverUrl} />
              <AvatarFallback className="bg-gradient-to-br from-spotify-green to-spotify-green-hover text-black text-lg font-bold">
                {currentSong?.title?.charAt(0).toUpperCase() || "?"}
              </AvatarFallback>
            </Avatar>
            {isPlaying && (
              <div className="absolute inset-0 bg-black/20 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-spotify-green rounded-full animate-pulse"></div>
              </div>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <h4 className="text-white font-medium text-sm truncate">
              {currentSong?.title || "No song selected"}
            </h4>
            <p className="text-spotify-text-gray text-xs truncate">
              {currentSong?.artist || "Unknown artist"}
            </p>
          </div>
        </div>

        {/* Center Section - Player Controls */}
        <div className="flex flex-col items-center gap-2 flex-1 max-w-2xl">
          {/* Control Buttons */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={onShuffleToggle}
              className={cn(
                "h-8 w-8 hover:bg-white/10 transition-all duration-200",
                isShuffled
                  ? "text-spotify-green hover:text-spotify-green-hover"
                  : "text-spotify-text-gray hover:text-white"
              )}
            >
              <Shuffle className="h-4 w-4" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={onSkipPrevious}
              className="h-8 w-8 text-spotify-text-gray hover:text-white hover:bg-white/10 transition-all duration-200"
            >
              <SkipBack className="h-4 w-4" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={onPlayPause}
              className="h-10 w-10 bg-white hover:bg-spotify-text-gray text-black rounded-full"
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
              onClick={onSkipNext}
              className="h-8 w-8 text-spotify-text-gray hover:text-white hover:bg-white/10 transition-all duration-200"
            >
              <SkipForward className="h-4 w-4" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={onRepeatToggle}
              className={cn(
                "h-8 w-8 hover:bg-white/10 transition-all duration-200",
                getRepeatColor()
              )}
            >
              {getRepeatIcon()}
            </Button>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center w-full">
            <span className="text-spotify-text-gray text-xs time-label">
              {formatTime(currentTime)}
            </span>

            <div
              ref={progressRef}
              className="flex-1 h-1 bg-spotify-light-gray rounded-full cursor-pointer group progress-bar-container"
              onClick={handleProgressClick}
              onMouseDown={(e) => {
                e.preventDefault();
                setIsDragging(true);

                const handleMouseMove = (moveEvent: MouseEvent) => {
                  if (!progressRef.current || !currentSong?.duration) return;

                  const rect = progressRef.current.getBoundingClientRect();
                  const moveX = moveEvent.clientX - rect.left;
                  const percentage = Math.min(
                    Math.max(moveX / rect.width, 0),
                    1
                  );
                  const newTime = percentage * currentSong.duration;

                  setCurrentTime(newTime);
                  onSeek?.(newTime);
                };

                const handleMouseUp = () => {
                  setIsDragging(false);
                  document.removeEventListener("mousemove", handleMouseMove);
                  document.removeEventListener("mouseup", handleMouseUp);
                };

                document.addEventListener("mousemove", handleMouseMove);
                document.addEventListener("mouseup", handleMouseUp);
              }}
            >
              <div
                className="h-full bg-spotify-green rounded-full relative group-hover:bg-spotify-green-hover transition-colors"
                style={{
                  width: `${
                    currentSong?.duration
                      ? (currentTime / currentSong.duration) * 100
                      : 0
                  }%`,
                }}
              >
                <div className="progress-bar-thumb"></div>
              </div>
            </div>

            <span className="text-spotify-text-gray text-xs time-label">
              {formatTime(currentSong?.duration || 0)}
            </span>
          </div>
        </div>

        {/* Right Section - Volume & Additional Controls */}
        <div className="flex items-center gap-2 min-w-0 flex-1 justify-end">
          <Button
            variant="ghost"
            size="icon"
            onClick={onLikeToggle}
            className={cn(
              "h-8 w-8 hover:bg-white/10 transition-all duration-200",
              currentSong?.isLiked
                ? "text-spotify-green hover:text-spotify-green-hover"
                : "text-spotify-text-gray hover:text-white"
            )}
          >
            <Heart
              className={cn(
                "h-4 w-4",
                currentSong?.isLiked ? "fill-current" : ""
              )}
            />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={onQueueToggle}
            className="h-8 w-8 text-spotify-text-gray hover:text-white hover:bg-white/10 transition-all duration-200"
          >
            <List className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={onExpand}
            className="h-8 w-8 text-spotify-text-gray hover:text-white hover:bg-white/10 transition-all duration-200"
          >
            <Maximize2 className="h-4 w-4" />
          </Button>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={onMuteToggle}
              className="h-8 w-8 text-spotify-text-gray hover:text-white hover:bg-white/10 transition-all duration-200"
            >
              {isMuted ? (
                <VolumeX className="h-4 w-4" />
              ) : (
                <Volume2 className="h-4 w-4" />
              )}
            </Button>

            <div
              ref={volumeRef}
              className="w-20 h-1 bg-spotify-light-gray rounded-full cursor-pointer group relative"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const newVolume = Math.min(
                  Math.max((clickX / rect.width) * 100, 0),
                  100
                );
                handleVolumeChange({
                  target: { value: newVolume.toString() },
                } as React.ChangeEvent<HTMLInputElement>);
              }}
            >
              {/* Fill */}
              <div
                className="h-full bg-spotify-green rounded-full group-hover:bg-spotify-green-hover transition-colors"
                style={{ width: `${isMuted ? 0 : volume}%` }}
              />

              {/* Thumb */}
              <div
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 
               w-3 h-3 rounded-full bg-white shadow cursor-pointer 
               opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ left: `${isMuted ? 0 : volume}%` }}
                onMouseDown={(e) => {
                  e.stopPropagation();

                  const handleMouseMove = (moveEvent: MouseEvent) => {
                    const rect = (
                      volumeRef.current as HTMLDivElement
                    ).getBoundingClientRect();
                    const moveX = moveEvent.clientX - rect.left;
                    const newVolume = Math.min(
                      Math.max((moveX / rect.width) * 100, 0),
                      100
                    );

                    handleVolumeChange({
                      target: { value: newVolume.toString() },
                    } as React.ChangeEvent<HTMLInputElement>);
                  };

                  const handleMouseUp = () => {
                    document.removeEventListener("mousemove", handleMouseMove);
                    document.removeEventListener("mouseup", handleMouseUp);
                  };

                  document.addEventListener("mousemove", handleMouseMove);
                  document.addEventListener("mouseup", handleMouseUp);
                }}
              />
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-spotify-text-gray hover:text-white"
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
