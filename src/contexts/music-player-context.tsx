"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number;
  coverUrl?: string;
  isLiked?: boolean;
}

interface MusicPlayerContextType {
  // Current song
  currentSong: Song | null;
  setCurrentSong: (song: Song | null) => void;

  // Playback state
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;

  // Volume
  volume: number;
  setVolume: (volume: number) => void;
  isMuted: boolean;
  setIsMuted: (muted: boolean) => void;

  // Playback modes
  isShuffled: boolean;
  setIsShuffled: (shuffled: boolean) => void;
  repeatMode: "none" | "one" | "all";
  setRepeatMode: (mode: "none" | "one" | "all") => void;

  // Queue
  queue: Song[];
  setQueue: (queue: Song[]) => void;
  addToQueue: (song: Song) => void;
  removeFromQueue: (songId: string) => void;
  clearQueue: () => void;

  // Player actions
  playPause: () => void;
  skipNext: () => void;
  skipPrevious: () => void;
  seekTo: (position: number) => void;
  toggleMute: () => void;
  toggleShuffle: () => void;
  toggleRepeat: () => void;
  toggleLike: () => void;
}

const MusicPlayerContext = createContext<MusicPlayerContextType | undefined>(
  undefined
);

export function MusicPlayerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(70);
  const [isMuted, setIsMuted] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const [repeatMode, setRepeatMode] = useState<"none" | "one" | "all">("none");
  const [queue, setQueue] = useState<Song[]>([]);

  const addToQueue = useCallback((song: Song) => {
    setQueue((prev) => [...prev, song]);
  }, []);

  const removeFromQueue = useCallback((songId: string) => {
    setQueue((prev) => prev.filter((song) => song.id !== songId));
  }, []);

  const clearQueue = useCallback(() => {
    setQueue([]);
  }, []);

  const playPause = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  const skipNext = useCallback(() => {
    if (queue.length === 0) return;

    const currentIndex = currentSong
      ? queue.findIndex((song) => song.id === currentSong.id)
      : -1;
    let nextIndex = currentIndex + 1;

    if (isShuffled) {
      nextIndex = Math.floor(Math.random() * queue.length);
    } else if (nextIndex >= queue.length) {
      nextIndex = repeatMode === "all" ? 0 : currentIndex;
    }

    if (nextIndex >= 0 && nextIndex < queue.length) {
      setCurrentSong(queue[nextIndex]);
    }
  }, [queue, currentSong, isShuffled, repeatMode]);

  const skipPrevious = useCallback(() => {
    if (queue.length === 0) return;

    const currentIndex = currentSong
      ? queue.findIndex((song) => song.id === currentSong.id)
      : -1;
    let prevIndex = currentIndex - 1;

    if (prevIndex < 0) {
      prevIndex = repeatMode === "all" ? queue.length - 1 : currentIndex;
    }

    if (prevIndex >= 0 && prevIndex < queue.length) {
      setCurrentSong(queue[prevIndex]);
    }
  }, [queue, currentSong, repeatMode]);

  const seekTo = useCallback((position: number) => {
    // This would typically control the actual audio element
    console.log("Seek to:", position);
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
  }, []);

  const toggleShuffle = useCallback(() => {
    setIsShuffled((prev) => !prev);
  }, []);

  const toggleRepeat = useCallback(() => {
    setRepeatMode((prev) => {
      switch (prev) {
        case "none":
          return "all";
        case "all":
          return "one";
        case "one":
          return "none";
        default:
          return "none";
      }
    });
  }, []);

  const toggleLike = useCallback(() => {
    if (currentSong) {
      setCurrentSong((prev) =>
        prev ? { ...prev, isLiked: !prev.isLiked } : null
      );
    }
  }, [currentSong]);

  const value: MusicPlayerContextType = {
    currentSong,
    setCurrentSong,
    isPlaying,
    setIsPlaying,
    volume,
    setVolume,
    isMuted,
    setIsMuted,
    isShuffled,
    setIsShuffled,
    repeatMode,
    setRepeatMode,
    queue,
    setQueue,
    addToQueue,
    removeFromQueue,
    clearQueue,
    playPause,
    skipNext,
    skipPrevious,
    seekTo,
    toggleMute,
    toggleShuffle,
    toggleRepeat,
    toggleLike,
  };

  return (
    <MusicPlayerContext.Provider value={value}>
      {children}
    </MusicPlayerContext.Provider>
  );
}

export function useMusicPlayer() {
  const context = useContext(MusicPlayerContext);
  if (context === undefined) {
    throw new Error("useMusicPlayer must be used within a MusicPlayerProvider");
  }
  return context;
}
