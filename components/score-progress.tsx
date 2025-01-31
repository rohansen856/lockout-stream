"use client"

import { Progress } from "@/components/ui/progress"
import { ContestScore } from "@/types/contest"

interface ScoreProgressProps {
  score: ContestScore
}

export function ScoreProgress({ score }: ScoreProgressProps) {
  // Calculate the total points between both players
  const totalPoints = score.player1 + score.player2

  // Calculate player 1's percentage of the total points
  // If total points is 0, default to 50-50 split
  const player1Percentage =
    totalPoints === 0 ? 50 : (score.player1 / totalPoints) * 100

  return (
    <div className="bg-gray-800/80 border-white/20 text-white backdrop-blur-md p-6 rounded-lg border">
      <div className="flex justify-between mb-2">
        <span className="font-semibold">Player 1: {score.player1} points</span>
        <span className="font-semibold">Player 2: {score.player2} points</span>
      </div>
      <div className="relative h-4">
        <Progress
          value={player1Percentage}
          className="w-full bg-red-600"
          indicatorColor="bg-green-600"
        />
      </div>
      <div className="flex justify-between mt-2 text-sm text-muted">
        <span>{player1Percentage.toFixed(1)}%</span>
        <span>Total Points: {totalPoints}</span>
        <span>{(100 - player1Percentage).toFixed(1)}%</span>
      </div>
    </div>
  )
}
