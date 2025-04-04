"use client";
import { useAuth } from "@/hooks/useAuth";
import { AdminLayout } from "@/components/layout/admin-layout";

export default function AdminManual() {
  const { role } = useAuth("admin");

  return (
    role !== null && (
      <AdminLayout
        title="Admin manual"
        subtitle="Read this to understand the admin system"
      >
        <div className="space-y-8">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold">
              Welcome to the Admin Dashboard
            </h2>
            <p className="text-gray-700">
              This manual will guide you through the administrative features and
              functionality of our Content Management System.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-xl font-semibold">Getting Started</h3>
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
              <ol className="list-decimal list-inside space-y-2">
                <li>Log in using your admin credentials</li>
                <li>
                  Navigate through the admin sidebar to access different
                  administrative sections
                </li>
                <li>
                  Your admin dashboard provides quick access to system
                  management tasks
                </li>
              </ol>
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-xl font-semibold">User Management</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="bg-white p-4 rounded-lg border shadow-sm">
                <h4 className="font-medium mb-2">Managing Users</h4>
                <p className="text-sm text-gray-600">
                  Access the "Manage Users" section to view all users, change
                  roles, suspend accounts, or create new administrative users.
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg border shadow-sm">
                <h4 className="font-medium mb-2">Role Permissions</h4>
                <p className="text-sm text-gray-600">
                  Understand the different permission levels: User, Manager, and
                  Admin. Each role has specific access rights and capabilities
                  within the system.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-xl font-semibold">System Administration</h3>
            <p className="text-gray-700">
              As an administrator, you have full control over the system
              configuration. Please use these privileges responsibly.
            </p>
            <div className="flex items-center gap-2">
              <span className="text-blue-600">
                admin-support@cms-system.com
              </span>
            </div>
          </section>
        </div>
      </AdminLayout>
    )
  );
}
