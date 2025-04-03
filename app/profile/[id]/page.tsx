import { User } from "@prisma/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Comment from "@/components/Comment";
import { CommentType } from "@/components/Comment";

async function getComments(userId: string) {
  const res = await fetch(
    `http://localhost:3000/api/comments?userId=${userId}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch comments");
  }
  return res.json();
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [userData, comments]: [User, CommentType[]] = await Promise.all([
    fetch(`http://localhost:3000/api/public/user/${id}`).then((res) => {
      if (!res.ok) throw new Error("Failed to fetch user data");
      return res.json();
    }),
    getComments(id),
  ]);

  return (
    <div className="mx-auto py-10 space-y-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>User Profile</CardTitle>
          <CardDescription>View user information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Email</p>
              <p>{userData.email}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Username
              </p>
              <p>{userData.username || "Not provided"}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                First Name
              </p>
              <p>{userData.firstName || "Not provided"}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Last Name
              </p>
              <p>{userData.lastName || "Not provided"}</p>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Bio</p>
            <p>{userData.bio || "No bio provided"}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Role</p>
            <p>{userData.role}</p>
          </div>
        </CardContent>
      </Card>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Comments</CardTitle>
          <CardDescription>Comments on this profile</CardDescription>
        </CardHeader>
        <CardContent>
          <Comment userId={parseInt(id)} comments={comments} />
        </CardContent>
      </Card>
    </div>
  );
}
