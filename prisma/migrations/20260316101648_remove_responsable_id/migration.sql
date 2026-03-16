/*
  Warnings:

  - You are about to drop the column `responsableId` on the `Church` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Church" DROP CONSTRAINT "Church_responsableId_fkey";

-- DropIndex
DROP INDEX "Church_responsableId_key";

-- AlterTable
ALTER TABLE "Church" DROP COLUMN "responsableId";
