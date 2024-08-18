"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import useDebounce from "@/hooks/use-debounce"
import { Country, CountryName } from "@/lib/types"
import { useEffect, useState } from "react"

export default function CountrySearch() {
  const [country, setCountry] = useState("")
  const [searchCompletion, setSearchCompletion] = useState<Country[] | null>(
    null
  )

  // Debouncing the search query, so the request is only sent after 300ms of inactivity
  // Avoiding flooding the API every call.
  // Could have throttled as well, but this feels more natural
  const debouncedValue = useDebounce(country, 300)

  useEffect(() => {
    if (debouncedValue) {
      getSearchCompletions()
    }
  }, [debouncedValue])

  async function getSearchCompletions() {
    if (country === "") {
      setSearchCompletion(null)
      return
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_COUNTRY_API_URL}/name/${debouncedValue}?fields=name`
    )
    if (response.status === 404) {
      setSearchCompletion([])
      return
    }
    const searchCompletionResults: Country[] = await response.json()

    /*
     * The API filters based on the official nam, which is quite confusing
     * eg. When you search for "In", you will get Norway as a result
     * because the official name of Norway is "Kingdom of Norway",
     * where the "in" matches, also notice it is in the middle of the word, not what user would expect
     * So, we need to filter the results based on the common name, and only if the country starts with the search query
     */
    const filteredSearchResults = searchCompletionResults.filter((search) =>
      search.name?.common.toLowerCase().startsWith(debouncedValue.toLowerCase())
    )

    setSearchCompletion(filteredSearchResults)
  }

  async function searchCountry() {}
  return (
    <form onSubmit={searchCountry} className="flex gap-2">
      <div className="w-full">
        <Input
          placeholder="Where you want to visit?"
          defaultValue={country}
          onChange={(e) => {
            if (e.target.value === "") {
              setSearchCompletion(null)
            }
            setCountry(e.target.value)
          }}
        />
        <div className="flex flex-col">
          {searchCompletion?.length === 0 ? (
            <p>No Countries found</p>
          ) : (
            searchCompletion?.map((search) => {
              return <p key={search.name?.common}>{search.name?.common}</p>
            })
          )}
        </div>
      </div>
      <Button type="submit">-&gt;</Button>
    </form>
  )
}
