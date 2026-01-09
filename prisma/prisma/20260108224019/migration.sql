/*
  Warnings:

  - You are about to drop the column `saved` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `savedPost` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "saved";

-- AlterTable
ALTER TABLE "user" DROP COLUMN "savedPost",
ADD COLUMN     "savedPosts" TEXT[] DEFAULT ARRAY[]::TEXT[];
