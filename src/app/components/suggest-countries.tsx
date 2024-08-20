import { suggestedCountries } from "@/lib/constants"
import { Country } from "@/lib/types"
import Link from "next/link"

type APIResponse = Pick<Country, "name" | "flag">[]

export default async function SuggestCountries() {
  const response = await fetch(
    `${
      process.env.NEXT_PUBLIC_COUNTRY_API_URL
    }/alpha?codes=${suggestedCountries.join(",")}&fields=name,flag`
  )

  const data: APIResponse = await response.json()
  console.log(data)

  if (!data) {
    return <p>Failed to load data</p>
  }

  return (
    <section className="grid grid-cols-2 lg:grid-cols-3 gap-2">
      {data.map((country) => (
        <Link
          key={country.name.common}
          className="flex items-center w-full hover:bg-gray-100 cursor-pointer transition-colors justify-between p-2 bg-white rounded-md shadow-md"
          href={`/country/${country.name.common}`}
        >
          <div className="flex items-center space-x-4">
            <p>{country.flag}</p>
            <p className="text-sm">{country.name.common}</p>
          </div>
        </Link>
      ))}
    </section>
  )
}
