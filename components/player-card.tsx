"use client"

import { Card } from "@/components/ui/card"
import { Player } from "@/types/contest"
import { Trophy, MapPin, Building2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface PlayerCardProps {
  player: Player
  side: "left" | "right"
  isWinning: boolean
}

export function PlayerCard({ player, side, isWinning }: PlayerCardProps) {
  return (
    <Card
      className={`w-64 h-[400px] bg-transparent backdrop-blur-md border-2 text-white border-none relative overflow-hidden`}
    >
      <div className="p-4 h-full flex flex-col">
        <div className="relative w-full h-48 mb-4">
          <Image
            src={player.imageUrl}
            alt={player.name}
            fill
            className="object-cover rounded-lg border-2"
          />
          {isWinning && (
            <div className="absolute -top-2 -right-2 bg-green-500 p-2 rounded-full">
              <Trophy className="w-4 h-4" />
            </div>
          )}
        </div>

        <h3 className="text-xl font-bold mb-2">{player.name}</h3>

        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Trophy className="w-4 h-4" />
            </div>
            <div>
              <p className="text-muted-foreground">Rating</p>
              <p className="font-semibold">{player.rating}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <p className="text-muted-foreground">Country</p>
              <p className="font-semibold">{player.country}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <p className="text-muted-foreground">Organization</p>
              <Link
                href={`https://atcoder.jp/users/${player.profile}`}
                target="_blank"
                className="font-semibold text-blue-500"
              >
                {player.profile}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
