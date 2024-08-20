import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Navbar() {
  return (
    <nav className="py-4">
      <div className="container flex justify-between items-center">
        <p className="text-2xl font-bold">
          <Link href="/">Tatva</Link>
        </p>
        <ul className="flex gap-4">
          <Button asChild>
            <Link href="/guess-the-flag">Play a game</Link>
          </Button>
        </ul>
      </div>
    </nav>
  )
}
