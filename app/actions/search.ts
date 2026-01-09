"use server";

import prisma from "@/lib/db";
import { PostStatus } from "@/lib/generated/prisma/client";

type SearchResult =
  | {
      type: "post";
      id: string;
      title: string;
      url: string;
      imageUrl: string;
    }
  | {
      type: "category";
      id: string;
      name: string;
      url: string;
    };

const TAKE_SIZE = 10;

export const searchContent = async (query: string) => {
  if (query.trim().length < 2) {
    return { results: [] };
  }

  try {
    const [posts, categories] = await Promise.all([
      prisma.post.findMany({
        where: {
          status: PostStatus.published,
          OR: [
            {
              title: {
                contains: query,
                mode: "insensitive",
              },
            },
            {
              content: {
                contains: query,
                mode: "insensitive",
              },
            },
            {
              tags: {
                hasSome: [query],
              },
            },
          ],
        },
        select: { id: true, title: true, imageUrl: true, slug: true },
        take: TAKE_SIZE,
        orderBy: { updatedAt: "desc" },
      }),

      prisma.category.findMany({
        where: {
          name: {
            contains: query,
            mode: "insensitive",
          },
        },
        select: { id: true, name: true },
        take: TAKE_SIZE,
        orderBy: { updatedAt: "desc" },
      }),
    ]);

    type PostFromDB = (typeof posts)[0];
    type CategoryFromDB = (typeof categories)[0];

    const results: SearchResult[] = [
      ...posts.map(
        (post: PostFromDB): SearchResult => ({
          type: "post" as const,
          title: post.title,
          url: `/blog/posts/${post.slug}`,
          imageUrl: post.imageUrl,
          id: post.id,
        })
      ),

      ...categories.map(
        (category: CategoryFromDB): SearchResult => ({
          type: "category" as const,
          name: category.name,
          url: `/blog/category/${category.id}`,
          id: category.id,
        })
      ),
    ];

    return { results };
  } catch (error) {
    console.error({ error });
  }
};
