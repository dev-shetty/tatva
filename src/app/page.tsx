import CountrySearch from "@/app/components/country-search"
import SuggestCountries from "@/app/components/suggest-countries"
import { H1, H2 } from "@/components/ui/typography"

export default function Home() {
  return (
    <main className="flex p-24 flex-col items-center justify-center container">
      <H1 className="mb-8 lg:text-6xl">Explore the World</H1>
      <div className="flex rounded-lg shadow flex-col bg-accent py-12 px-24 gap-8 w-3/4">
        <div className="grid gap-1">
          <H2 className="text-xl">Choose a Country</H2>
          <CountrySearch />
        </div>
        <div className="grid gap-1">
          <H2 className="text-xl">We suggest you:</H2>
          <SuggestCountries />
        </div>
      </div>
    </main>
  )
}
