"use client"

import Loading from "@/app/guess-the-flag/loading"
import Search from "@/components/search"
import { H1 } from "@/components/ui/typography"
import { Country } from "@/lib/types"
import { getRandomNumber } from "@/lib/utils"
import { AlertCircle, Check, CheckCircle } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"
import { toast } from "sonner"

type APIResponse = Pick<Country, "name" | "flags">

export default function GuessTheFlagPage() {
  const [country, setCountry] = useState<APIResponse | null>(null)
  const SCORE_PER_QUESTION = 20

  const [search, setSearch] = useState("")
  const [isCorrect, setIsCorrect] = useState(false)
  const [score, setScore] = useState(0)
  const [error, setError] = useState("")

  function handleSearch() {
    if (!country) return

    setIsCorrect(false)
    setError("")

    console.table({
      country: country.name.common.toLowerCase(),
      search: search.toLowerCase(),
    })
    if (country.name.common.toLowerCase() === search.toLowerCase()) {
      setIsCorrect(true)
      setScore((prev) => prev + SCORE_PER_QUESTION)
      getCountries()
      toast("Correct answer", {
        cancel: true,
        icon: <CheckCircle />,
        duration: 2000,
        style: { backgroundColor: "green", color: "white" },
        position: "top-center",
      })
    } else {
      setIsCorrect(false)
      toast("Incorrect answer", {
        cancel: true,
        icon: <AlertCircle />,
        duration: 2000,
        style: { backgroundColor: "red", color: "white" },
        position: "top-center",
      })
    }

    setSearch("")
  }

  async function getCountries() {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_COUNTRY_API_URL}/all?fields=name,flags`
    )
    const data: APIResponse[] = await response.json()

    const randomCountry = data[getRandomNumber(0, data.length)]
    setCountry(randomCountry)

    console.log(randomCountry.name.common)
  }

  useEffect(() => {
    getCountries()
  }, [])

  if (!country) {
    return Loading()
  }

  return (
    <main className="px-4 py-12 md:p-12 container flex flex-col items-center justify-center mx-auto">
      <div className="flex items-center justify-between w-full">
        <p className="ml-auto px-8 font-bold  flex items-center gap-2 py-2 bg-primary text-white rounded-md">
          Score: <span className="text-2xl">{score}</span>
        </p>
      </div>
      <H1 className="mt-2 mb-8">Guess the Flag</H1>
      <div className="grid gap-2">
        <div className="relative w-[16rem] h-[12rem] md:w-[32rem] md:h-[24rem]">
          <Image fill src={country.flags.svg} alt="Flag" />
        </div>

        <Search
          handleSearch={handleSearch}
          searchCompletion={search}
          setSearchCompletion={setSearch}
          showFlag={false}
          isGame={true}
        />
      </div>
    </main>
  )
}
