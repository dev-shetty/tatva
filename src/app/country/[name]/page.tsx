export default function CountryPage({ params }: { params: { name: string } }) {
  const { name } = params
  return <div>{name}</div>
}
  