import Image from "next/image"

export default function Map({ url, name }: { url: string; name: string }) {
  return (
    <div>
      <Image src={url} alt={`Map of ${name}`} width={400} height={300} />
    </div>
  )
}
