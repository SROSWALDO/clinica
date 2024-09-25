/*
  Warnings:

  - Added the required column `telefono` to the `Cita` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Cita" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "paciente" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "fecha" DATETIME NOT NULL,
    "horaFin" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Cita" ("createdAt", "descripcion", "fecha", "horaFin", "id", "paciente") SELECT "createdAt", "descripcion", "fecha", "horaFin", "id", "paciente" FROM "Cita";
DROP TABLE "Cita";
ALTER TABLE "new_Cita" RENAME TO "Cita";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
