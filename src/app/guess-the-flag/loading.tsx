import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <main className="p-24 container flex flex-col items-center gap-8 justify-center mx-auto">
      <div className="flex flex-col justify-center items-center gap-4">
        <Skeleton className="w-[16rem] md:w-[32rem] h-[40px]" />
        <Skeleton className="w-[16rem] h-[12rem] md:w-[32rem] md:h-[24rem]" />
        <div className="flex items-center gap-8">
          <Skeleton className="h-12 w-64" />
        </div>
      </div>
    </main>
  )
}
