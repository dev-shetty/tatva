"use client"

import { Country } from "@/lib/types"
import L from "leaflet"
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"

export default function Map({
  countryCoords,
  capitalCoords,
  capital,
}: {
  countryCoords: Country["latlng"]
  capitalCoords: Country["capitalInfo"]["latlng"]
  capital: Country["capital"]
}) {
  const defaultIcon = L.icon({
    iconUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    iconSize: [25, 41],
  })
  return (
    <div className="h-[400px] w-full z-50">
      <MapContainer
        center={countryCoords as [number, number]}
        zoom={4}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker icon={defaultIcon} position={capitalCoords as [number, number]}>
          <Popup>{capital}</Popup>
        </Marker>
      </MapContainer>
    </div>
  )
}
