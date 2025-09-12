"use client";

import React, { createContext, useContext, useState } from "react";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  userType: "admin" | "artist" | "user";
}

interface ProfileContextType {
  profile: UserProfile | null;
  setProfile: (profile: UserProfile | null) => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

// Mock data for different user types
const mockProfiles: Record<string, UserProfile> = {
  admin: {
    id: "1",
    name: "Admin User",
    email: "admin@sublime.com",
    userType: "admin",
  },
  artist: {
    id: "2",
    name: "John Doe",
    email: "john.doe@artist.com",
    userType: "artist",
  },
  user: {
    id: "3",
    name: "Music Lover",
    email: "user@music.com",
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

  return (
    <ProfileContext.Provider
      value={{
        profile,
        setProfile,
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
