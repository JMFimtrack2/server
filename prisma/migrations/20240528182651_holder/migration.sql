-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cuenta" (
    "id" SERIAL NOT NULL,
    "tipo" TEXT NOT NULL,

    CONSTRAINT "cuenta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "titular" (
    "id" SERIAL NOT NULL,
    "razon_social" TEXT,
    "rfc" TEXT,
    "nombre" TEXT NOT NULL,
    "apellido_paterno" TEXT NOT NULL,
    "apellido_materno" TEXT,
    "telefono_movil" INTEGER NOT NULL,
    "telefono_alternativo" INTEGER,
    "email" TEXT,
    "clave" TEXT,

    CONSTRAINT "titular_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "unidad" (
    "id" SERIAL NOT NULL,
    "serie" TEXT NOT NULL,
    "motor" TEXT NOT NULL,
    "placa" TEXT NOT NULL,
    "valor" INTEGER NOT NULL,
    "aseguradora" TEXT NOT NULL,
    "marca" TEXT NOT NULL,
    "submarca" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "modelo" INTEGER NOT NULL,
    "color" TEXT NOT NULL,
    "localizada" TEXT NOT NULL,
    "observaciones" TEXT NOT NULL,

    CONSTRAINT "unidad_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "domicilio" (
    "id" SERIAL NOT NULL,
    "codigo_postal" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "municipio" TEXT NOT NULL,
    "colonia" TEXT NOT NULL,
    "calle" TEXT NOT NULL,
    "numero_ext" INTEGER NOT NULL,
    "numero_int" INTEGER NOT NULL,

    CONSTRAINT "domicilio_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "cuenta_tipo_key" ON "cuenta"("tipo");

-- CreateIndex
CREATE UNIQUE INDEX "titular_razon_social_key" ON "titular"("razon_social");

-- CreateIndex
CREATE UNIQUE INDEX "titular_rfc_key" ON "titular"("rfc");

-- CreateIndex
CREATE UNIQUE INDEX "titular_telefono_movil_key" ON "titular"("telefono_movil");

-- CreateIndex
CREATE UNIQUE INDEX "titular_email_key" ON "titular"("email");

-- CreateIndex
CREATE UNIQUE INDEX "unidad_serie_key" ON "unidad"("serie");

-- CreateIndex
CREATE UNIQUE INDEX "unidad_placa_key" ON "unidad"("placa");
