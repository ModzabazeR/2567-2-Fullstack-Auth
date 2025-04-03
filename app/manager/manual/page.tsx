"use client";
import { useAuth } from "@/hooks/useAuth";
import { ManagerLayout } from "@/components/layout/manager-layout";

export default function ManagerManual() {
  const { role } = useAuth("manager");

  return (
    role !== null && (
      <ManagerLayout
        title="Manager manual"
        subtitle="Read this to understand the manager system"
      >
        <div className="space-y-8">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold">
              Welcome to the Manager Dashboard
            </h2>
            <p className="text-gray-700">
              This manual will guide you through the management features and
              functionality of our Content Management System.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-xl font-semibold">Getting Started</h3>
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
              <ol className="list-decimal list-inside space-y-2">
                <li>Log in using your manager credentials</li>
                <li>
                  Navigate through the manager sidebar to access different
                  management sections
                </li>
                <li>
                  Your manager dashboard provides quick access to team oversight
                  tasks
                </li>
              </ol>
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-xl font-semibold">Team Management</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="bg-white p-4 rounded-lg border shadow-sm">
                <h4 className="font-medium mb-2">Overseeing Team Members</h4>
                <p className="text-sm text-gray-600">
                  Monitor team performance, review content submissions, and
                  provide feedback to team members to maintain quality
                  standards.
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg border shadow-sm">
                <h4 className="font-medium mb-2">Content Approval</h4>
                <p className="text-sm text-gray-600">
                  Review and approve content submitted by team members before
                  publication. Ensure all content meets organizational
                  guidelines and quality standards.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-xl font-semibold">Need Assistance?</h3>
            <p className="text-gray-700">
              As a manager, you have oversight responsibilities for your team.
              If you need additional support, please contact:
            </p>
            <div className="flex items-center gap-2">
              <span className="text-blue-600">
                manager-support@cms-system.com
              </span>
            </div>
          </section>
        </div>
      </ManagerLayout>
    )
  );
}
