-- CreateTable
CREATE TABLE "Area" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "img" TEXT,
    "value" TEXT NOT NULL,
    "rol" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Activities" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "img" TEXT,
    "place" TEXT NOT NULL,
    "hour_start" DATETIME NOT NULL,
    "hour_end" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Preachs" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "img" TEXT
);

-- CreateTable
CREATE TABLE "LastActivities" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "img" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "Area_value_key" ON "Area"("value");
