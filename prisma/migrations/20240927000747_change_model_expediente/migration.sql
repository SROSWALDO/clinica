/*
  Warnings:

  - You are about to drop the column `detalles` on the `Expediente` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Expediente" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "url" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Expediente" ("createdAt", "id", "nombre", "url") SELECT "createdAt", "id", "nombre", "url" FROM "Expediente";
DROP TABLE "Expediente";
ALTER TABLE "new_Expediente" RENAME TO "Expediente";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
