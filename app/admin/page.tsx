"use client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { DashboardLayout } from "@/components/layout/dashboard-layout";

export default function AdminDashboard() {
  useAuth("admin");

  return (
    <DashboardLayout
      title="Admin Dashboard"
      subtitle="System administration panel"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <Button
          variant="secondary"
          className="h-24 text-lg"
          onClick={() => alert("Managing the system...")}
        >
          Manage System
        </Button>
        <Button
          variant="secondary"
          className="h-24 text-lg"
          onClick={() => alert("Viewing Logs...")}
        >
          View Logs
        </Button>
      </div>
    </DashboardLayout>
  );
}
