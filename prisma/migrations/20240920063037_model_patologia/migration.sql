-- CreateTable
CREATE TABLE "Patologia" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fecha" DATETIME NOT NULL,
    "nombre" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "pieza" TEXT NOT NULL,
    "costo" INTEGER NOT NULL,
    "recibido" BOOLEAN NOT NULL
);
