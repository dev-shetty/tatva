"use client"

import Search from "@/components/search"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function CountrySearch() {
  const router = useRouter()
  const [searchCompletion, setSearchCompletion] = useState("")

  // When the user selects a country, navigate to the country page
  function searchCountry(country: string) {
    router.push(`/country/${country}`)
  }

  return (
    <Search
      handleSearch={searchCountry}
      searchCompletion={searchCompletion}
      setSearchCompletion={setSearchCompletion}
      showFlag={false}
    />
  )
}
