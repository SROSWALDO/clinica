/*
  Warnings:

  - Added the required column `fecha` to the `Paciente` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hora` to the `Paciente` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Paciente" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fecha" DATETIME NOT NULL,
    "hora" DATETIME NOT NULL,
    "nombre" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "consulta" TEXT NOT NULL,
    "doctor" TEXT NOT NULL,
    "radiografias" INTEGER NOT NULL,
    "ambulancia" BOOLEAN NOT NULL,
    "ingresos" INTEGER NOT NULL,
    "egresos" INTEGER NOT NULL
);
INSERT INTO "new_Paciente" ("ambulancia", "consulta", "doctor", "egresos", "id", "ingresos", "nombre", "radiografias", "telefono") SELECT "ambulancia", "consulta", "doctor", "egresos", "id", "ingresos", "nombre", "radiografias", "telefono" FROM "Paciente";
DROP TABLE "Paciente";
ALTER TABLE "new_Paciente" RENAME TO "Paciente";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
