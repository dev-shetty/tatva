import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <main className="py-16">
      <section className="flex flex-col justify-center items-center">
        <div className="flex flex-col justify-center items-center gap-6">
          <div className="flex flex-col justify-center items-center gap-4">
            <Skeleton className="w-[60px] h-[40px]" />
            <Skeleton className="w-[250px] h-[250px] rounded-full" />
            <div className="flex items-center gap-8">
              <Skeleton className="h-12 w-64" />
            </div>
          </div>
          <div className="flex flex-col gap-2 justify-center items-center">
            <div className="flex gap-2">
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-8 w-32" />
            </div>
            <div className="flex gap-1 items-center">
              <Skeleton className="h-6 w-6 rounded-full" />
              <Skeleton className="h-8 w-32" />
            </div>
          </div>
        </div>
      </section>
      <section className="w-3/4 rounded-lg p-12 shadow-lg mx-auto bg-accent mt-8">
        <section className="grid gap-4 md:grid-cols-2">
          <div className="flex flex-col md:border-r">
            {[...Array(11)].map((_, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-32" />
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-8 px-4">
            <Skeleton className="w-full aspect-[4/3]" />
            <div className="flex flex-col justify-center items-center rounded-md px-4">
              <Skeleton className="h-6 w-32 mb-2" />
              <Skeleton className="h-8 w-40" />
            </div>
            <div className="col-span-2">
              <Skeleton className="w-full h-[200px]" />
            </div>
            <div className="col-span-2">
              <Skeleton className="w-full h-[100px]" />
            </div>
          </div>
        </section>
      </section>
    </main>
  )
}
