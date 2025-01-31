"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Eye, ThumbsUp, MessageSquare } from "lucide-react";
import { VideoStats } from "@/lib/youtube";

interface StatsCardProps {
  stats: VideoStats;
}

export function StatsCard({ stats }: StatsCardProps) {
  const formatNumber = (num: string) => {
    return new Intl.NumberFormat("en-US").format(parseInt(num));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
      <Card>
        <CardContent className="flex items-center justify-between p-6">
          <div className="flex items-center space-x-2">
            <Eye className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Views</span>
          </div>
          <span className="text-2xl font-bold">{formatNumber(stats.viewCount)}</span>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="flex items-center justify-between p-6">
          <div className="flex items-center space-x-2">
            <ThumbsUp className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Likes</span>
          </div>
          <span className="text-2xl font-bold">{formatNumber(stats.likeCount)}</span>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="flex items-center justify-between p-6">
          <div className="flex items-center space-x-2">
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Comments</span>
          </div>
          <span className="text-2xl font-bold">{formatNumber(stats.commentCount)}</span>
        </CardContent>
      </Card>
    </div>
  );
}