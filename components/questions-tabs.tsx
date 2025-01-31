"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { CheckCircle2, Circle, Timer, Users, Award } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

export interface Question {
  id: string
  title: string
  description: string
  difficulty: "Easy" | "Medium" | "Hard"
  points: number
  status: {
    player1: "solved" | "attempting" | "not_started"
    player2: "solved" | "attempting" | "not_started"
  }
  timeCompleted?: {
    player1?: string
    player2?: string
  }
}

interface PlayerStatusProps {
  status: Question["status"]["player1"]
  timeCompleted?: string
  playerNumber: number
}

const PlayerStatus: React.FC<PlayerStatusProps> = ({
  status,
  timeCompleted,
  playerNumber,
}) => {
  const getStatusIcon = (status: Question["status"]["player1"]) => {
    switch (status) {
      case "solved":
        return <CheckCircle2 className="w-5 h-5 text-green-500" />
      case "attempting":
        return <Timer className="w-5 h-5 text-yellow-500 animate-pulse" />
      case "not_started":
        return <Circle className="w-5 h-5 text-gray-400" />
    }
  }

  return (
    <div className="flex items-center space-x-2 p-3 rounded-lg bg-slate-800 border border-white/20">
      <Users className="w-4 h-4 text-blue-400" />
      <span className="text-sm font-medium text-white">
        Player {playerNumber}
      </span>
      <div className="flex-1" />
      <div className="flex items-center gap-2">
        {getStatusIcon(status)}
        <span className="text-sm capitalize text-gray-300">
          {status.replace("_", " ")}
        </span>
      </div>
      {timeCompleted && (
        <div className="text-xs text-gray-400 flex items-center gap-1">
          <Timer className="w-3 h-3" />
          {formatDistanceToNow(new Date(timeCompleted), { addSuffix: true })}
        </div>
      )}
    </div>
  )
}

interface QuestionCardProps {
  question: Question
  questionNumber: number
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  questionNumber,
}) => {
  const getDifficultyColor = (difficulty: Question["difficulty"]) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      case "Medium":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
      case "Hard":
        return "bg-red-500/10 text-red-500 border-red-500/20"
    }
  }

  return (
    <Card className="bg-slate-900/50 border-slate-700 p-4 hover:bg-slate-800/50 transition-colors">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <span className="text-blue-400">#{questionNumber}</span>
            {question.title}
          </h3>
          <div className="flex items-center gap-2 mt-2">
            <Badge
              className={`${getDifficultyColor(
                question.difficulty
              )} border font-medium`}
            >
              {question.difficulty}
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Award className="w-3 h-3" />
              {question.points} points
            </Badge>
          </div>
        </div>
      </div>

      <p className="mb-4 text-white border border-white/20 bg-gray-800 rounded-lg p-2">
        {question.description}
      </p>

      <div className="gap-2 flex justify-between flex-col md:flex-row">
        <PlayerStatus
          status={question.status.player1}
          timeCompleted={question.timeCompleted?.player1}
          playerNumber={1}
        />
        <PlayerStatus
          status={question.status.player2}
          timeCompleted={question.timeCompleted?.player2}
          playerNumber={2}
        />
      </div>
    </Card>
  )
}

interface QuestionsTabsProps {
  questions: Question[]
}

export function QuestionsTabs({ questions }: QuestionsTabsProps) {
  return (
    <Tabs defaultValue="1" className="w-full">
      <TabsList
        className={`flex justify-around mb-4 bg-gray-800/50 border text-white border-white/20`}
      >
        {questions.map((_, index) => (
          <TabsTrigger
            key={index + 1}
            value={String(index + 1)}
            className="text-sm w-full"
          >
            Question {index + 1}
          </TabsTrigger>
        ))}
      </TabsList>

      {questions.map((question, index) => (
        <TabsContent key={index + 1} value={String(index + 1)}>
          <QuestionCard question={question} questionNumber={index + 1} />
        </TabsContent>
      ))}
    </Tabs>
  )
}
