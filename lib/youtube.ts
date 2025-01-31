import { z } from "zod"
import axios from "axios"

const YOUTUBE_API_KEY = "process.env.NEXT_PUBLIC_YOUTUBE_API_KEY"

export const videoStatsSchema = z.object({
  viewCount: z.string(),
  likeCount: z.string(),
  commentCount: z.string(),
})

export const commentSchema = z.object({
  id: z.string(),
  authorDisplayName: z.string(),
  authorProfileImageUrl: z.string(),
  textDisplay: z.string(),
  publishedAt: z.string(),
  likeCount: z.number(),
})

export type VideoStats = z.infer<typeof videoStatsSchema>
export type Comment = z.infer<typeof commentSchema>

export async function getVideoStats(videoId: string): Promise<VideoStats> {
  const response = await axios.get(
    `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoId}&key=${YOUTUBE_API_KEY}`
  )
  const { data } = response

  return videoStatsSchema.parse({
    viewCount: data.items[0].statistics.viewCount,
    likeCount: data.items[0].statistics.likeCount,
    commentCount: data.items[0].statistics.commentCount,
  })
}

export async function getVideoComments(videoId: string): Promise<Comment[]> {
  return []
  // const response = await axios.get(
  //   `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&key=${YOUTUBE_API_KEY}&order=time&maxResults=100`
  // )
  // const { data } = response

  // return data.items.map((item: any) => ({
  //   id: item.id,
  //   authorDisplayName: item.snippet.topLevelComment.snippet.authorDisplayName,
  //   authorProfileImageUrl:
  //     item.snippet.topLevelComment.snippet.authorProfileImageUrl,
  //   textDisplay: item.snippet.topLevelComment.snippet.textDisplay,
  //   publishedAt: item.snippet.topLevelComment.snippet.publishedAt,
  //   likeCount: item.snippet.topLevelComment.snippet.likeCount,
  // }))
}
