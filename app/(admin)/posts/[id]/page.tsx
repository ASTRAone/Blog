import { getCategories } from "@/app/actions/categories";
import { getUniquePost } from "@/app/actions/posts";
import PostForm from "@/components/post-form";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const PostPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const post = await getUniquePost(id);
  const categories = await getCategories();

  return (
    <>
      <div className="flex flex-col p-8">
        <div className="flex w-full justify-between">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />

              <BreadcrumbItem>
                <BreadcrumbLink href="/posts">posts</BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbSeparator />

              <BreadcrumbItem>
                <BreadcrumbPage>
                  {id === "new" ? "New" : post.title}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      <div className="p-8 flex flex-col">
        {post ? (
          <PostForm
            id={post.id}
            title={post.title}
            content={post.content}
            imageUrl={post.imageUrl}
            categoryId={post.categoryId!}
            tags={post.tags.map((tag: string) => ({ label: tag, value: tag }))}
            status={post.status}
            categories={categories}
            slug={post.slug}
          />
        ) : (
          <PostForm
            id=""
            title=""
            content=""
            imageUrl=""
            categoryId=""
            tags={[]}
            status=""
            categories={categories}
            slug=""
          />
        )}
      </div>
    </>
  );
};

export default PostPage;
