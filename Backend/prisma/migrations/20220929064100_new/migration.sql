-- CreateTable
CREATE TABLE "Hotel" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "distance" TEXT NOT NULL,
    "photos" TEXT[],
    "description" TEXT NOT NULL,
    "rating" INTEGER,
    "rooms" TEXT[],
    "price" INTEGER NOT NULL,
    "featured" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Hotel_pkey" PRIMARY KEY ("id")
);
