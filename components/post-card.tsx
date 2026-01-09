"use client";

import { savePostOnUser, unSavePostOnUser } from "@/app/actions/user";
import { stripHtml } from "@/lib/utils";
import { Category, Post } from "@prisma/client";
import { format } from "date-fns";
import { MoveRight, Save, SaveOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { Spinner } from "./ui/spinner";

interface PostProps {
  post: Post & {
    category?: Category | null;
  } & {
    user?: {
      name: string;
      id: string;
      image: string | null;
      savedPosts: string[];
    };
  };
}

export const PostCard = ({ post }: PostProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const excertp = stripHtml(post.content);
  const isSavePost = post?.user?.savedPosts.includes(post.id);

  const onSavePost = async () => {
    setIsLoading(true);
    try {
      if (isSavePost) {
        await unSavePostOnUser(post.id);
        toast.success(`Post ${post.title} unsaved`);
      } else {
        await savePostOnUser(post.id);
        toast.success(`Post ${post.title} saved`);
      }
    } catch (error) {
      toast.error(
        `An error occurred while saving the post with the name ${post.title}`
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full p-0 pb-4 border-0 shadow-md gap-1 relative max-h-[447px]">
      <div className="relative h-60">
        <Image
          src={post.imageUrl}
          alt={post.title}
          fill
          className="rounded-sm object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        <div>
          {isSavePost ? (
            <Button
              disabled={isLoading}
              onClick={onSavePost}
              variant="outline"
              className="cursor-pointer absolute top-[10px] right-[10px] text-gray-500 opacity-50 hover:opacity-100 transition-opacity duration-200"
            >
              {isLoading ? <Spinner /> : <SaveOff />}
            </Button>
          ) : (
            <Button
              disabled={isLoading}
              onClick={onSavePost}
              variant="outline"
              className="cursor-pointer absolute top-[10px] right-[10px] text-gray-500 opacity-50 hover:opacity-100 transition-opacity duration-200"
            >
              {isLoading ? <Spinner /> : <Save />}
            </Button>
          )}
        </div>
      </div>
      <CardHeader className="gap-0">
        <CardTitle className="font-semibold line-clamp-3 pt-2">
          {post.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm line-clamp-3">{excertp} </p>

        <div className="flex gap-2 py-6 flex-wrap">
          {post.tags.slice(0, 5).map((tag: string) => (
            <Link href={`/blog/tag/${tag}`} key={tag} className="truncate">
              <Badge variant="secondary" title={tag}>
                #{tag}
              </Badge>
            </Link>
          ))}

          {post.tags.length > 5 && (
            <HoverCard>
              <HoverCardTrigger asChild>
                <Badge variant="outline" className="cursor-pointer">
                  +{post.tags.length - 5}
                </Badge>
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
                <div className="flex flex-wrap gap-2">
                  {post.tags.slice(5).map((tag: string) => (
                    <Link
                      href={`/blog/tag/${tag}`}
                      key={tag}
                      className="truncate"
                    >
                      <Badge key={tag} variant="outline" title={tag}>
                        #{tag}
                      </Badge>
                    </Link>
                  ))}
                </div>
              </HoverCardContent>
            </HoverCard>
          )}
        </div>

        <div className="flex justify-between w-full gap-2">
          <div className="flex gap-1">
            <div className="relative h-8 w-8 rounded-full shadow-lg">
              <Image
                className="rounded-full shadow-lg"
                src={post?.user?.image ?? ""}
                alt={post?.user?.name ?? ""}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-semibold">
                {post?.user?.name ?? "-"}
              </span>
              <span className="text-[10px] text-neutral-500 font-semibold">
                {format(post.createdAt, "dd/MM/yyyy")}
              </span>
            </div>
          </div>

          <Link
            href={`/blog/posts/${post.slug}`}
            className="flex gap-1 text-sx items-center font-medium"
          >
            Read more <MoveRight />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};
