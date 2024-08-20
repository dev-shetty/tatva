export type SearchResponse = Pick<Country, "name">[]

export interface Country {
  name: CountryName
  tld: string[]
  cca2: string
  ccn3: string
  cca3: string
  cioc: string
  independent: boolean
  status: string
  unMember: boolean
  currencies: Currencies
  idd: Idd
  capital: string[]
  altSpellings: string[]
  region: string
  subregion: string
  languages: Languages
  translations: { [key: string]: Translation }
  latlng: number[]
  landlocked: boolean
  borders: string[]
  area: number
  demonyms: Demonyms
  flag: string
  maps: Maps
  population: number
  gini: Gini
  fifa: string
  car: Car
  timezones: string[]
  continents: string[]
  flags: Flags
  coatOfArms: CoatOfArms
  startOfWeek: string
  capitalInfo: CapitalInfo
  postalCode: PostalCode
}

export interface CapitalInfo {
  latlng?: number[]
}

export interface Car {
  signs: string[]
  side: string
}

export interface CoatOfArms {
  png: string
  svg: string
}

export type Currencies = Record<string, Notation>

export interface Notation {
  name: string
  symbol: string
}

export type Demonyms = Record<string, Eng>
export interface Eng {
  f: string
  m: string
}

export interface Flags {
  png: string
  svg: string
  alt: string
}

export type Gini = Record<string, number>

export interface Idd {
  root: string
  suffixes: string[]
}

export interface Languages {
  eng: string
}

export interface Maps {
  googleMaps: string
  openStreetMaps: string
}

export interface CountryName {
  common: string
  official: string
  nativeName: NativeName
}

export type NativeName = Record<string, Translation>

export interface Translation {
  official: string
  common: string
}

export interface PostalCode {
  format: string
  regex: string
}
