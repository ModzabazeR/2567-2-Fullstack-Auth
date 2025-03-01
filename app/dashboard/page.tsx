"use client";
import { useAuth } from "@/hooks/useAuth";
import { DashboardLayout } from "@/components/layout/dashboard-layout";

export default function UserDashboard() {
  useAuth();

  return (
    <DashboardLayout
      title="User Dashboard"
      subtitle="Welcome to your dashboard"
    >
      <div className="grid gap-4 md:grid-cols-3">
        <div className="bg-primary/10 rounded-lg p-6">
          <h3 className="font-semibold mb-2">Quick Stats</h3>
          <p className="text-2xl font-bold">0</p>
        </div>
        <div className="bg-secondary/10 rounded-lg p-6">
          <h3 className="font-semibold mb-2">Activities</h3>
          <p className="text-2xl font-bold">0</p>
        </div>
        <div className="bg-muted/10 rounded-lg p-6">
          <h3 className="font-semibold mb-2">Notifications</h3>
          <p className="text-2xl font-bold">0</p>
        </div>
      </div>
    </DashboardLayout>
  );
}
