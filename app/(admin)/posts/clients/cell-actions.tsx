"use client";

import { deletePost } from "@/app/actions/posts";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
import { Copy, Edit, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export const CellActions = ({ id }: { id: string }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const router = useRouter();

  const onCopy = () => {
    navigator.clipboard.writeText(id);
    toast.success(`Post  copy to clipboard`);
  };

  const onRemovePost = async () => {
    try {
      setIsLoading(true);
      await deletePost(id);
    } catch (error: any) {
      throw new Error(`Something went wrong ${error?.message}`);
    } finally {
      router.refresh();
      toast.success(`Post deleted successfully`);
      setIsLoading(false);
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <>
      <div className="flex justify-end gap-6">
        <div
          className="cursor-pointer"
          title="Copy category Id"
          onClick={onCopy}
        >
          <Copy />
        </div>

        <div
          className="cursor-pointer"
          title="Edit"
          onClick={() => {
            router.push(`/posts/${id}`);
          }}
        >
          <Edit />
        </div>

        <div
          className="cursor-pointer"
          title="Delete"
          onClick={() => setIsDeleteModalOpen(true)}
        >
          <Trash className="text-red-500" />
        </div>
      </div>

      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent
          className="sm:max-w-[425px] flex flex-col gap-6"
          aria-describedby="category"
          aria-description="delete category"
        >
          <DialogHeader className="gap-6">
            <DialogTitle className="gap-6">Delete Category</DialogTitle>
            <DialogDescription className="flex flex-col">
              <span className="text-md">Are you sure you want to delete?</span>
              {"  "}
              <span>This action cannot be undone</span>
            </DialogDescription>
          </DialogHeader>

          <Button
            variant="destructive"
            onClick={onRemovePost}
            className="max-w-40 self-end cursor-pointer"
            disabled={isLoading}
          >
            {isLoading ? <Spinner className="size-6" /> : "Delete"}
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};
