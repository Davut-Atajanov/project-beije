/*
  Warnings:

  - You are about to drop the column `dailyPads` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the column `pads` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the column `tampons` on the `Subscription` table. All the data in the column will be lost.
  - Added the required column `beijeTampon` to the `Subscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `standardPad` to the `Subscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `superPad` to the `Subscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `superPlusPad` to the `Subscription` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Subscription" DROP COLUMN "dailyPads",
DROP COLUMN "pads",
DROP COLUMN "tampons",
ADD COLUMN     "beijeTampon" INTEGER NOT NULL,
ADD COLUMN     "standardPad" INTEGER NOT NULL,
ADD COLUMN     "superPad" INTEGER NOT NULL,
ADD COLUMN     "superPlusPad" INTEGER NOT NULL;
