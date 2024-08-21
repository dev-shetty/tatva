import { Button } from "@/components/ui/button"
import { siteConfig } from "@/config/site"
import Image from "next/image"
import Link from "next/link"

export default function Navbar() {
  return (
    <nav className="py-4">
      <div className="container flex justify-between items-center">
        <div className="text-2xl font-bold">
          <Link href="/" className="flex gap-2 items-center">
            <Image
              src="/logo.svg"
              alt={`${siteConfig.title} logo`}
              width={32}
              height={32}
            />
            <span>{siteConfig.title}</span>
          </Link>
        </div>
        <ul className="flex gap-4">
          <Button asChild>
            <Link href="/guess-the-flag">Play a game</Link>
          </Button>
        </ul>
      </div>
    </nav>
  )
}
