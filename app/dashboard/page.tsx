"use client";
import { useAuth } from "@/hooks/useAuth";
import { UserIcon } from "lucide-react";
import LinkCard from "@/components/link-card";
import { UserLayout } from "@/components/layout/user-layout";

export default function Dashboard() {
  const { role } = useAuth("user");

  return (
    role !== null && (
      <UserLayout title="Dashboard" subtitle="Welcome back">
        <div className="grid gap-6 md:grid-cols-2">
          <LinkCard
            icon={UserIcon}
            title="Read Manual"
            description="Read manual on how to use the system"
            href="/manual"
          />
          <LinkCard
            icon={UserIcon}
            title="Edit Profile"
            description="Edit your profile"
            href="/profile/edit"
          />
          <LinkCard
            icon={UserIcon}
            title="Create Post"
            description="Write a post"
            href="/posts/create"
          />
        </div>
      </UserLayout>
    )
  );
}
