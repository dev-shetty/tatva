import CountrySearch from "@/app/components/country-search"
import SuggestCountries from "@/app/components/suggest-countries"
import { H1, H2 } from "@/components/ui/typography"

export default function Home() {
  return (
    <main className="flex py-12 md:p-24 flex-col items-center justify-center container">
      <H1 className="mb-8 lg:text-6xl text-center">Explore the World!</H1>
      <div className="h-full bg-sky-50 bg-clip-padding backdrop-filter bg-opacity-50 border border-gray-100 flex rounded-lg shadow-md flex-col py-12 px-8 md:px-16 lg:px-24 gap-8 md:w-3/4">
        <div className="grid gap-1">
          <H2 className="text-xl">Choose a Country</H2>
          <CountrySearch />
        </div>
        <div className="grid gap-2">
          <H2 className="text-xl">Most visited countries</H2>
          <SuggestCountries />
        </div>
      </div>
    </main>
  )
}
