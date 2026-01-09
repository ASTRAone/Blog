import { Header } from "@/components/header";
import { NavMenu } from "@/components/navbar";
import { SkeletonCard } from "@/components/skeleton-card";

const Loading = () => {
  return (
    <div className="w-full min-w-dvw flex flex-col min-h-dvh overflow-hidden">
      <div className="relative w-full">
        <NavMenu />
      </div>
      <Header />

      <div className="flex flex-col justify-center">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 my-8">
          {Array.from({ length: 8 }, (_, v) => v).map((item) => (
            <SkeletonCard key={item} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default Loading;
