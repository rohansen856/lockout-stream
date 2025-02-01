"use client"

import { useState, useEffect } from "react"
import { io, Socket } from "socket.io-client"
import {
  MessageCircle,
  Eye,
  Heart,
  Share2,
  Trophy,
  Timer,
  Crown,
  Zap,
} from "lucide-react"
import Image from "next/image"
import type { Question, Player, ContestScore } from "@/types/contest"
import { PlayerCard } from "@/components/player-card"
import { QuestionsTabs } from "@/components/questions-tabs"
import { ScoreProgress } from "@/components/score-progress"
import { ContestProblems } from "@/components/contest-info"
import { StatCard } from "@/components/stats-card"

interface HomeProps {
  params: {
    id: string
  }
}

export default function Home({ params }: HomeProps) {
  const [contestId, setContestId] = useState<string | null>()
  const [currentVideoId] = useState(params.id)
  const [timeLeft, setTimeLeft] = useState(7200)
  const [players, setPlayers] = useState<{ [key: string]: Player } | null>()
  const [questions, setQuestions] = useState<Question[] | null>()
  const [score, setScore] = useState<ContestScore | null>()
  const [socket, setSocket] = useState<Socket | null>(null)

  useEffect(() => {
    const newSocket = io(
      process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000"
    )
    setSocket(newSocket)

    newSocket.on(
      "contest_update",
      (data: {
        contestId: string
        players: { [key: string]: Player }
        questions: Question[]
        score: ContestScore
      }) => {
        console.log(data)
        setContestId(data.contestId)
        setPlayers(data.players)
        setQuestions(data.questions)
        setScore(data.score)
      }
    )

    return () => {
      newSocket.disconnect()
    }
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="min-h-screen bg-gray-900 relative">
      <div className="fixed w-full h-screen">
        <div className="relative h-full w-full">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 to-purple-900/30 z-20" />
          <Image
            src="/tpc-bg.png"
            fill
            alt="Background"
            className="object-cover z-10 absolute opacity-40"
            priority
          />
        </div>
        <div className="absolute h-full w-full backdrop-blur-sm z-10" />
      </div>

      <div className="container mx-auto px-4 py-8 z-20 relative">
        <div className="flex items-center justify-center mb-8 space-x-4">
          <Trophy className="w-8 h-8 text-yellow-400 animate-pulse" />
          <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
            Competitive Programming Contest
          </h1>
          <Trophy className="w-8 h-8 text-yellow-400 animate-pulse" />
        </div>

        <div className="flex justify-center items-center mb-8">
          <div className="bg-gray-800/80 rounded-full px-6 py-2 flex items-center space-x-2">
            <Timer className="w-5 h-5 text-red-400" />
            <span className="text-white font-mono text-xl">
              {formatTime(timeLeft)}
            </span>
          </div>
        </div>

        {currentVideoId && (
          <div className="space-y-8">
            <div className="flex gap-6">
              {/* Left Sidebar - Chat */}
              {players && score && (
                <div
                  key={players.player1.id}
                  className="bg-slate-800/50 backdrop-blur rounded-xl p-4 border border-white/10 hidden md:block"
                >
                  <PlayerCard
                    player={players.player1}
                    side={"left"}
                    isWinning={score["player1"] > score["player2"]}
                  />
                </div>
              )}

              {/* Main Content */}
              <div className="flex-1 space-y-6">
                <div className="aspect-video rounded-xl overflow-hidden border border-white/20">
                  <iframe
                    src={`https://www.youtube.com/embed/${currentVideoId}`}
                    className="w-full h-full"
                    allowFullScreen
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  />
                </div>

                <div className="grid grid-cols-4 gap-4">
                  <StatCard icon={Eye} label="Viewers" value="1.2K" />
                  <StatCard icon={Heart} label="Likes" value="423" />
                  <StatCard icon={MessageCircle} label="Comments" value="89" />
                  <StatCard icon={Share2} label="Shares" value="32" />
                </div>
              </div>

              {/* Right Sidebar - Stream Info */}
              {players && score && (
                <div
                  key={players.player2.id}
                  className="bg-slate-800/50 backdrop-blur rounded-xl p-4 border border-white/10 hidden md:block"
                >
                  <PlayerCard
                    player={players.player2}
                    side={"left"}
                    isWinning={score["player2"] > score["player1"]}
                  />
                </div>
              )}
            </div>

            <div className="flex gap-6 md:hidden">
              {players && score && (
                <>
                  <div
                    key={players.player1.id}
                    className="bg-slate-800/50 backdrop-blur rounded-xl p-4 border border-white/10"
                  >
                    <PlayerCard
                      player={players.player1}
                      side={"left"}
                      isWinning={score["player1"] > score["player2"]}
                    />
                  </div>

                  <div
                    key={players.player2.id}
                    className="bg-slate-800/50 backdrop-blur rounded-xl p-4 border border-white/10"
                  >
                    <PlayerCard
                      player={players.player2}
                      side={"left"}
                      isWinning={score["player2"] > score["player1"]}
                    />
                  </div>
                </>
              )}
            </div>

            {score && <ScoreProgress score={score} />}

            {/* Problems Section */}
            <div className="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-white/10">
              <div className="flex items-center justify-center mb-4 space-x-2">
                <Zap className="w-6 h-6 text-yellow-400" />
                <h2 className="text-2xl font-bold text-white">
                  Challenge Problems
                </h2>
                <Zap className="w-6 h-6 text-yellow-400" />
              </div>
              {questions && <QuestionsTabs questions={questions} />}
            </div>

            {contestId && <ContestProblems contestId={contestId} />}
          </div>
        )}
      </div>
    </div>
  )
}
