"use client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { DashboardLayout } from "@/components/layout/dashboard-layout";

export default function ManagerDashboard() {
  useAuth("manager");

  return (
    <DashboardLayout title="Manager Dashboard" subtitle="User management panel">
      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <Button
            variant="secondary"
            className="h-24 text-lg"
            onClick={() => alert("Managing users...")}
          >
            Manage Users
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
