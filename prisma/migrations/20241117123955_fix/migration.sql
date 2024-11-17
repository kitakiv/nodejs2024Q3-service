/*
  Warnings:

  - You are about to drop the `Favorites` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_AlbumToFavorites` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ArtistToFavorites` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_FavoritesToTrack` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_AlbumToFavorites" DROP CONSTRAINT "_AlbumToFavorites_A_fkey";

-- DropForeignKey
ALTER TABLE "_AlbumToFavorites" DROP CONSTRAINT "_AlbumToFavorites_B_fkey";

-- DropForeignKey
ALTER TABLE "_ArtistToFavorites" DROP CONSTRAINT "_ArtistToFavorites_A_fkey";

-- DropForeignKey
ALTER TABLE "_ArtistToFavorites" DROP CONSTRAINT "_ArtistToFavorites_B_fkey";

-- DropForeignKey
ALTER TABLE "_FavoritesToTrack" DROP CONSTRAINT "_FavoritesToTrack_A_fkey";

-- DropForeignKey
ALTER TABLE "_FavoritesToTrack" DROP CONSTRAINT "_FavoritesToTrack_B_fkey";

-- DropTable
DROP TABLE "Favorites";

-- DropTable
DROP TABLE "_AlbumToFavorites";

-- DropTable
DROP TABLE "_ArtistToFavorites";

-- DropTable
DROP TABLE "_FavoritesToTrack";

-- CreateTable
CREATE TABLE "Favourites" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "Favourites_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_Artists-relation" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_Album-relation" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_Track-relation" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_Artists-relation_AB_unique" ON "_Artists-relation"("A", "B");

-- CreateIndex
CREATE INDEX "_Artists-relation_B_index" ON "_Artists-relation"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Album-relation_AB_unique" ON "_Album-relation"("A", "B");

-- CreateIndex
CREATE INDEX "_Album-relation_B_index" ON "_Album-relation"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Track-relation_AB_unique" ON "_Track-relation"("A", "B");

-- CreateIndex
CREATE INDEX "_Track-relation_B_index" ON "_Track-relation"("B");

-- AddForeignKey
ALTER TABLE "_Artists-relation" ADD CONSTRAINT "_Artists-relation_A_fkey" FOREIGN KEY ("A") REFERENCES "Artist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Artists-relation" ADD CONSTRAINT "_Artists-relation_B_fkey" FOREIGN KEY ("B") REFERENCES "Favourites"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Album-relation" ADD CONSTRAINT "_Album-relation_A_fkey" FOREIGN KEY ("A") REFERENCES "Album"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Album-relation" ADD CONSTRAINT "_Album-relation_B_fkey" FOREIGN KEY ("B") REFERENCES "Favourites"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Track-relation" ADD CONSTRAINT "_Track-relation_A_fkey" FOREIGN KEY ("A") REFERENCES "Favourites"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Track-relation" ADD CONSTRAINT "_Track-relation_B_fkey" FOREIGN KEY ("B") REFERENCES "Track"("id") ON DELETE CASCADE ON UPDATE CASCADE;
