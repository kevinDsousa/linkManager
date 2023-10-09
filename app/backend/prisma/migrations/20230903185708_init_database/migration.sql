-- CreateTable
CREATE TABLE "Links" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "hits" INTEGER NOT NULL,

    CONSTRAINT "Links_pkey" PRIMARY KEY ("id")
);
