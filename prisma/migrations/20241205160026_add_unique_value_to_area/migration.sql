/*
  Warnings:

  - A unique constraint covering the columns `[value]` on the table `Area` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Area_value_key" ON "Area"("value");
