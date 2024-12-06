/*
  Warnings:

  - You are about to drop the `Departaments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Ministries` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Departaments";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Ministries";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Area" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "img" TEXT,
    "value" TEXT NOT NULL,
    "rol" TEXT NOT NULL
);
