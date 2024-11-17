/*
  Warnings:

  - You are about to drop the `Favs` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_Album-relation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_Artists-relation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_Track-relation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_Album-relation" DROP CONSTRAINT "_Album-relation_A_fkey";

-- DropForeignKey
ALTER TABLE "_Album-relation" DROP CONSTRAINT "_Album-relation_B_fkey";

-- DropForeignKey
ALTER TABLE "_Artists-relation" DROP CONSTRAINT "_Artists-relation_A_fkey";

-- DropForeignKey
ALTER TABLE "_Artists-relation" DROP CONSTRAINT "_Artists-relation_B_fkey";

-- DropForeignKey
ALTER TABLE "_Track-relation" DROP CONSTRAINT "_Track-relation_A_fkey";

-- DropForeignKey
ALTER TABLE "_Track-relation" DROP CONSTRAINT "_Track-relation_B_fkey";

-- DropTable
DROP TABLE "Favs";

-- DropTable
DROP TABLE "_Album-relation";

-- DropTable
DROP TABLE "_Artists-relation";

-- DropTable
DROP TABLE "_Track-relation";

-- CreateTable
CREATE TABLE "FavsTracks" (
    "id" TEXT NOT NULL,
    "trackId" TEXT NOT NULL,

    CONSTRAINT "FavsTracks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FavsAlbums" (
    "id" TEXT NOT NULL,
    "albumId" TEXT NOT NULL,

    CONSTRAINT "FavsAlbums_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FavsArtists" (
    "id" TEXT NOT NULL,
    "artistId" TEXT NOT NULL,

    CONSTRAINT "FavsArtists_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FavsTracks_id_key" ON "FavsTracks"("id");

-- CreateIndex
CREATE UNIQUE INDEX "FavsTracks_trackId_key" ON "FavsTracks"("trackId");

-- CreateIndex
CREATE UNIQUE INDEX "FavsAlbums_id_key" ON "FavsAlbums"("id");

-- CreateIndex
CREATE UNIQUE INDEX "FavsAlbums_albumId_key" ON "FavsAlbums"("albumId");

-- CreateIndex
CREATE UNIQUE INDEX "FavsArtists_id_key" ON "FavsArtists"("id");

-- CreateIndex
CREATE UNIQUE INDEX "FavsArtists_artistId_key" ON "FavsArtists"("artistId");

-- AddForeignKey
ALTER TABLE "FavsTracks" ADD CONSTRAINT "FavsTracks_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "Track"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavsAlbums" ADD CONSTRAINT "FavsAlbums_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavsArtists" ADD CONSTRAINT "FavsArtists_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
