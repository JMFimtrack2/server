/*
  Warnings:

  - The primary key for the `unidad` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[id]` on the table `unidad` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "unidad" DROP CONSTRAINT "unidad_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "valor" DROP NOT NULL,
ADD CONSTRAINT "unidad_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "unidad_id_key" ON "unidad"("id");
