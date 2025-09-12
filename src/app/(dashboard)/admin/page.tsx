"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart3,
  Users,
  Music,
  Album,
  TrendingUp,
  Clock,
  Mic,
} from "lucide-react";

export default function AdminDashboard() {
  const stats = [
    {
      title: "Total Users",
      value: "12,543",
      change: "+12%",
      icon: Users,
      color: "text-blue-400",
    },
    {
      title: "Total Artists",
      value: "1,234",
      change: "+8%",
      icon: Music,
      color: "text-green-400",
    },
    {
      title: "Total Songs",
      value: "45,678",
      change: "+15%",
      icon: Album,
      color: "text-purple-400",
    },
    {
      title: "Total Albums",
      value: "3,456",
      change: "+5%",
      icon: BarChart3,
      color: "text-orange-400",
    },
  ];

  const recentActivities = [
    {
      id: 1,
      action: "New artist registered",
      user: "John Doe",
      time: "2 minutes ago",
    },
    {
      id: 2,
      action: "Song uploaded",
      user: "Jane Smith",
      time: "5 minutes ago",
    },
    {
      id: 3,
      action: "Album created",
      user: "Mike Johnson",
      time: "10 minutes ago",
    },
    {
      id: 4,
      action: "User reported content",
      user: "Sarah Wilson",
      time: "15 minutes ago",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
        <p className="text-spotify-text-gray mt-2">
          Manage your music platform
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card
            key={stat.title}
            className="spotify-card-enhanced hover-lift hover-glow animate-fade-in-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-spotify-text-gray">
                {stat.title}
              </CardTitle>
              <stat.icon
                className={`h-5 w-5 ${stat.color} group-hover:scale-110 transition-transform duration-300`}
              />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white mb-2">
                {stat.value}
              </div>
              <p className="text-sm text-green-400 flex items-center gap-2 font-medium">
                <TrendingUp className="h-4 w-4" />
                {stat.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart Placeholder */}
        <Card className="spotify-card-glass hover-lift animate-fade-in-up">
          <CardHeader>
            <CardTitle className="text-white text-xl font-bold">
              User Growth
            </CardTitle>
            <CardDescription className="text-spotify-text-gray text-base">
              Last 7 days
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center text-spotify-text-gray">
              <div className="text-center">
                <BarChart3 className="h-16 w-16 mx-auto mb-4 text-spotify-green animate-pulse-slow" />
                <p className="text-lg font-medium">
                  Chart will be implemented here
                </p>
                <div className="mt-4 w-full bg-spotify-light-gray rounded-full h-2">
                  <div className="bg-gradient-to-r from-spotify-green to-spotify-green-hover h-2 rounded-full w-3/4 animate-shimmer"></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="spotify-card-glass hover-lift animate-fade-in-up">
          <CardHeader>
            <CardTitle className="text-white text-xl font-bold">
              Recent Activity
            </CardTitle>
            <CardDescription className="text-spotify-text-gray text-base">
              Latest platform activities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div
                  key={activity.id}
                  className="flex items-center justify-between p-3 bg-spotify-light-gray/50 rounded-lg hover:bg-spotify-light-gray transition-all duration-300 group animate-slide-in-left"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white group-hover:text-gradient transition-all duration-300">
                      {activity.action}
                    </p>
                    <p className="text-xs text-spotify-text-gray group-hover:text-white transition-colors duration-300">
                      {activity.user}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-spotify-text-gray group-hover:text-white transition-colors duration-300">
                    <Clock className="h-3 w-3" />
                    {activity.time}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="spotify-card-enhanced hover-lift animate-fade-in-up">
        <CardHeader>
          <CardTitle className="text-white text-xl font-bold">
            Quick Actions
          </CardTitle>
          <CardDescription className="text-spotify-text-gray text-base">
            Common administrative tasks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                icon: Users,
                title: "Manage Users",
                description: "View and edit users",
                color: "text-blue-400",
                delay: "0s",
              },
              {
                icon: Mic,
                title: "Manage Artists",
                description: "View and edit artists",
                color: "text-green-400",
                delay: "0.1s",
                href: "/admin/artists",
              },
              {
                icon: Music,
                title: "Manage Songs",
                description: "Approve and manage songs",
                color: "text-purple-400",
                delay: "0.2s",
              },
              {
                icon: Album,
                title: "Manage Albums",
                description: "Manage album releases",
                color: "text-cyan-400",
                delay: "0.3s",
                href: "/admin/albums",
              },
              {
                icon: BarChart3,
                title: "View Reports",
                description: "Analytics and insights",
                color: "text-orange-400",
                delay: "0.4s",
              },
            ].map((action, index) => {
              const IconComponent = action.icon;
              return (
                <div
                  key={index}
                  className="p-6 bg-gradient-to-br from-spotify-light-gray to-spotify-gray hover:from-spotify-gray hover:to-spotify-light-gray rounded-xl transition-all duration-300 text-left group hover-lift hover-glow animate-fade-in-up block cursor-pointer"
                  style={{ animationDelay: action.delay }}
                  onClick={() =>
                    action.href && (window.location.href = action.href)
                  }
                >
                  <IconComponent
                    className={`h-8 w-8 ${action.color} mb-3 group-hover:scale-110 transition-transform duration-300`}
                  />
                  <p className="text-sm font-bold text-white group-hover:text-gradient transition-all duration-300 mb-1">
                    {action.title}
                  </p>
                  <p className="text-xs text-spotify-text-gray group-hover:text-white transition-colors duration-300">
                    {action.description}
                  </p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
