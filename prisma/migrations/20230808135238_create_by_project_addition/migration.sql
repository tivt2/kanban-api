/*
  Warnings:

  - Added the required column `created_by` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "created_by" TEXT NOT NULL;
