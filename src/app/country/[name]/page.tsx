import { Icons } from "@/components/icons"
import Map from "@/components/map"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { H1, H2 } from "@/components/ui/typography"
import { Country } from "@/lib/types"
import Image from "next/image"
import { Suspense } from "react"

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
    <main>
      <header className="w-full bg-fuchsia-100 py-8 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto flex flex-col items-center gap-4 md:flex-row md:justify-between">
          <div className="flex items-center gap-6">
            <Image
              src={country.flags.svg}
              width={160}
              height={120}
              alt={country.flags.alt}
            />
            <div className="flex flex-col">
              <div className="flex items-center gap-2 text-2xl">
                <H1 className="lg:text-4xl font-bold text-primary">
                  {country.name.common}
                </H1>
                <div className="flex gap-2 font-bold">
                  {Object.entries(country.name.nativeName).map(
                    ([key, value]) =>
                      key !== "eng" && (
                        <p className="flex gap-2">
                          <span>|</span>
                          <span>{value.common}</span>
                        </p>
                      )
                  )}
                </div>
              </div>
              <div className="flex gap-1 items-center">
                <Icons.capitalCircle />
                <H2 className="text-2xl">{country.capital}</H2>
              </div>
            </div>
          </div>
          <Image
            src={country.coatOfArms.svg}
            alt={`Coat of Arms of ${country.name.common}`}
            width={75}
            height={75}
          />
        </div>
      </header>
      <section className="container mx-auto my-8">
        <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="lg:col-span-2 flex flex-col">
            <CardHeader>
              <CardTitle>{country.name.official}</CardTitle>
            </CardHeader>
            <CardContent>
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
                    <span>{sign}</span>
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
                  <span
                    className="underline"
                    title={country.idd.suffixes.slice(10, -1).join(", ")}
                  >
                    {country.idd.suffixes.length > 10 && ` ...`}
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
            </CardContent>
          </Card>
          <Card className="ml-auto">
            <CardHeader>
              <div className="grid grid-cols-2 text-center w-full">
                <div className="grid gap-1 px-4 border-r">
                  <p className="text-muted-foreground border-b">Latitude</p>
                  <p>{country.latlng[0]}</p>
                </div>
                <div className="grid gap-1 px-4">
                  <p className="text-muted-foreground border-b">Longitude</p>
                  <p>{country.latlng[1]}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="grid place-items-center">
              <Map url={country.flags.svg} name={country.name.common} />
            </CardContent>
          </Card>
        </section>
      </section>
    </main>
  )
}
