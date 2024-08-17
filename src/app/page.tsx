import CountrySearch from "@/components/country-search"
import { H1 } from "@/components/ui/typography"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center container">
      <div className="flex flex-col gap-4">
        <H1>Search a Country</H1>
        <CountrySearch />
      </div>
    </main>
  )
}
