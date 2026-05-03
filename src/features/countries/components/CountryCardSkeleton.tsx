export function CountryCardSkeleton() {
  return (
    <div className="rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 animate-pulse">
      <div className="aspect-[3/2] bg-gray-200 dark:bg-gray-700" />
      <div className="p-5 pb-7 space-y-3">
        <div className="h-4 rounded bg-gray-200 dark:bg-gray-700 w-3/4" />
        <div className="space-y-2 pt-1">
          <div className="h-3 rounded bg-gray-200 dark:bg-gray-700 w-1/2" />
          <div className="h-3 rounded bg-gray-200 dark:bg-gray-700 w-2/5" />
          <div className="h-3 rounded bg-gray-200 dark:bg-gray-700 w-1/3" />
        </div>
      </div>
    </div>
  )
}
