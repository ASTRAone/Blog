"use server";

import { PostFormValues } from "@/components/post-form";
import { authSession } from "@/lib/auth-utils";
import prisma from "@/lib/db";
import { Post, PostStatus } from "@/lib/generated/prisma/client";

interface Tag {
  label: string;
  value: string;
}

export const getUniquePost = async (id: string) => {
  try {
    const session = await authSession();

    if (!session) {
      return {} as Post;
    }

    const res = (await prisma.post.findUnique({
      where: { id },
    })) as Post;

    return res;
  } catch (error) {
    console.error({ error });
    throw new Error("Something wend wrong");
  }
};

export const createPost = async (params: PostFormValues) => {
  try {
    const session = await authSession();

    if (!session) {
      return [];
    }

    const { categories, tags, id, ...rest } = params;
    const data = { ...rest, tags: tags.map((tag: Tag) => tag.value) };
    const res = await prisma.post.create({
      data: {
        ...data,
        userId: session.user.id,
        status: data.status as PostStatus,
      },
    });

    return res;
  } catch (error) {
    console.error({ error });
    throw new Error("Something went wrong");
  }
};

export const updatePost = async (params: PostFormValues) => {
  try {
    const session = await authSession();

    if (!session) {
      return [];
    }

    const { categories, tags, id, ...rest } = params;
    const data = { ...rest, tags: tags.map((tag: Tag) => tag.value) };

    const res = await prisma.post.update({
      where: { id: params.id },
      data: {
        ...data,
        userId: session.user.id,
        status: data.status as PostStatus,
      },
    });

    return res;
  } catch (error) {
    console.error({ error });
    throw new Error("Something went wrong");
  }
};

export const getAllPosts = async () => {
  try {
    const session = await authSession();

    if (!session) {
      return [];
    }

    const res = await prisma.post.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: { updatedAt: "desc" },
      include: { category: true },
    });

    return res;
  } catch (error) {
    console.error({ error });
    throw new Error("Something went wrong");
  }
};

export const getAllPostsOnIds = async (ids: string[]) => {
  try {
    const session = await authSession();

    if (!session) {
      return [];
    }

    const res = await prisma.post.findMany({
      where: {
        userId: session.user.id,
        id: {
          in: ids,
        },
      },
      orderBy: { updatedAt: "desc" },
      include: { category: true },
    });

    return res;
  } catch (error) {
    console.error({ error });
    throw new Error("Something went wrong");
  }
};

export const deletePost = async (id: string) => {
  try {
    const session = await authSession();

    if (!session) {
      return [];
    }

    const res = await prisma.post.delete({
      where: { id },
    });

    return res;
  } catch (error) {
    console.error({ error });
    throw new Error("Something went wrong");
  }
};

export const getPostsByUser = async () => {
  try {
    const session = await authSession();

    if (!session) {
      return [];
    }

    const res = await prisma.post.findMany({
      take: 10,
      where: { userId: session.user.id },
      orderBy: { updatedAt: "desc" },
    });

    return res;
  } catch (error) {
    console.error({ error });
    throw new Error("Something went wrong");
  }
};
