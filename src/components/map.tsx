import Image from "next/image"

export default function Map({ url, name }: { url: string; name: string }) {
  return (
    <div className="w-full">
      {/* <Image src={url} alt={`Map of ${name}`} width={400} height={300} /> */}
      <div className="h-[300px] bg-gray-100"></div>
    </div>
  )
}
