/*
  Warnings:

  - You are about to drop the `Favourites` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_Album-relation" DROP CONSTRAINT "_Album-relation_B_fkey";

-- DropForeignKey
ALTER TABLE "_Artists-relation" DROP CONSTRAINT "_Artists-relation_B_fkey";

-- DropForeignKey
ALTER TABLE "_Track-relation" DROP CONSTRAINT "_Track-relation_A_fkey";

-- DropTable
DROP TABLE "Favourites";

-- CreateTable
CREATE TABLE "Favs" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "Favs_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "_Artists-relation" ADD CONSTRAINT "_Artists-relation_B_fkey" FOREIGN KEY ("B") REFERENCES "Favs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Album-relation" ADD CONSTRAINT "_Album-relation_B_fkey" FOREIGN KEY ("B") REFERENCES "Favs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Track-relation" ADD CONSTRAINT "_Track-relation_A_fkey" FOREIGN KEY ("A") REFERENCES "Favs"("id") ON DELETE CASCADE ON UPDATE CASCADE;
