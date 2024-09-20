/*
  Warnings:

  - Added the required column `totalEgresos` to the `Corte` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalIngresos` to the `Corte` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Corte" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "ingresos" TEXT NOT NULL,
    "totalIngresos" REAL NOT NULL,
    "egresos" TEXT NOT NULL,
    "totalEgresos" REAL NOT NULL,
    "total" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Corte" ("createdAt", "egresos", "id", "ingresos", "nombre", "total") SELECT "createdAt", "egresos", "id", "ingresos", "nombre", "total" FROM "Corte";
DROP TABLE "Corte";
ALTER TABLE "new_Corte" RENAME TO "Corte";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
