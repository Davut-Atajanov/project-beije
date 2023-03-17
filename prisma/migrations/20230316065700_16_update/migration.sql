/*
  Warnings:

  - You are about to drop the `OrdersOnSubscriptions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `orders` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `subscriptions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "OrdersOnSubscriptions" DROP CONSTRAINT "OrdersOnSubscriptions_orderId_fkey";

-- DropForeignKey
ALTER TABLE "OrdersOnSubscriptions" DROP CONSTRAINT "OrdersOnSubscriptions_subscriptionId_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_userId_fkey";

-- DropForeignKey
ALTER TABLE "subscriptions" DROP CONSTRAINT "subscriptions_userId_fkey";

-- DropTable
DROP TABLE "OrdersOnSubscriptions";

-- DropTable
DROP TABLE "orders";

-- DropTable
DROP TABLE "subscriptions";

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "standardPad" INTEGER NOT NULL,
    "superPad" INTEGER NOT NULL,
    "superPlusPad" INTEGER NOT NULL,
    "beijeTampon" INTEGER NOT NULL,
    "orderPrice" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subscription" (
    "id" SERIAL NOT NULL,
    "subscriptionType" JSONB NOT NULL,
    "subscriptionPrice" DECIMAL(65,30) NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,
    "pads" JSONB NOT NULL,
    "dailyPads" JSONB NOT NULL,
    "tampons" JSONB NOT NULL,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
