-- CreateTable
CREATE TABLE "Area" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "img" TEXT,
    "value" TEXT NOT NULL,
    "rol" TEXT NOT NULL,

    CONSTRAINT "Area_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Activities" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "img" TEXT,
    "place" TEXT NOT NULL,
    "hour_start" TIMESTAMP(3) NOT NULL,
    "hour_end" TIMESTAMP(3) NOT NULL,
    "urgent" BOOLEAN NOT NULL,

    CONSTRAINT "Activities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Preachs" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "img" TEXT,

    CONSTRAINT "Preachs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LastActivities" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "img" TEXT,

    CONSTRAINT "LastActivities_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Area_value_key" ON "Area"("value");
