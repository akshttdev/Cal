/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Availability` table. All the data in the column will be lost.
  - You are about to drop the column `timezone` on the `Availability` table. All the data in the column will be lost.
  - You are about to drop the column `guestEmail` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `guestName` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `durationMinutes` on the `EventType` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,dayOfWeek]` on the table `Availability` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[uid]` on the table `Booking` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,slug]` on the table `EventType` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `attendeeEmail` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `attendeeName` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uid` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `duration` to the `EventType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Availability" DROP CONSTRAINT "Availability_userId_fkey";

-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_eventTypeId_fkey";

-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_userId_fkey";

-- DropForeignKey
ALTER TABLE "EventType" DROP CONSTRAINT "EventType_userId_fkey";

-- DropIndex
DROP INDEX "Availability_userId_idx";

-- DropIndex
DROP INDEX "Booking_eventTypeId_idx";

-- DropIndex
DROP INDEX "Booking_startTime_idx";

-- DropIndex
DROP INDEX "EventType_slug_key";

-- AlterTable
ALTER TABLE "Availability" DROP COLUMN "createdAt",
DROP COLUMN "timezone",
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "guestEmail",
DROP COLUMN "guestName",
ADD COLUMN     "attendeeEmail" TEXT NOT NULL,
ADD COLUMN     "attendeeName" TEXT NOT NULL,
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "uid" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "EventType" DROP COLUMN "durationMinutes",
ADD COLUMN     "duration" INTEGER NOT NULL,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "location" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "timezone" TEXT NOT NULL DEFAULT 'UTC',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "username" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Availability_userId_dayOfWeek_key" ON "Availability"("userId", "dayOfWeek");

-- CreateIndex
CREATE UNIQUE INDEX "Booking_uid_key" ON "Booking"("uid");

-- CreateIndex
CREATE INDEX "Booking_eventTypeId_startTime_status_idx" ON "Booking"("eventTypeId", "startTime", "status");

-- CreateIndex
CREATE INDEX "Booking_uid_idx" ON "Booking"("uid");

-- CreateIndex
CREATE INDEX "EventType_userId_slug_idx" ON "EventType"("userId", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "EventType_userId_slug_key" ON "EventType"("userId", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "EventType" ADD CONSTRAINT "EventType_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Availability" ADD CONSTRAINT "Availability_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_eventTypeId_fkey" FOREIGN KEY ("eventTypeId") REFERENCES "EventType"("id") ON DELETE CASCADE ON UPDATE CASCADE;
