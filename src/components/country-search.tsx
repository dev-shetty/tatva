"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export default function CountrySearch() {
  const [country, setCountry] = useState("")
  const [searchCompletion, setSearchCompletion] = useState<string[]>([])

  async function getSearchCompletions() {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_COUNTRY_API_URL}/name/${country}?fields=name`
    )
    const searchCompletionResults = await response.json()
    console.log(searchCompletionResults)
  }
  async function searchCountry() {}
  return (
    <form onSubmit={searchCountry} className="flex gap-2">
      <Input
        placeholder="India"
        defaultValue={country}
        onChange={(e) => {
          setCountry(e.target.value)
          getSearchCompletions()
        }}
      />
      <Button type="submit">-&gt;</Button>
    </form>
  )
}
