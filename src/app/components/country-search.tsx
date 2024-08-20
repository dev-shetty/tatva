"use client"

import Search from "@/components/search"
import { useRouter } from "next/navigation"

export default function CountrySearch() {
  const router = useRouter()

  // When the user selects a country, navigate to the country page
  function searchCountry(country: string) {
    router.push(`/country/${country}`)
  }

  return <Search handleSearch={searchCountry} />
}
