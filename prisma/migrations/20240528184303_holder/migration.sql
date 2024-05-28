/*
  Warnings:

  - You are about to alter the column `telefono_movil` on the `titular` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `telefono_alternativo` on the `titular` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "titular" ALTER COLUMN "telefono_movil" SET DATA TYPE INTEGER,
ALTER COLUMN "telefono_alternativo" SET DATA TYPE INTEGER;
