"use client"

import React, { FormEvent, useState } from "react"
import { Youtube, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

const GradientBackground = () => (
  <svg viewBox="0 0 1000 1000" className="fixed w-full h-screen opacity-50">
    <defs>
      <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: "#4F46E5", stopOpacity: 0.7 }} />
        <stop
          offset="100%"
          style={{ stopColor: "#7C3AED", stopOpacity: 0.7 }}
        />
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#grad1)" />
  </svg>
)

const StatCard = ({ icon: Icon, label, value }: any) => (
  <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 flex items-center space-x-4 border border-white/20">
    <div className="p-3 bg-indigo-600 rounded-lg">
      <Icon className="w-6 h-6 text-white" />
    </div>
    <div>
      <p className="text-white/60 text-sm">{label}</p>
      <p className="text-white font-bold text-lg">{value}</p>
    </div>
  </div>
)

const ChatMessage = ({ username, message }: any) => (
  <div className="bg-white/5 backdrop-blur p-3 rounded-lg mb-2 border border-white/10">
    <p className="text-indigo-400 font-semibold text-sm">{username}</p>
    <p className="text-white/90 text-sm">{message}</p>
  </div>
)

export default function Home() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [videoId, setVideoId] = useState("")

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    if (videoId) {
      router.push(`/${videoId}`)
    }
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-slate-900 relative">
      <GradientBackground />
      <div className="absolute h-full w-full backdrop-blur-sm z-10" />

      <div className="container mx-auto px-4 py-8 z-20 relative">
        <div className="flex items-center justify-center mb-8 gap-3">
          <Youtube className="w-12 h-12 text-red-500" />
          <h1 className="text-4xl font-bold text-white">
            Livestream Dashboard
          </h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mb-8 flex gap-4 max-w-2xl mx-auto"
        >
          <Input
            type="text"
            placeholder="Enter YouTube Video ID"
            value={videoId}
            onChange={(e) => setVideoId(e.target.value)}
            className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/50"
          />
          <Button
            type="submit"
            disabled={isLoading}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Loading...
              </>
            ) : (
              "Load Stream"
            )}
          </Button>
        </form>
      </div>
    </div>
  )
}
