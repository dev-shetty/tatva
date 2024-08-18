import { Country } from "@/lib/types"

export default async function CountryPage({
  params,
}: {
  params: { name: string }
}) {
  const { name } = params

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_COUNTRY_API_URL}/name/${name}`
  )

  // TODO: Make a 404 Page
  if (!response.ok) {
    return <div>Country not found</div>
  }

  const data: Country[] = await response.json()
  const country = data[0]

  console.log(Object.keys(country).toString())

  return (
    <main>
      <header className="w-full bg-primary py-8 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto flex flex-col items-center gap-4 md:flex-row md:justify-between">
          <div className="flex items-center gap-4">
            <img
              src={country.flags.svg}
              width={64}
              height={48}
              alt={country.flags.alt}
              className="rounded-md"
              style={{ aspectRatio: "64/48", objectFit: "cover" }}
            />
            <h1 className="text-3xl font-bold text-primary-foreground">
              {country.name.common}
            </h1>
          </div>
          <img
            src={country.flags.svg}
            width={100}
            height={100}
            alt={country.flags.alt}
            className="rounded-md"
            style={{ aspectRatio: "100/100", objectFit: "cover" }}
          />
        </div>
      </header>
      <section className="container mx-auto">
        <section>
          <h2 className="text-2xl font-bold">General Info</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="grid gap-1">
              <span className="text-muted-foreground">Independent</span>
              <span>{country.independent ? "Yes" : "No"}</span>
            </div>
            <div className="grid gap-1">
              <span className="text-muted-foreground">UN Member</span>
              <span>{country.unMember ? "Yes" : "No"}</span>
            </div>
            <div className="grid gap-1">
              <span className="text-muted-foreground">Capital</span>
              <span>{country.capital}</span>
            </div>
            <div className="grid gap-1">
              <span className="text-muted-foreground">
                Alternative Spellings
              </span>
              <span>{country.altSpellings.join(", ")}</span>
            </div>
            <div className="grid gap-1">
              <span className="text-muted-foreground">Region</span>
              <span>{country.region}</span>
            </div>
            <div className="grid gap-1">
              <span className="text-muted-foreground">Subregion</span>
              <span>{country.subregion}</span>
            </div>
            <div className="grid gap-1">
              <span className="text-muted-foreground">Landlocked</span>
              <span>{country.landlocked ? "Yes" : "No"}</span>
            </div>
            <div className="grid gap-1">
              <span className="text-muted-foreground">Borders</span>
              <span>{country.borders.join(", ")}</span>
            </div>
            <div className="grid gap-1">
              <span className="text-muted-foreground">Area</span>
              <span>{country.area.toLocaleString()} km²</span>
            </div>
            <div className="grid gap-1">
              <span className="text-muted-foreground">Demonyms</span>
              <span>
                {country.demonyms.eng.f} / {country.demonyms.eng.m} (English)
                <br />
                {country.demonyms.fra.f} / {country.demonyms.fra.m} (French)
              </span>
            </div>
            <div className="grid gap-1">
              <span className="text-muted-foreground">Timezones</span>
              <span>{country.timezones.join(", ")}</span>
            </div>
            <div className="grid gap-1">
              <span className="text-muted-foreground">Continents</span>
              <span>{country.continents.join(", ")}</span>
            </div>
          </div>
        </section>
        <section>
          <h2 className="text-2xl font-bold">Currencies</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Object.entries(country.currencies).map(([key, currency]) => (
              <div key={key} className="grid gap-1">
                <span className="text-muted-foreground">
                  {currency.name}: {currency.symbol}
                </span>
                {/* <span>{currency.symbol}</span> */}
              </div>
            ))}
          </div>
        </section>
        <section>
          <h2 className="text-2xl font-bold">Languages</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Object.entries(country.languages).map(([code, name], index) => (
              <div key={index} className="grid gap-1">
                <span className="text-muted-foreground">{code}</span>
                <span>{name}</span>
              </div>
            ))}
          </div>
        </section>
        <section>
          <h2 className="text-2xl font-bold">Geography</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="grid gap-1">
              <span className="text-muted-foreground">Latitude</span>
              <span>{country.latlng[0]}</span>
            </div>
            <div className="grid gap-1">
              <span className="text-muted-foreground">Longitude</span>
              <span>{country.latlng[1]}</span>
            </div>
            <div className="grid gap-1">
              <span className="text-muted-foreground">Map</span>
              <iframe
                className="map"
                width="400"
                height="300"
                src={country.maps.googleMaps + "&output=embed"}
              ></iframe>
            </div>
          </div>
        </section>
        <section>
          <h2 className="text-2xl font-bold">Demographics</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="grid gap-1">
              <span className="text-muted-foreground">Population</span>
              <span>{country.population.toLocaleString()}</span>
            </div>
            <div className="grid gap-1">
              <span className="text-muted-foreground">Gini Coefficient</span>
              <span>
                {Object.entries(country.gini).map(([key, value]) => (
                  <p>
                    {key}: {value.toString()}
                  </p>
                ))}
              </span>
            </div>
            <div className="grid gap-1">
              <span className="text-muted-foreground">FIFA Code</span>
              <span>{country.fifa}</span>
            </div>
          </div>
        </section>
        <section>
          <h2 className="text-2xl font-bold">Other</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="grid gap-1">
              <span className="text-muted-foreground">Top-Level Domain</span>
              <span>{country.tld.join(", ")}</span>
            </div>
            <div className="grid gap-1">
              <span className="text-muted-foreground">Dialing Code</span>
              <span>
                {country.idd.root}
                {country.idd.suffixes.map((suffix) => suffix)}
              </span>
            </div>
            <div className="grid gap-1">
              <span className="text-muted-foreground">Car Registration</span>
              <span>
                {country.car.signs.map((sign) => (
                  <span>{sign}</span>
                ))}
              </span>
            </div>
            <span className="text-muted-foreground">Car Side</span>
            <span>{country.car.side}</span>
          </div>
          <div className="grid gap-1">
            <span className="text-muted-foreground">Start of Week</span>
            <span>{country.startOfWeek}</span>
          </div>
          <div className="grid gap-1">
            <span className="text-muted-foreground">Postal Code Format</span>
            <span>{country.postalCode.format}</span>
          </div>
          <div className="grid gap-1">
            <span className="text-muted-foreground">Coat of Arms</span>
            <img
              src={country.coatOfArms.svg}
              alt="Coat of Arms"
              className="h-12 w-auto"
            />
          </div>
        </section>
      </section>
    </main>
  )
}
