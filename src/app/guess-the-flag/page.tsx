"use client"

import Loading from "@/app/guess-the-flag/loading"
import Search from "@/components/search"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { H1 } from "@/components/ui/typography"
import { Country } from "@/lib/types"
import { getRandomNumber } from "@/lib/utils"
import { AlertCircle, Check, CheckCircle, LightbulbIcon } from "lucide-react"
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
      <div className="flex items-center justify-end gap-2 w-full">
        <p className="px-4 font-bold flex items-center gap-2 py-2 text-xl rounded-md">
          Score: <span className="text-3xl">{score}</span>
        </p>
      </div>
      <div className="flex mt-2 mb-8 items-center gap-4">
        <H1>Guess the Flag</H1>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              className="rounded-full"
              size="icon"
              title="Take a hint"
              onClick={() => {
                setScore((prev) => prev - 20)
                toast("-20 points for taking hint", {
                  cancel: true,
                  icon: <AlertCircle />,
                  duration: 2000,
                  style: { backgroundColor: "orange", color: "black" },
                  position: "top-center",
                })
              }}
            >
              <LightbulbIcon fill="yellow" size="32" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-center">The country is</DialogTitle>
              <DialogDescription className="text-5xl text-primary p-8 text-center">
                {country.name.common}.
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
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
