-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Patologia" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fecha" DATETIME NOT NULL,
    "nombre" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "pieza" TEXT NOT NULL,
    "costo" INTEGER NOT NULL,
    "recibido" BOOLEAN NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Patologia" ("costo", "fecha", "id", "nombre", "pieza", "recibido", "telefono") SELECT "costo", "fecha", "id", "nombre", "pieza", "recibido", "telefono" FROM "Patologia";
DROP TABLE "Patologia";
ALTER TABLE "new_Patologia" RENAME TO "Patologia";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
