"use client";
import { useAuth } from "@/hooks/useAuth";
import { UserIcon, FileTextIcon } from "lucide-react";
import { ManagerLayout } from "@/components/layout/manager-layout";
import LinkCard from "@/components/link-card";

export default function ManagerDashboard() {
  const { role } = useAuth("manager");

  return (
    role !== null && (
      <ManagerLayout title="Manager" subtitle="Team oversight">
        <div className="grid gap-6 md:grid-cols-2">
          <LinkCard
            icon={FileTextIcon}
            title="Manage Posts"
            description="View and delete posts"
            href="/manager/posts"
          />
          <LinkCard
            icon={UserIcon}
            title="Read Manual"
            description="Read manual on how to manage the system"
            href="/manager/manual"
          />
          <LinkCard
            icon={UserIcon}
            title="Edit Profile"
            description="Edit your profile"
            href="/profile/edit"
          />
        </div>
      </ManagerLayout>
    )
  );
}
