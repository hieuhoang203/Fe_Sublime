"use client";

import { SharedSidebar } from "./shared-sidebar";
import { Header } from "./header";
import { SidebarProvider } from "@/contexts/sidebar-context";
import { ProfileProvider } from "@/contexts/profile-context";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

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

export function AppLayout({ children }: AppLayoutProps) {
  const pathname = usePathname();
  const userType = useMemo(() => getUserTypeFromPath(pathname), [pathname]);

  return (
    <ProfileProvider userType={userType}>
      <SidebarProvider>
        <div className="flex h-screen bg-spotify-black">
          {/* Sidebar - Only re-render when userType changes */}
          <SharedSidebar userType={userType} />

          {/* Main Content */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Header - Only re-render when userType changes */}
            <Header userType={userType} />

            {/* Page Content - This will re-render on navigation */}
            <main className="flex-1 overflow-y-auto">{children}</main>
          </div>
        </div>
      </SidebarProvider>
    </ProfileProvider>
  );
}
