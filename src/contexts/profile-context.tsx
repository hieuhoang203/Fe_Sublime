"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  bio?: string;
  location?: string;
  joinDate: string;
  avatar?: string;
  coverImage?: string;
  userType: "admin" | "artist" | "user";
  // Artist specific
  artistName?: string;
  genre?: string;
  followers?: number;
  totalPlays?: number;
  // Admin specific
  role?: string;
  permissions?: string[];
}

interface ProfileContextType {
  profile: UserProfile | null;
  setProfile: (profile: UserProfile | null) => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  isProfileOpen: boolean;
  openProfile: () => void;
  closeProfile: () => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

// Mock data for different user types
const mockProfiles: Record<string, UserProfile> = {
  admin: {
    id: "1",
    name: "Admin User",
    email: "admin@spotify.com",
    phone: "+1 234 567 8900",
    bio: "Platform administrator with full access to all features and content management.",
    location: "San Francisco, CA",
    joinDate: "2023-01-15",
    avatar: "",
    coverImage: "",
    userType: "admin",
    role: "super-admin",
    permissions: ["users", "content", "analytics", "settings"],
  },
  artist: {
    id: "2",
    name: "John Doe",
    email: "john.doe@artist.com",
    phone: "+1 234 567 8901",
    bio: "Independent musician creating music that connects with people's hearts and souls.",
    location: "Los Angeles, CA",
    joinDate: "2023-03-20",
    avatar: "",
    coverImage: "",
    userType: "artist",
    artistName: "Johnny Music",
    genre: "pop",
    followers: 12543,
    totalPlays: 1200000,
  },
  user: {
    id: "3",
    name: "Music Lover",
    email: "user@music.com",
    phone: "+1 234 567 8902",
    bio: "Passionate music enthusiast who loves discovering new artists and creating playlists.",
    location: "New York, NY",
    joinDate: "2023-06-10",
    avatar: "",
    coverImage: "",
    userType: "user",
  },
};

export function ProfileProvider({
  children,
  userType = "user",
}: {
  children: React.ReactNode;
  userType?: "admin" | "artist" | "user";
}) {
  const [profile, setProfile] = useState<UserProfile | null>(
    mockProfiles[userType]
  );
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const updateProfile = useCallback((updates: Partial<UserProfile>) => {
    setProfile((prev) => (prev ? { ...prev, ...updates } : null));
  }, []);

  const openProfile = useCallback(() => {
    setIsProfileOpen(true);
  }, []);

  const closeProfile = useCallback(() => {
    setIsProfileOpen(false);
  }, []);

  return (
    <ProfileContext.Provider
      value={{
        profile,
        setProfile,
        updateProfile,
        isProfileOpen,
        openProfile,
        closeProfile,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
}
