"use client";
import { useAuth } from "@/hooks/useAuth";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { UserIcon } from "lucide-react";

export default function ManagerDashboard() {
  const { role } = useAuth("manager");

  return role !== null && (
    <DashboardLayout title="Manager" subtitle="Team oversight">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-white shadow-sm rounded-xl p-5 border border-gray-100 flex flex-col">
          <div className="flex items-center mb-2">
            <UserIcon className="w-4 h-4 text-gray-500 mr-2" />
            <h3 className="text-sm font-medium text-gray-500">User Management</h3>
          </div>
          <p className="text-base text-gray-600 mb-4">Review and modify user accounts and permissions</p>
          <div className="flex justify-between items-center mt-auto">
            <span className="text-sm text-gray-400">User accounts: 12</span>
            <button 
              className="bg-gray-100 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
              onClick={() => alert("Managing users...")}
            >
              Manage Users
            </button>
          </div>
        </div>
        <div className="bg-white shadow-sm rounded-xl p-5 border border-gray-100 flex flex-col">
          <div className="flex items-center mb-2">
            <svg className="w-4 h-4 text-gray-500 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M16 4v16M8 4v16M3 8h18M3 16h18" />
            </svg>
            <h3 className="text-sm font-medium text-gray-500">Reports</h3>
          </div>
          <p className="text-base text-gray-600 mb-4">Access team performance metrics and insights</p>
          <div className="flex justify-between items-center mt-auto">
            <span className="text-sm text-gray-400">Last updated: Today</span>
            <button 
              className="bg-gray-100 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
              onClick={() => alert("Viewing reports...")}
            >
              View Reports
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}