/*
  Warnings:

  - You are about to drop the `Links` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Links";

-- CreateTable
CREATE TABLE "links" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "hits" INTEGER NOT NULL,

    CONSTRAINT "links_pkey" PRIMARY KEY ("id")
);
