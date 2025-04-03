"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";

interface Post {
  id: number;
  title: string;
  content: string;
  writer: {
    id: string;
    username: string;
  };
  createdAt: string;
}

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);

  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/posts");
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
      toast.error("Failed to load posts");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Posts</h1>
        <a
          href="/posts/create"
          className="bg-black text-white px-4 py-2 rounded hover:bg-black/80"
        >
          Create New Post
        </a>
      </div>

      <div className="flex flex-col gap-4">
        {posts.map((post) => (
          <div key={post.id} className="shadow-md rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
            <p className="text-gray-600 mb-4">{post.content}</p>
            <div className="flex items-center justify-between">
              <a
                href={`/profile/${post.writer.id}`}
                className="text-black hover:underline"
              >
                {post.writer.username}
              </a>
              <p className="text-gray-500">{post.createdAt}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
