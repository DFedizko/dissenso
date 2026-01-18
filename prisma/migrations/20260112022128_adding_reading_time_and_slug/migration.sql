/*
  Warnings:

  - Added the required column `readingTime` to the `Article` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Article` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Article" ADD COLUMN     "readingTime" INTEGER NOT NULL,
ADD COLUMN     "slug" TEXT NOT NULL;
