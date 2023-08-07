/*
  Warnings:

  - The primary key for the `Refresh` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `token` on the `Refresh` table. All the data in the column will be lost.
  - Added the required column `refresh_token` to the `Refresh` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Refresh" DROP CONSTRAINT "Refresh_pkey",
DROP COLUMN "token",
ADD COLUMN     "refresh_token" TEXT NOT NULL,
ADD CONSTRAINT "Refresh_pkey" PRIMARY KEY ("refresh_token");
