"use client";

import { SharedSidebar } from "./shared-sidebar";
import { Header } from "./header";
import { SidebarProvider } from "@/contexts/sidebar-context";

interface MainLayoutProps {
  children: React.ReactNode;
  userType: "admin" | "artist" | "user";
}

export function MainLayout({ children, userType }: MainLayoutProps) {
  return (
    <SidebarProvider>
      <div className="flex h-screen bg-spotify-black">
        {/* Sidebar */}
        <SharedSidebar userType={userType} />

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header userType={userType} />
          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
