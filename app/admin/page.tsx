"use client";
import { useAuth } from "@/hooks/useAuth";
import { UserIcon } from "lucide-react";
import LinkCard from "@/components/link-card";
import { AdminLayout } from "@/components/layout/admin-layout";

export default function AdminDashboard() {
  const { role } = useAuth("admin");

  return (
    role !== null && (
      <AdminLayout title="Admin" subtitle="Administrator">
        <div className="grid gap-6 md:grid-cols-2">
          <LinkCard
            icon={UserIcon}
            title="Read Manual"
            description="Read manual on how to manage the system"
            href="/admin/manual"
          />
          <LinkCard
            icon={UserIcon}
            title="Edit Profile"
            description="Edit your profile"
            href="/profile/edit"
          />
          <LinkCard
            icon={UserIcon}
            title="Manage Users"
            description="Manage role of users"
            href="/admin/manage-users"
          />
        </div>
      </AdminLayout>
    )
  );
}
