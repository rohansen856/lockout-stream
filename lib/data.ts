import { Question } from "@/types/contest"

export const mockPlayers = {
  player1: {
    id: "1",
    name: "Alex Chen",
    imageUrl:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500",
    rating: 2100,
    rank: "Master",
    solvedCount: 523,
    country: "Canada",
    profile: "kshitij_54",
  },
  player2: {
    id: "2",
    name: "Sarah Kim",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500",
    rating: 2200,
    rank: "Grandmaster",
    solvedCount: 612,
    country: "South Korea",
    profile: "maddybhanu2511",
  },
}

export const mockQuestions: Question[] = Array.from({ length: 7 }, (_, i) => ({
  id: `q${i + 1}`,
  title: `Binary Tree Maximum Path Sum ${i + 1}`,
  description: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo quibusdam perspiciatis eaque, illum magnam, obcaecati nihil voluptate labore suscipit, odio laudantium dolore. Fuga in eum molestiae libero voluptatem nesciunt quae amet ab repellendus voluptates placeat minima perspiciatis assumenda blanditiis eaque enim a, ducimus iure dolor cupiditate maiores expedita architecto nulla unde. Illo voluptas voluptatum tenetur nostrum sint, ex dolorum! Doloremque cum adipisci sit nostrum quod, quasi reprehenderit earum nulla, aliquam tempore quidem iusto rerum est repellendus ducimus optio similique molestias odit beatae harum molestiae. Numquam odit expedita laboriosam, corporis nostrum ut. Ut asperiores deleniti reprehenderit nihil placeat sint tempora. Soluta.`,
  difficulty: i < 2 ? "Easy" : i < 5 ? "Medium" : "Hard",
  points: (i + 1) * 100,
  status: {
    player1: i < 2 ? "solved" : i === 2 ? "attempting" : "not_started",
    player2: i < 3 ? "solved" : i === 3 ? "attempting" : "not_started",
  },
  timeCompleted:
    i < 2
      ? {
          player1: new Date(Date.now() - 1000 * 60 * (i + 1)).toISOString(),
          player2: new Date(Date.now() - 1000 * 60 * (i + 2)).toISOString(),
        }
      : undefined,
}))

export const mockScore = {
  player1: 200,
  player2: 300,
  maxScore: 2800,
}
