/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `cuenta` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `titular` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `unidad` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "titular_email_key";

-- DropIndex
DROP INDEX "titular_rfc_key";

-- DropIndex
DROP INDEX "unidad_placa_key";

-- AlterTable
ALTER TABLE "unidad" ALTER COLUMN "motor" DROP NOT NULL,
ALTER COLUMN "placa" DROP NOT NULL,
ALTER COLUMN "aseguradora" DROP NOT NULL,
ALTER COLUMN "localizada" DROP NOT NULL,
ALTER COLUMN "observaciones" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "cuenta_id_key" ON "cuenta"("id");

-- CreateIndex
CREATE UNIQUE INDEX "titular_id_key" ON "titular"("id");

-- CreateIndex
CREATE UNIQUE INDEX "unidad_id_key" ON "unidad"("id");
