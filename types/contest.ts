export interface Player {
  id: string
  name: string
  imageUrl: string
  rating: number
  rank: string
  solvedCount: number
  country: string
  profile: string
}

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

export interface ContestScore {
  player1: number
  player2: number
  maxScore: number
}
