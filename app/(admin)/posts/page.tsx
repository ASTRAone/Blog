import { getAllPosts } from "@/app/actions/posts";
import { DataTable } from "@/components/data-table";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import Link from "next/link";
import { columns } from "./clients/columns";

export const metadata: Metadata = {
  title: "Posts",
};

const PostsPage = async () => {
  const data = await getAllPosts();
  const posts = Array.isArray(data) ? data : [];

  return (
    <>
      <div className="flex flex-col p-8">
        <div className="flex w-full justify-between">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <Link href="/dashboard">Dashboard</Link>
              </BreadcrumbItem>
              <BreadcrumbSeparator />

              <BreadcrumbItem>
                <BreadcrumbPage>posts</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <Link href="/posts/new">
            <Button className="cursor-pointer">Create new post</Button>
          </Link>
        </div>
      </div>

      <DataTable data={posts} columns={columns} />
    </>
  );
};
export default PostsPage;
