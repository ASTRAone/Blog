"use server";

import { authSession } from "@/lib/auth-utils";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export const getAllSavedPostOnUser = async () => {
  try {
    const session = await authSession();

    if (!session) {
      return;
    }

    const res = await prisma.user.findFirst({
      where: { id: session.user.id },
      select: {
        savedPosts: true,
      },
    });

    return res;
  } catch (error) {
    console.error({ error });
  }
};

export const savePostOnUser = async (id: string) => {
  try {
    const session = await authSession();

    if (!session) {
      throw new Error("Unauthorized: User Id not found");
    }

    const res = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        savedPosts: {
          push: id,
        },
      },
    });

    revalidatePath("/posts");

    return res;
  } catch (error) {
    console.error({ error });
    throw new Error("Something went wrong");
  }
};

export const unSavePostOnUser = async (id: string) => {
  try {
    const session = await authSession();

    if (!session) {
      throw new Error("Unauthorized: User Id not found");
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { savedPosts: true },
    });

    const updateSavedPosts = user?.savedPosts.filter(
      (postsIds) => postsIds !== id
    );

    const res = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        savedPosts: updateSavedPosts,
      },
    });

    revalidatePath("/posts");

    return res;
  } catch (error) {
    console.error({ error });
    throw new Error("Something went wrong");
  }
};
