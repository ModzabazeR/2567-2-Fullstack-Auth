import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function UserLayout({
  children,
  title,
  subtitle,
}: {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}) {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 w-64 h-full border-r bg-white">
        <div className="p-4">
          <h2 className="text-xl font-semibold">Dashboard</h2>
        </div>
        <nav className="mt-4">
          <Button
            variant="ghost"
            className="w-full justify-start px-4 py-2 text-left"
            onClick={() => {
              router.push("/dashboard");
            }}
          >
            Dashboard
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start px-4 py-2 text-left"
            onClick={() => {
              router.push("/manual");
            }}
          >
            Manual
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start px-4 py-2 text-left"
            onClick={() => {
              localStorage.clear();
              location.href = "/login";
            }}
          >
            Sign Out
          </Button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">{title}</h1>
          {subtitle && (
            <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
          )}
        </div>
        <div className="bg-white rounded-lg border p-6">{children}</div>
      </div>
    </div>
  );
}
