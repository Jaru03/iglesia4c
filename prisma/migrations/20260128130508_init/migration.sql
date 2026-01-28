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

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'LIDER',
    "sede" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Joven" (
    "id" SERIAL NOT NULL,
    "nombres" TEXT NOT NULL,
    "apellidos" TEXT NOT NULL,
    "documento" TEXT NOT NULL,
    "sede" TEXT NOT NULL,
    "ultimaVisita" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "activo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Joven_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Asistencia" (
    "id" SERIAL NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "jovenId" INTEGER NOT NULL,

    CONSTRAINT "Asistencia_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Area_value_key" ON "Area"("value");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Joven_documento_key" ON "Joven"("documento");

-- AddForeignKey
ALTER TABLE "Asistencia" ADD CONSTRAINT "Asistencia_jovenId_fkey" FOREIGN KEY ("jovenId") REFERENCES "Joven"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
