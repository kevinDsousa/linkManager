/*
  Warnings:

  - You are about to alter the column `code` on the `links` table. The data in that column could be lost. The data in that column will be cast from `Text` to `Char(5)`.

*/
-- AlterTable
ALTER TABLE "links" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "url" SET DATA TYPE VARCHAR,
ALTER COLUMN "code" SET DATA TYPE CHAR(5),
ALTER COLUMN "hits" SET DATA TYPE BIGINT;
