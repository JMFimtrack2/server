/*
  Warnings:

  - The primary key for the `unidad` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `unidad` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "unidad_id_key";

-- AlterTable
ALTER TABLE "unidad" DROP CONSTRAINT "unidad_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "unidad_pkey" PRIMARY KEY ("serie");
