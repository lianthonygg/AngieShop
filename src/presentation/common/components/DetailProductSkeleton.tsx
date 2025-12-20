export function DetailProductSkeleton() {
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden shadow-md animate-pulse">
      {/* Imagen skeleton con shimmer */}
      <div className="relative w-full h-40 bg-gray-200">
        <div className="w-full h-full shimmer rounded-t-xl" />
      </div>

      {/* Contenido skeleton */}
      <div className="p-3 space-y-4">
        <div className="space-y-2">
          <div className="h-5 bg-gray-200 rounded-lg shimmer w-11/12" />
          <div className="h-5 bg-gray-200 rounded-lg shimmer w-8/12" />
        </div>

        {/* Precio */}
        <div className="flex justify-between items-center">
          <div className="h-7 w-20 bg-gray-200 rounded-xl shimmer" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-5 bg-gray-200 rounded-lg shimmer w-11/12" />
        <div className="h-5 bg-gray-200 rounded-lg shimmer w-8/12" />
        <div className="h-5 bg-gray-200 rounded-lg shimmer w-11/12" />
        <div className="h-5 bg-gray-200 rounded-lg shimmer w-8/12" />
      </div>
    </div>
  );
}
