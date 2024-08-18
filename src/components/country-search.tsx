"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import useDebounce from "@/hooks/use-debounce"
import { Country } from "@/lib/types"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { FormEvent, KeyboardEvent, useEffect, useState } from "react"

type SearchResponse = Pick<Country, "name">[]

export default function CountrySearch() {
  const [search, setSearch] = useState("")
  const [searchCompletion, setSearchCompletion] =
    useState<SearchResponse | null>(null)
  const [selectedSearch, setSelectedSearch] = useState(0)
  const router = useRouter()

  // Debouncing the search query, so the request is only sent after 300ms of inactivity
  // Avoiding flooding the API every call.
  // Could have throttled as well, but this feels more natural
  const debouncedValue = useDebounce(search, 50)

  useEffect(() => {
    if (debouncedValue) {
      getSearchCompletions()
    }
  }, [debouncedValue])

  // Get search completions based on the search query
  async function getSearchCompletions() {
    if (search === "") {
      setSearchCompletion(null)
      return
    }

    if (searchCompletion && selectedSearch > searchCompletion.length - 1) {
      setSelectedSearch(1)
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_COUNTRY_API_URL}/name/${debouncedValue}?fields=name`
    )
    if (response.status === 404) {
      setSearchCompletion([])
      return
    }
    const searchCompletionResults: SearchResponse = await response.json()

    /*
     * The API filters based on the official name, which is quite confusing
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

  // When the user selects a country, navigate to the country page
  async function searchCountry(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!searchCompletion) return

    const country = searchCompletion[selectedSearch].name.common

    router.push(`/country/${country}`)
    setSearch("")
    setSearchCompletion(null)
  }

  // Handle keyboard navigation for search results
  function handleSearchSelection(e: KeyboardEvent<HTMLInputElement>) {
    if (!searchCompletion) return

    if (e.key === "ArrowDown" && searchCompletion) {
      setSelectedSearch((prev) => (prev + 1) % searchCompletion.length)
    }
    if (e.key === "ArrowUp" && searchCompletion) {
      setSelectedSearch((prev) =>
        prev > 0 ? prev - 1 : searchCompletion.length - 1
      )
    }
  }

  return (
    <form onSubmit={searchCountry} className="flex gap-2">
      <div className="w-full">
        <Input
          placeholder="Where you want to visit?"
          defaultValue={search}
          onChange={(e) => {
            if (e.target.value === "") {
              setSearchCompletion(null)
            }
            setSearch(e.target.value)
          }}
          onKeyDown={handleSearchSelection}
        />
        <div className="flex flex-col">
          {searchCompletion?.length === 0 ? (
            <p>No Countries found</p>
          ) : (
            searchCompletion?.map((search, i) => {
              return (
                <p
                  key={search.name?.common}
                  className={cn("", {
                    "bg-gray-200": i === selectedSearch,
                  })}
                >
                  {search.name?.common}
                </p>
              )
            })
          )}
        </div>
      </div>
      <Button type="submit">-&gt;</Button>
    </form>
  )
}
