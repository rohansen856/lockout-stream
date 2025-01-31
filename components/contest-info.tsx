import React, { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { AlertCircle, ChevronRight } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { getContestProblems } from "@/lib/contest"
import Link from "next/link"

interface ContestProblemPair {
  contest_id: string
  problem_id: string
}

type Problem = {
  id: string
  contest_id: string
  title: string
}

interface ContestProblemsProps {
  contestId: string
}

export const ContestProblems = ({ contestId }: ContestProblemsProps) => {
  const [problems, setProblems] = useState<Problem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        setLoading(true)
        setError(null)
        const result = await getContestProblems(contestId)
        setProblems(result)
      } catch (err) {
        setError("Failed to fetch contest problems. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchProblems()
  }, [contestId])

  if (loading) {
    return (
      <Card className="w-full container bg-gray-800/50 border border-white/20 text-gray-100">
        <CardHeader>
          <CardTitle className="text-xl text-gray-100">
            Contest Problems
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center space-x-4">
              <Skeleton className="h-12 w-full bg-gray-800" />
            </div>
          ))}
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Alert
        variant="destructive"
        className="w-full max-w-2xl bg-red-900 border-red-800"
      >
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  return (
    <Card className="w-full bg-gray-800/50 border border-white/20 text-gray-100">
      <CardHeader>
        <CardTitle className="text-xl text-gray-100">
          Contest Problems ({contestId})
        </CardTitle>
      </CardHeader>
      <CardContent>
        {problems.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            No problems found for this contest.
          </div>
        ) : (
          <div className="space-y-3">
            {problems.map((problem, index) => (
              <Link
                href={`https://atcoder.jp/contests/${contestId}/tasks/${problem.id}`}
                target="_blank"
                key={problem.id}
                className="group flex items-center justify-between p-4 rounded-lg bg-gray-800 hover:bg-gray-700 border border-white/20 transition-colors duration-200"
              >
                <div className="flex items-center space-x-4">
                  <div className="h-8 w-8 flex items-center justify-center rounded-full bg-blue-600 text-white font-medium">
                    {String.fromCharCode(65 + index)}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-100">
                      {problem.title}
                    </h3>
                    <p className="text-sm text-gray-400">
                      Problem ID: {problem.id}
                    </p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-500 group-hover:text-gray-300 transition-colors duration-200" />
              </Link>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
