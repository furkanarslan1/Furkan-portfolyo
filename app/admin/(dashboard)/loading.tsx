export default function AdminLoading() {
  return (
    <div className="space-y-4 p-6 max-w-4xl">
      <div className="h-8 w-48 rounded-lg bg-muted animate-pulse" />
      <div className="h-4 w-72 rounded bg-muted animate-pulse" />
      <div className="mt-8 space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-12 rounded-lg bg-muted animate-pulse" />
        ))}
      </div>
    </div>
  )
}