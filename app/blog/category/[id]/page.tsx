import { getPostsByCategory } from "@/app/actions/blog";
import { Header } from "@/components/header";
import { Pagination } from "@/components/pagination";
import { PostCard } from "@/components/post-card";
import { Post } from "@/lib/generated/prisma/client";

const CategoryPage = async ({
  params,
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const searchArgs = await searchParams;
  const page = Number(searchArgs.page) || 1;
  const { posts, totalPages, currentPage } = await getPostsByCategory(id, page);

  const foundPost = posts.find((post: Post) => post.categoryId === id);

  console.log("foundPost", foundPost);

  return (
    <>
      <Header about={foundPost?.category?.name} />
      <div className="flex flex-col gap-6 justify-between h-full min-h-dvh">
        <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-4 gap-6 my-8">
          {posts.map((post) => (
            <PostCard post={post} key={post.id} />
          ))}
        </div>
        {posts.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            page={page}
            pageUrl={`/blog/category/${id}`}
          />
        )}
      </div>
    </>
  );
};
export default CategoryPage;
