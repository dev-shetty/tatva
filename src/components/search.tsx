"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import useDebounce from "@/hooks/use-debounce"
import { Country } from "@/lib/types"
import { cn } from "@/lib/utils"
import { Plane } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import {
  FormEvent,
  KeyboardEvent,
  useCallback,
  useEffect,
  useState,
} from "react"

interface SearchProps {
  handleSearch: (country: string) => void
}

type SearchResponse = Pick<Country, "name" | "flags">[]

export default function Search({ handleSearch }: SearchProps) {
  const [search, setSearch] = useState("")
  const [searchSuggestion, setSearchSuggestion] =
    useState<SearchResponse | null>(null)

  const [selectedSearch, setSelectedSearch] = useState(-1)
  const [searchCompletion, setSearchCompletion] = useState("")

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
      `${process.env.NEXT_PUBLIC_COUNTRY_API_URL}/name/${debouncedValue}?fields=name,flags`
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

  console.log(searchSuggestion)

  useEffect(() => {
    if (debouncedValue) {
      getSearchCompletions()
    }
  }, [debouncedValue, getSearchCompletions])

  function handleSubmit(
    e: FormEvent<HTMLFormElement | HTMLDivElement>,
    country?: string
  ) {
    e.preventDefault()
    if (!searchSuggestion) return

    // Auto select the first result if no result is selected
    if (!country)
      country =
        selectedSearch === -1
          ? searchSuggestion[0].name.common
          : searchSuggestion[selectedSearch].name.common

    setSearchCompletion(country)

    handleSearch(country)
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
  }, [selectedSearch])

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <div className="w-full relative">
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
          className="outline-1 outline-primary"
          onKeyDown={handleSearchSelection}
        />
        <div className="flex flex-col absolute bg-background w-full shadow-lg rounded-md">
          {searchSuggestion?.length === 0 ? (
            <p className="flex relative text-primary/70 gap-2 items-center w-full px-3 py-2 rounded-md">
              No Countries found
            </p>
          ) : (
            searchSuggestion?.map((search, i) => {
              return (
                <div
                  onClick={(e) => handleSubmit(e, search.name?.common)}
                  key={search.name?.common}
                  className={cn(
                    "flex relative gap-2 items-center hover:bg-gray-100 cursor-pointer px-3 py-2 rounded-md",
                    {
                      "bg-gray-200": i === selectedSearch,
                    }
                  )}
                >
                  <Image
                    src={search.flags.svg}
                    width={24}
                    height={24}
                    alt={search.name.common}
                    className="rounded-full object-cover shadow outline aspect-square"
                  />
                  <p>{search.name?.common}</p>
                </div>
              )
            })
          )}
        </div>
      </div>
      <Button type="submit">
        <Plane fill="#fff" stroke="0" />
      </Button>
    </form>
  )
}
