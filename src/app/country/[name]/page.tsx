import { Icons } from "@/components/icons"
import Map from "@/components/map"
import { H1, H2 } from "@/components/ui/typography"
import { Country } from "@/lib/types"
import { cn } from "@/lib/utils"
import { Info, UserRound } from "lucide-react"
import Image from "next/image"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export default async function CountryPage({
  params,
}: {
  params: { name: string }
}) {
  const { name: _name } = params
  // Parsing the name from the URL, as it is encoded
  const name = decodeURIComponent(_name)

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_COUNTRY_API_URL}/name/${name}`
  )

  // TODO: Make a 404 Page
  if (!response.ok) {
    return <div>Country not found</div>
  }

  const data: Country[] = await response.json()

  // United States was getting matched with United States Outlying Islands as it was first element,
  // so filtering by common name
  const country = data.find(
    (country) => country.name.common.toLowerCase() === name.toLowerCase()
  )

  if (!country) {
    return <div>Country not found</div>
  }

  return (
    <main className="py-16">
      <section className="flex flex-col justify-center items-center">
        <div className="flex flex-col justify-center items-center gap-6">
          <div className="flex flex-col justify-center items-center gap-4">
            <Image
              src={country.flags.svg}
              width={60}
              height={40}
              alt={country.flags.alt}
            />
            {!!country.coatOfArms.svg && (
              <Image
                src={country.coatOfArms.svg}
                width={250}
                height={250}
                alt={country.flags.alt}
                // className="rounded-full object-cover aspect-square shadow-lg"
              />
            )}
            <div className="flex items-center gap-8">
              <H1 className="lg:text-6xl font-bold text-primary">
                {country.name.official}
              </H1>
            </div>
          </div>
          <div className="flex flex-col gap-2 justify-center items-center">
            <div className="flex gap-2 font-bold">
              {Object.entries(country.name.nativeName).map(
                ([key, value], index) => (
                  <H2 className="flex gap-2" key={key}>
                    <span>{value.common}</span>
                    <span
                      className={cn("", {
                        hidden:
                          index ===
                          Object.keys(country.name.nativeName).length - 1,
                      })}
                    >
                      |
                    </span>
                  </H2>
                )
              )}
            </div>
            <div className="flex gap-1 items-center">
              <Icons.capitalCircle />
              <H2 className="text-2xl">{country.capital}</H2>
            </div>
          </div>
        </div>
      </section>
      <section className="w-3/4 rounded-lg p-12 shadow-lg mx-auto bg-accent mt-8">
        <section className="grid gap-4 md:grid-cols-2">
          <div className="flex flex-col md:border-r">
            <div>
              <div className="flex gap-2">
                <span className="text-muted-foreground">Continent:</span>
                <span>{country.continents.join(", ")}</span>
              </div>
              <div className="flex gap-2">
                <span className="text-muted-foreground">Subregion:</span>
                <span>{country.subregion}</span>
              </div>
              <div className="flex gap-2">
                <span className="text-muted-foreground">Timezones: </span>
                <span>{country.timezones.join(", ")}</span>
              </div>
              <div className="flex gap-2">
                <span className="text-muted-foreground">Borders: </span>
                <span>{country.borders?.join(", ")}</span>
              </div>
              <div className="flex gap-2">
                <span className="text-muted-foreground">Currencies:</span>
                <div>
                  {Object.entries(country.currencies).map(([key, value]) => (
                    <div key={key} className="grid gap-1">
                      <span>
                        {value.name} ({value.symbol})
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex gap-2">
                <span className="text-muted-foreground">Languages</span>
                <span>{Object.values(country.languages).join(", ")}</span>
              </div>
              <div className="flex gap-2">
                <span className="text-muted-foreground">Population</span>
                <span>{country.population.toLocaleString()}</span>
              </div>
              <div className="flex gap-2">
                <span className="text-muted-foreground">Area:</span>
                <span>{country.area.toLocaleString()} km²</span>
              </div>
              <div className="flex gap-2">
                <span className="text-muted-foreground">Car Registration:</span>
                <span>
                  {country.car.signs.map((sign) => (
                    <span key={sign}>{sign}</span>
                  ))}
                </span>
              </div>
              <div className="flex gap-2">
                <span className="text-muted-foreground">Car Side:</span>
                <span>{country.car.side}</span>
              </div>
              <div className="flex gap-2">
                <span className="text-muted-foreground">Top-Level Domain:</span>
                <span>{country.tld.join(", ")}</span>
              </div>
              <div className="flex gap-2">
                <span className="text-muted-foreground">Dialing Code:</span>
                <p>
                  {country.idd.root}
                  {country.idd.suffixes.slice(0, 10).join(", ")}
                  <span className="underline">
                    {country.idd.suffixes.length > 10 && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span>...</span>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-96">
                              {country.idd.suffixes.slice(10, -1).join(", ")}
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </span>
                </p>
              </div>
              <div className="flex gap-2">
                <span className="text-muted-foreground">UN Member</span>
                <span>{country.unMember ? "Yes" : "No"}</span>
              </div>
              <div className="flex gap-2">
                <span className="text-muted-foreground">Landlocked</span>
                <span>{country.landlocked ? "Yes" : "No"}</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 px-4">
            <div className="relative w-full aspect-[4/3]">
              <Image src={country.flags.svg} fill alt={country.flags.alt} />
            </div>
            <div className="flex flex-col justify-center items-center rounded-md px-4">
              <p className="text-2xl font-bold text-primary/60">Area Covered</p>
              <p className="text-3xl font-bold flex flex-wrap justify-center gap-2">
                {country.area.toLocaleString()} <span>km²</span>
              </p>
            </div>
            <div className="grid gap-2 col-span-2">
              <div className="grid place-items-center w-full border">
                <Map url={country.flags.svg} name={country.name.common} />
              </div>
              <div className="grid grid-cols-2 place-items-center w-full">
                <div className="flex gap-1 w-full justify-center border-r">
                  <p className="text-muted-foreground">Latitude:</p>
                  <p>{country.latlng[0]}</p>
                </div>
                <div className="flex gap-1 w-full justify-center">
                  <p className="text-muted-foreground">Longitude:</p>
                  <p>{country.latlng[1]}</p>
                </div>
              </div>
            </div>
            <div className="relative grid gap-2 col-span-2 rounded-md px-4">
              <div className="flex flex-col justify-center items-center">
                <p className="text-2xl font-bold text-primary/60">Population</p>
                <p className="text-3xl font-bold flex flex-wrap justify-center gap-2">
                  {country.population.toLocaleString()}
                </p>
                <div className="absolute top-2 right-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="flex gap-1 items-center">
                          <UserRound /> = 20,000,000
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
              <div className="flex flex-wrap w-full justify-center">
                {Array.from({ length: country.population / 20_000_000 }).map(
                  (_, index) => (
                    <UserRound fill="#ddd" className="-ml-2" key={index} />
                  )
                )}
              </div>
            </div>
          </div>
        </section>
      </section>
    </main>
  )
}
