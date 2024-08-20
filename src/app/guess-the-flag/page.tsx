import { Country } from "@/lib/types"

export default async function GuessTheFlag() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_COUNTRY_API_URL}/all?fields=name,flags`
  )
  const data: Pick<Country, "name" | "flags">[] = await response.json()

  if (!data) {
    return <div>Couldn&apos;t load countries... Please try again</div>
  }

  return <main></main>
}
