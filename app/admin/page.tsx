"use client";
import { useAuth } from "@/hooks/useAuth";
import { DashboardLayout } from "@/components/layout/dashboard-layout";

export default function AdminDashboard() {
  const authRes = useAuth("admin");
  

  return authRes.role !== null &&(
    <DashboardLayout
      title="Admin"
      subtitle="System management"
    >
      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-white shadow-sm rounded-xl p-5 border border-gray-100 flex flex-col">
          <h3 className="text-sm font-medium text-gray-500 mb-1">System Management</h3>
          <p className="text-base text-gray-600 mb-4">Configure and maintain system settings</p>
          <button 
            className="mt-auto bg-gray-900 text-white py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
            onClick={() => alert("Managing the system...")}
          >
            Manage System
          </button>
        </div>
        <div className="bg-white shadow-sm rounded-xl p-5 border border-gray-100 flex flex-col">
          <h3 className="text-sm font-medium text-gray-500 mb-1">System Logs</h3>
          <p className="text-base text-gray-600 mb-4">View activity logs and error reports</p>
          <button 
            className="mt-auto bg-gray-900 text-white py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
            onClick={() => alert("Viewing Logs...")}
          >
            View Logs
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}