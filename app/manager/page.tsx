"use client";
import { useAuth } from "@/hooks/useAuth";
import { BarChartIcon, UserIcon } from "lucide-react";
import { ManagerLayout } from "@/components/layout/manager-layout";
import LinkCard from "@/components/link-card";

export default function ManagerDashboard() {
  const { role } = useAuth("manager");

  return (
    role !== null && (
      <ManagerLayout title="Manager" subtitle="Team oversight">
        <div className="grid gap-6 md:grid-cols-2">
          <LinkCard
            icon={UserIcon}
            title="Read Manual"
            description="Read manual on how to manage the system"
            href="/manager/manual"
          />
        </div>
      </ManagerLayout>
    )
  );
}
