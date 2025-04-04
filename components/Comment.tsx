"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export interface CommentType {
  id: string;
  content: string;
  createdAt: string;
  commentedByUser: {
    username: string | null;
    firstName: string | null;
    lastName: string | null;
  };
}

interface CommentProps {
  userId: string;
  comments: CommentType[];
}

const commentSchema = yup.object().shape({
  content: yup
    .string()
    .required("Comment is required")
    .min(1, "Comment cannot be empty")
    .max(255, "Comment is too long"),
});

type CommentFormValues = yup.InferType<typeof commentSchema>;

export default function Comment({
  userId,
  comments: initialComments,
}: CommentProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [comments, setComments] = useState(initialComments);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CommentFormValues>({
    resolver: yupResolver(commentSchema),
  });

  const onSubmit = async (values: CommentFormValues) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          commentedOn: userId,
          content: values.content.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to post comment");
      }

      const newComment = await response.json();
      setComments((prevComments) => [newComment, ...prevComments]);
      reset();
    } catch (error) {
      console.error("Error posting comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      {isAuthenticated ? (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
          <div>
            <Textarea
              {...register("content")}
              placeholder="Write a comment..."
              className={`min-h-[100px] ${
                errors.content ? "border-red-500" : ""
              }`}
            />
            {errors.content && (
              <p className="text-sm text-red-500 mt-1">
                {errors.content.message}
              </p>
            )}
          </div>
          <Button type="submit" disabled={isSubmitting || !!errors.content}>
            {isSubmitting ? "Posting..." : "Post Comment"}
          </Button>
        </form>
      ) : (
        <div className="text-center py-4 text-muted-foreground">
          <p>
            <a className="text-black hover:underline" href="/login">
              Sign in
            </a>{" "}
            to comment
          </p>
        </div>
      )}

      <div className="space-y-4">
        {comments.map((comment) => (
          <Card key={comment.id}>
            <CardContent>
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">
                    {comment.commentedByUser.username ||
                      `${comment.commentedByUser.firstName} ${comment.commentedByUser.lastName}`}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {formatDistanceToNow(new Date(comment.createdAt), {
                      addSuffix: true,
                    })}
                  </p>
                </div>
              </div>
              <p className="mt-2">{comment.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
