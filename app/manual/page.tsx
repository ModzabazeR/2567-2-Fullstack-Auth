"use client";
import { useAuth } from "@/hooks/useAuth";
import { UserLayout } from "@/components/layout/user-layout";

export default function UserManual() {
  const { role } = useAuth("user");

  return (
    role !== null && (
      <UserLayout
        title="User manual"
        subtitle="Read this to understand the system"
      >
        <div className="space-y-8">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Welcome to the CMS System</h2>
            <p className="text-gray-700">
              This manual will guide you through the basic features and
              functionality of our Content Management System.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-xl font-semibold">Getting Started</h3>
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
              <ol className="list-decimal list-inside space-y-2">
                <li>Log in using your credentials</li>
                <li>
                  Navigate through the sidebar to access different sections
                </li>
                <li>Your dashboard provides quick access to common tasks</li>
              </ol>
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-xl font-semibold">Content Management</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="bg-white p-4 rounded-lg border shadow-sm">
                <h4 className="font-medium mb-2">Creating Content</h4>
                <p className="text-sm text-gray-600">
                  Click the "New Post" button from your dashboard to create new
                  content. Fill in the required fields and save as draft or
                  publish directly.
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg border shadow-sm">
                <h4 className="font-medium mb-2">Editing Content</h4>
                <p className="text-sm text-gray-600">
                  Find your content in the "My Posts" section. Click on any post
                  to edit its content, update metadata, or change its status.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-xl font-semibold">Need Help?</h3>
            <p className="text-gray-700">
              If you need additional assistance, please contact our support
              team:
            </p>
            <div className="flex items-center gap-2">
              <span className="text-blue-600">support@cms-system.com</span>
            </div>
          </section>
        </div>
      </UserLayout>
    )
  );
}
