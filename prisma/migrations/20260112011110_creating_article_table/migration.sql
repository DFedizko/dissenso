-- CreateTable
CREATE TABLE "article" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "coverImage" TEXT,
    "content" TEXT NOT NULL,
    "tags" TEXT[],

    CONSTRAINT "article_pkey" PRIMARY KEY ("id")
);
