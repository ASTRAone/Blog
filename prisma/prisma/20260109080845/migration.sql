/*
  Warnings:

  - You are about to drop the `_SavedPosts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."_SavedPosts" DROP CONSTRAINT "_SavedPosts_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_SavedPosts" DROP CONSTRAINT "_SavedPosts_B_fkey";

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "savedPosts" TEXT[];

-- DropTable
DROP TABLE "public"."_SavedPosts";
