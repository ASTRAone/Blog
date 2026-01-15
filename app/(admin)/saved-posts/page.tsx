import { getAllPostsOnIds } from "@/app/actions/posts";
import { getAllSavedPostOnUser } from "@/app/actions/user";
import { DataTable } from "@/components/data-table";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Metadata } from "next";
import Link from "next/link";
import { columns } from "./client/columns";

export const metadata: Metadata = {
  title: "Saved Posts",
};

const SavedPostPage = async () => {
  const data = await getAllSavedPostOnUser();
  const posts = await getAllPostsOnIds(data?.savedPosts ?? []);

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
                <BreadcrumbPage>saved posts</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      <DataTable data={posts} columns={columns} />
    </>
  );
};
export default SavedPostPage;
