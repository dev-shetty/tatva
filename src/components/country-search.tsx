"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import useDebounce from "@/hooks/use-debounce"
import { Country } from "@/lib/types"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import {
  FormEvent,
  KeyboardEvent,
  useCallback,
  useEffect,
  useState,
} from "react"

type SearchResponse = Pick<Country, "name">[]

export default function CountrySearch() {
  const [search, setSearch] = useState("")
  const [searchSuggestion, setSearchSuggestion] =
    useState<SearchResponse | null>(null)

  const [selectedSearch, setSelectedSearch] = useState(-1)
  const [searchCompletion, setSearchCompletion] = useState("")
  const router = useRouter()

  // Debouncing the search query, so the request is only sent after 300ms of inactivity
  // Avoiding flooding the API every call.
  // Could have throttled as well, but this feels more natural
  const debouncedValue = useDebounce(search, 200)

  // Get search completions based on the search query
  const getSearchCompletions = useCallback(async () => {
    if (search === "") {
      setSearchSuggestion(null)
      return
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_COUNTRY_API_URL}/name/${debouncedValue}?fields=name`
    )
    if (response.status === 404) {
      setSearchSuggestion([])
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

    setSearchSuggestion(filteredSearchResults)
  }, [debouncedValue, search])

  useEffect(() => {
    if (debouncedValue) {
      getSearchCompletions()
    }
  }, [debouncedValue, getSearchCompletions])

  // When the user selects a country, navigate to the country page
  async function searchCountry(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!searchSuggestion) return

    // Auto select the first result if no result is selected
    const country =
      selectedSearch === -1
        ? searchSuggestion[0].name.common
        : searchSuggestion[selectedSearch].name.common

    setSearchCompletion(country)

    router.push(`/country/${country}`)
    setSearch("")
    setSearchSuggestion(null)
  }

  // Handle keyboard navigation for search results
  function handleSearchSelection(e: KeyboardEvent<HTMLInputElement>) {
    if (!searchSuggestion) {
      setSelectedSearch(-1)
    }

    if (
      e.key === "ArrowDown" &&
      searchSuggestion &&
      searchSuggestion?.length > 0
    ) {
      setSelectedSearch((prev) => (prev + 1) % searchSuggestion.length)
    }
    if (e.key === "ArrowUp" && searchSuggestion) {
      setSelectedSearch((prev) =>
        prev > 0 ? prev - 1 : searchSuggestion.length - 1
      )
    }
  }

  useEffect(() => {
    if (searchSuggestion && selectedSearch !== -1) {
      setSearchCompletion(searchSuggestion[selectedSearch].name.common)
    } else {
      setSearchCompletion(search)
    }
  }, [selectedSearch, search, searchSuggestion])

  return (
    <form onSubmit={searchCountry} className="flex gap-2">
      <div className="w-full">
        <Input
          placeholder="Where you want to visit?"
          value={searchCompletion}
          onChange={(e) => {
            if (e.target.value === "") {
              setSearchSuggestion(null)
            }
            setSearch(e.target.value)
            setSearchCompletion(e.target.value)
          }}
          onKeyDown={handleSearchSelection}
        />
        <div className="flex flex-col">
          {searchSuggestion?.length === 0 ? (
            <p>No Countries found</p>
          ) : (
            searchSuggestion?.map((search, i) => {
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
