"use client";

import { unSavePostOnUser } from "@/app/actions/user";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
import { CategoryProps } from "@/hooks/use-categories";
import { Copy, SaveOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export const CellActions = ({ id, name }: CategoryProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isUnSaveModalOpen, setIsUnSaveModalOpen] = useState(false);
  const router = useRouter();

  const onCopy = () => {
    navigator.clipboard.writeText(name);
    toast.success(`Post ${name} copy to clipboard`);
  };

  const onUnSavePost = async () => {
    try {
      setIsLoading(true);
      await unSavePostOnUser(id);
    } catch (error) {
      throw new Error(`Something went wrong ${(error as Error)?.message}`);
    } finally {
      router.refresh();
      toast.success(`Post ${name} unsave successfully`);
      setIsLoading(false);
      setIsUnSaveModalOpen(false);
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
          title="Delete"
          onClick={() => setIsUnSaveModalOpen(true)}
        >
          <SaveOff className="text-red-500" />
        </div>
      </div>

      <Dialog open={isUnSaveModalOpen} onOpenChange={setIsUnSaveModalOpen}>
        <DialogContent
          className="sm:max-w-[425px] flex flex-col gap-6"
          aria-describedby="saved-post"
          aria-description="delete saved post"
        >
          <DialogHeader className="gap-6">
            <DialogTitle className="gap-6">Unsave post</DialogTitle>
            <DialogDescription className="flex flex-col">
              <span className="text-md">
                Are you sure you want to delete {name}?
              </span>
              {"  "}
              <span>This action cannot be undone</span>
            </DialogDescription>
          </DialogHeader>

          <Button
            variant="destructive"
            onClick={onUnSavePost}
            className="max-w-40 self-end cursor-pointer"
            disabled={isLoading}
          >
            {isLoading ? <Spinner className="size-6" /> : "UnSave"}
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};
