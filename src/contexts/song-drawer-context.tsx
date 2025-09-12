"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number;
  coverUrl?: string;
  isLiked?: boolean;
  releaseDate?: string;
  genre?: string;
  playCount?: number;
  lyrics?: string;
}

interface SongDrawerContextType {
  isOpen: boolean;
  currentSong: Song | null;
  openDrawer: (song: Song) => void;
  closeDrawer: () => void;
}

const SongDrawerContext = createContext<SongDrawerContextType | undefined>(
  undefined
);

export function SongDrawerProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);

  const openDrawer = (song: Song) => {
    setCurrentSong(song);
    setIsOpen(true);
  };

  const closeDrawer = () => {
    setIsOpen(false);
    setCurrentSong(null);
  };

  return (
    <SongDrawerContext.Provider
      value={{
        isOpen,
        currentSong,
        openDrawer,
        closeDrawer,
      }}
    >
      {children}
    </SongDrawerContext.Provider>
  );
}

export function useSongDrawer() {
  const context = useContext(SongDrawerContext);
  if (context === undefined) {
    throw new Error("useSongDrawer must be used within a SongDrawerProvider");
  }
  return context;
}
