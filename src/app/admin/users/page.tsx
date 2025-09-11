"use client";

import { MainLayout } from "@/components/layout/main-layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { UserForm } from "@/components/forms/user-form";
import { useConfirmDialog } from "@/components/ui/confirm-dialog";
import {
  Users,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  UserCheck,
  UserX,
  Plus,
} from "lucide-react";
import { useState } from "react";

export default function AdminUsers() {
  const [userFormOpen, setUserFormOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const { confirm, ConfirmDialog } = useConfirmDialog();

  const users = [
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      role: "user" as const,
      status: "active" as const,
      joinDate: "2024-01-15",
      lastActive: "2 hours ago",
      avatar: "",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      role: "artist" as const,
      status: "active" as const,
      joinDate: "2024-01-10",
      lastActive: "1 day ago",
      avatar: "",
    },
    {
      id: "3",
      name: "Mike Johnson",
      email: "mike@example.com",
      role: "user" as const,
      status: "inactive" as const,
      joinDate: "2024-01-05",
      lastActive: "1 week ago",
    },
    {
      id: "4",
      name: "Sarah Wilson",
      email: "sarah@example.com",
      role: "artist" as const,
      status: "active" as const,
      joinDate: "2024-01-20",
      lastActive: "3 hours ago",
      avatar: "",
    },
    {
      id: "5",
      name: "David Brown",
      email: "david@example.com",
      role: "user" as const,
      status: "active" as const,
      joinDate: "2024-01-18",
      lastActive: "5 minutes ago",
      avatar: "",
    },
    {
      id: "6",
      name: "Admin User",
      email: "admin@example.com",
      role: "admin" as const,
      status: "active" as const,
      joinDate: "2024-01-01",
      lastActive: "1 minute ago",
      avatar: "",
    },
  ];

  const handleUserSubmit = async (data: any) => {
    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("User submitted:", data);
    setLoading(false);
    setUserFormOpen(false);
    setEditingUser(null);
  };

  const handleEditUser = (user: any) => {
    setEditingUser(user);
    setUserFormOpen(true);
  };

  const handleAddUser = () => {
    setEditingUser(null);
    setUserFormOpen(true);
  };

  const handleDeleteUser = async (userId: string) => {
    const user = users.find(u => u.id === userId);
    const confirmed = await confirm({
      title: "Delete User",
      description: `Are you sure you want to delete ${user?.name}? This action cannot be undone.`,
      variant: "destructive",
      confirmText: "Delete User",
      cancelText: "Cancel"
    });

    if (confirmed) {
      setLoading(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("User deleted:", userId);
      setLoading(false);
    }
  };

  const stats = [
    {
      title: "Total Users",
      value: "12,543",
      change: "+12%",
      color: "text-blue-400",
    },
    {
      title: "Active Users",
      value: "11,234",
      change: "+8%",
      color: "text-green-400",
    },
    {
      title: "New This Month",
      value: "1,456",
      change: "+15%",
      color: "text-purple-400",
    },
    {
      title: "Inactive Users",
      value: "1,309",
      change: "-2%",
      color: "text-red-400",
    },
  ];

  return (
    <MainLayout userType="admin">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">User Management</h1>
            <p className="text-spotify-text-gray mt-2">
              Manage all users and their permissions
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="spotifySecondary" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="spotify" size="sm">
              <Users className="h-4 w-4 mr-2" />
              Add User
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <Card
              key={stat.title}
              className="bg-spotify-gray border-spotify-light-gray"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-spotify-text-gray">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-white">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`text-sm ${stat.color}`}>{stat.change}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Search and Filters */}
        <Card className="bg-spotify-gray border-spotify-light-gray">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/70" />
                  <Input
                    placeholder="Search users by name or email..."
                    className="pl-10 bg-spotify-light-gray border-0 text-white placeholder:text-spotify-text-gray"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="spotifySecondary" size="sm">
                  All Roles
                </Button>
                <Button variant="spotifySecondary" size="sm">
                  All Status
                </Button>
                <Button variant="spotifySecondary" size="sm">
                  Sort by Date
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Users Table */}
        <Card className="bg-spotify-gray border-spotify-light-gray">
          <CardHeader>
            <CardTitle className="text-white">All Users</CardTitle>
            <CardDescription className="text-spotify-text-gray">
              Manage user accounts and permissions
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-spotify-light-gray">
                  <tr>
                    <th className="text-left p-4 text-sm font-medium text-spotify-text-gray">
                      User
                    </th>
                    <th className="text-left p-4 text-sm font-medium text-spotify-text-gray">
                      Role
                    </th>
                    <th className="text-left p-4 text-sm font-medium text-spotify-text-gray">
                      Status
                    </th>
                    <th className="text-left p-4 text-sm font-medium text-spotify-text-gray">
                      Join Date
                    </th>
                    <th className="text-left p-4 text-sm font-medium text-spotify-text-gray">
                      Last Active
                    </th>
                    <th className="text-left p-4 text-sm font-medium text-spotify-text-gray">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr
                      key={user.id}
                      className="border-b border-spotify-light-gray hover:bg-spotify-hover transition-colors"
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <Avatar
                            src={user.avatar}
                            fallback={user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                            size="md"
                          />
                          <div>
                            <p className="font-medium text-white">
                              {user.name}
                            </p>
                            <p className="text-sm text-spotify-text-gray">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            user.role === "artist"
                              ? "bg-green-500/20 text-green-400"
                              : user.role === "admin"
                              ? "bg-purple-500/20 text-purple-400"
                              : "bg-blue-500/20 text-blue-400"
                          }`}
                        >
                          {user.role.charAt(0).toUpperCase() +
                            user.role.slice(1)}
                        </span>
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            user.status === "active"
                              ? "bg-green-500/20 text-green-400"
                              : "bg-red-500/20 text-red-400"
                          }`}
                        >
                          {user.status.charAt(0).toUpperCase() +
                            user.status.slice(1)}
                        </span>
                      </td>
                      <td className="p-4 text-sm text-spotify-text-gray">
                        {user.joinDate}
                      </td>
                      <td className="p-4 text-sm text-spotify-text-gray">
                        {user.lastActive}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-blue-400 hover:text-blue-300 hover:bg-blue-400/10"
                            onClick={() => handleEditUser(user)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-yellow-400 hover:text-yellow-300 hover:bg-yellow-400/10"
                          >
                            {user.status === "active" ? (
                              <UserX className="h-4 w-4" />
                            ) : (
                              <UserCheck className="h-4 w-4" />
                            )}
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-red-400 hover:text-red-300 hover:bg-red-400/10"
                            onClick={() => handleDeleteUser(user.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Add User Button */}
        <div className="mt-6 flex justify-end">
          <Button
            onClick={handleAddUser}
            className="bg-gradient-to-r from-spotify-green to-spotify-green-hover hover:from-spotify-green-hover hover:to-spotify-green text-black font-bold"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New User
          </Button>
        </div>
      </div>

      {/* User Form */}
      <UserForm
        open={userFormOpen}
        onOpenChange={setUserFormOpen}
        onSubmit={handleUserSubmit}
        initialData={editingUser}
        loading={loading}
      />

      {/* Confirm Dialog */}
      <ConfirmDialog />
    </MainLayout>
  );
}
