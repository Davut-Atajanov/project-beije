/*
  Warnings:

  - Added the required column `city` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `district` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fullAddress` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postalCode` to the `Address` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Address" ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "district" TEXT NOT NULL,
ADD COLUMN     "fullAddress" TEXT NOT NULL,
ADD COLUMN     "postalCode" TEXT NOT NULL;
