export default function ProjectSkeleton() {
  return (
    <div className="glass rounded-2xl p-6 flex flex-col gap-4">
      <div className="skeleton rounded-lg h-6 w-3/4" />
      <div className="space-y-2">
        <div className="skeleton rounded h-4 w-full" />
        <div className="skeleton rounded h-4 w-5/6" />
        <div className="skeleton rounded h-4 w-4/6" />
      </div>
      <div className="flex gap-2 mt-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className="skeleton rounded-full h-6 w-16" />
        ))}
      </div>
      <div className="flex gap-3 mt-4">
        <div className="skeleton rounded-lg h-9 flex-1" />
        <div className="skeleton rounded-lg h-9 flex-1" />
      </div>
    </div>
  );
}
