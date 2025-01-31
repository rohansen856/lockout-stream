"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Comment } from "@/lib/youtube";
import { formatDistanceToNow } from "date-fns";
import { ThumbsUp } from "lucide-react";

interface CommentsSectionProps {
  comments: Comment[];
}

export function CommentsSection({ comments }: CommentsSectionProps) {
  return (
    <ScrollArea className="h-[600px] w-full rounded-md border p-4">
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="flex space-x-4">
            <Avatar>
              <AvatarImage src={comment.authorProfileImageUrl} alt={comment.authorDisplayName} />
              <AvatarFallback>{comment.authorDisplayName[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-1">
              <div className="flex items-center space-x-2">
                <span className="font-semibold">{comment.authorDisplayName}</span>
                <span className="text-sm text-muted-foreground">
                  {formatDistanceToNow(new Date(comment.publishedAt), { addSuffix: true })}
                </span>
              </div>
              <p className="text-sm text-foreground">{comment.textDisplay}</p>
              <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                <ThumbsUp className="h-4 w-4" />
                <span>{comment.likeCount}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}