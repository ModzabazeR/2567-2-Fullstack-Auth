"use client";
import { useAuth } from "@/hooks/useAuth";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import Image from "next/image";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Bell,
  Calendar,
  PieChart,
  TrendingUp,
  User,
  Activity,
} from "lucide-react";

export default function UserDashboard() {
  

  // Sample data for the chart
  const activityData = [
    { name: "Mon", value: 12 },
    { name: "Tue", value: 19 },
    { name: "Wed", value: 8 },
    { name: "Thu", value: 24 },
    { name: "Fri", value: 15 },
    { name: "Sat", value: 5 },
    { name: "Sun", value: 10 },
  ];

  // Sample recent activities
  const recentActivities = [
    { id: 1, title: "Project submitted", time: "2 hours ago" },
    { id: 2, title: "Meeting scheduled", time: "Yesterday" },
    { id: 3, title: "New comment received", time: "2 days ago" },
  ];
  const authRes = useAuth();
  

  return authRes.role !== null &&(
    <DashboardLayout title="Dashboard" subtitle="Overview">
      <div className="flex flex-col gap-6">
        {/* Welcome card with gradient background */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 shadow-md rounded-xl p-6 flex items-center text-white">
          <div className="mr-4 relative w-16 h-16 rounded-full overflow-hidden border-2 border-white">
            <Image
              src="https://media.discordapp.net/attachments/1311899863960780831/1343570059225731174/IMG_6551.png?ex=67c3af60&is=67c25de0&hm=adb6befaf30616c11ea5f09534904bf06c8142dc42c6831a06955e1ac81d0f68&=&format=webp&quality=lossless&width=439&height=585"
              alt="Profile"
              fill
              sizes="100vw"
              style={{
                objectFit: "cover",
              }}
            />
          </div>
          <div>
            <h3 className="text-xl font-bold">Welcome back, Gigi!</h3>
            <p className="text-indigo-100">Your dashboard is up to date</p>
          </div>
          <div className="ml-auto">
            <button className="bg-black hover:bg-gray-800 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center">
              <Activity className="w-4 h-4 mr-2" />
              View Activity
            </button>
          </div>
        </div>

        {/* Stats cards with icons */}
        <div className="grid gap-6 md:grid-cols-3">
          <div className="bg-white shadow-md rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-shadow duration-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-gray-700">Stats</h3>
              <div className="p-2 bg-indigo-100 rounded-lg">
                <TrendingUp className="w-5 h-5 text-indigo-600" />
              </div>
            </div>
            <p className="text-3xl font-bold">42</p>
            <p className="text-sm text-emerald-600 mt-1 flex items-center">
              <span className="mr-1">↑</span> 12% from last week
            </p>
          </div>

          <div className="bg-white shadow-md rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-shadow duration-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-gray-700">Activities</h3>
              <div className="p-2 bg-amber-100 rounded-lg">
                <Calendar className="w-5 h-5 text-amber-600" />
              </div>
            </div>
            <p className="text-3xl font-bold">18</p>
            <p className="text-sm text-amber-600 mt-1 flex items-center">
              <span className="mr-1">↑</span> 5 new this week
            </p>
          </div>

          <div className="bg-white shadow-md rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-shadow duration-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-gray-700">Alerts</h3>
              <div className="p-2 bg-rose-100 rounded-lg">
                <Bell className="w-5 h-5 text-rose-600" />
              </div>
            </div>
            <p className="text-3xl font-bold">3</p>
            <p className="text-sm text-rose-600 mt-1 flex items-center">
              <span className="mr-1">!</span> 2 need attention
            </p>
          </div>
        </div>

        {/* My Gallery Section */}
        <div className="bg-white shadow-md rounded-xl p-6 overflow-hidden">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Gallery View</h2>
            <button className="bg-black hover:bg-gray-800 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center text-sm">
              <PieChart className="w-4 h-4 mr-2" />
              View All
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {/* Gallery Item 1 */}
            <div className="group relative rounded-xl overflow-hidden shadow-md h-64 transition-all duration-300 hover:shadow-xl">
              <Image
                src="https://media.discordapp.net/attachments/1311899863960780831/1343570059225731174/IMG_6551.png?ex=67c3af60&is=67c25de0&hm=adb6befaf30616c11ea5f09534904bf06c8142dc42c6831a06955e1ac81d0f68&=&format=webp&quality=lossless&width=439&height=585"
                alt="Gallery Image 1"
                className="transition-transform duration-500 group-hover:scale-110"
                fill
                sizes="100vw"
                style={{
                  objectFit: "cover",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <h3 className="text-white font-bold text-lg">Portrait Mode</h3>
                <p className="text-gray-200 text-sm">Added 2 days ago</p>
              </div>
            </div>

            {/* Gallery Item 2 */}
            <div className="group relative rounded-xl overflow-hidden shadow-md h-64 transition-all duration-300 hover:shadow-xl">
              <Image
                src="https://media.discordapp.net/attachments/726029446557073415/1343410434220359750/IMG_6553.jpg?ex=67c3c376&is=67c271f6&hm=1f370263537d4c6967e45b92e8a42bf30b11ca1afd276703669ae1a50c67d97b&=&format=webp&width=651&height=585"
                alt="Gallery Image 2"
                className="transition-transform duration-500 group-hover:scale-110"
                fill
                sizes="100vw"
                style={{
                  objectFit: "cover",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <h3 className="text-white font-bold text-lg">Landscape Shot</h3>
                <p className="text-gray-200 text-sm">Added yesterday</p>
              </div>
            </div>

            {/* Gallery Item 3 - Placeholder for demo */}
            <div className="group relative rounded-xl overflow-hidden shadow-md h-64 transition-all duration-300 hover:shadow-xl bg-gradient-to-r from-purple-400 to-pink-500 flex items-center justify-center">
              <div className="text-white text-center p-4">
                <div className="border-2 border-white rounded-full p-4 inline-flex mb-4">
                  <PieChart className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-xl">Add New</h3>
                <p className="text-sm mt-2">Upload your next masterpiece</p>
              </div>
            </div>

            {/* Gallery Item 4 - Placeholder for demo */}
            <div className="group relative rounded-xl overflow-hidden shadow-md h-64 transition-all duration-300 hover:shadow-xl">
              <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                <div className="text-gray-500 text-center">
                  <Calendar className="w-8 h-8 mx-auto mb-2" />
                  <p>More photos coming soon</p>
                </div>
              </div>
            </div>
          </div>

          {/* Gallery Stats */}
          <div className="mt-6 grid grid-cols-3 gap-4">
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-indigo-600">4</p>
              <p className="text-gray-600 text-sm">Total Photos</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-amber-600">152</p>
              <p className="text-gray-600 text-sm">Views</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-emerald-600">28</p>
              <p className="text-gray-600 text-sm">Likes</p>
            </div>
          </div>
        </div>

        {/* Activity chart and recent activities */}
        <div className="grid gap-6 md:grid-cols-2">
          <div className="bg-white shadow-md rounded-xl p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-gray-700">Weekly Activity</h3>
              <div className="p-2 bg-blue-100 rounded-lg">
                <PieChart className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={activityData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#6366f1" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white shadow-md rounded-xl p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-gray-700">Recent Activities</h3>
              <button className="text-sm text-indigo-600 hover:text-indigo-800">
                View all
              </button>
            </div>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start py-2 border-b border-gray-100 last:border-0"
                >
                  <div className="p-2 bg-gray-100 rounded-lg mr-3">
                    <User className="w-4 h-4 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">
                      {activity.title}
                    </p>
                    <p className="text-sm text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <button className="w-full bg-black hover:bg-gray-800 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200">
                View All Activities
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
