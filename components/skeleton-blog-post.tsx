import { Skeleton } from "@/components/ui/skeleton";

export const SkeletonBlogPost = () => {
  return (
    <div className="w-full flex flex-col items-center p-6 md:p-0">
      <div className="flex max-w-3xl flex-col gap-6 justify-center w-full animate-pulse">
        {/* Заголовок */}
        <div className="space-y-2">
          <Skeleton className="h-10 md:h-14 w-full" />
          <Skeleton className="h-8 md:h-10 w-3/4" />
        </div>

        {/* Автор и дата */}
        <div className="flex gap-6 items-center">
          {/* Аватар */}
          <div className="relative h-8 w-8">
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>

          <div className="flex flex-col gap-1">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-20" />
          </div>

          {/* Категория */}
          <Skeleton className="h-4 w-24" />
        </div>

        {/* Изображение */}
        <div className="relative h-60 md:h-80 w-full">
          <Skeleton className="h-full w-full rounded-sm" />
        </div>

        {/* Контент */}
        <div className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <div className="space-y-4 pt-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>

        {/* Теги */}
        <div className="flex gap-2 py-6 flex-wrap">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-8 w-20 rounded-full" />
          ))}
        </div>
      </div>
    </div>
  );
};
