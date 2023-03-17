/*
  Warnings:

  - You are about to drop the column `subscriptionId` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `orderId` on the `subscriptions` table. All the data in the column will be lost.
  - You are about to drop the `_OrderToSubscription` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `subscriptions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_OrderToSubscription" DROP CONSTRAINT "_OrderToSubscription_A_fkey";

-- DropForeignKey
ALTER TABLE "_OrderToSubscription" DROP CONSTRAINT "_OrderToSubscription_B_fkey";

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "subscriptionId";

-- AlterTable
ALTER TABLE "subscriptions" DROP COLUMN "orderId",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_OrderToSubscription";

-- CreateTable
CREATE TABLE "OrdersOnSubscriptions" (
    "orderId" INTEGER NOT NULL,
    "subscriptionId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OrdersOnSubscriptions_pkey" PRIMARY KEY ("orderId","subscriptionId")
);

-- AddForeignKey
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrdersOnSubscriptions" ADD CONSTRAINT "OrdersOnSubscriptions_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrdersOnSubscriptions" ADD CONSTRAINT "OrdersOnSubscriptions_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "subscriptions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
