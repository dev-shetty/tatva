import GuessTheFlagGame from "@/app/guess-the-flag/components/game"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Guess the Flag",
  description: "Play a game, guess the flag of a country and score points",
}

export default function GuessTheFlagPage() {
  return (
    <div>
      <GuessTheFlagGame />
    </div>
  )
}
