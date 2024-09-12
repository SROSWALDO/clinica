-- CreateTable
CREATE TABLE "Paciente" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "consulta" TEXT NOT NULL,
    "doctor" TEXT NOT NULL,
    "radiografias" INTEGER NOT NULL,
    "ambulancia" BOOLEAN NOT NULL,
    "ingresos" INTEGER NOT NULL,
    "egresos" INTEGER NOT NULL
);
