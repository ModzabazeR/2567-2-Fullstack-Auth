import { User } from "@prisma/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const res = await fetch(`http://localhost:3000/api/public/user/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data: User = await res.json();

  return (
    <div className="mx-auto py-10">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>User Profile</CardTitle>
          <CardDescription>View user information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Email</p>
              <p>{data.email}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Username
              </p>
              <p>{data.username || "Not provided"}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                First Name
              </p>
              <p>{data.firstName || "Not provided"}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Last Name
              </p>
              <p>{data.lastName || "Not provided"}</p>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Bio</p>
            <p>{data.bio || "No bio provided"}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Role</p>
            <p>{data.role}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
