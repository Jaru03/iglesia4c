-- CreateTable
CREATE TABLE "Ministries" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "img" TEXT,
    "value" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Departaments" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "img" TEXT,
    "value" TEXT NOT NULL
);
