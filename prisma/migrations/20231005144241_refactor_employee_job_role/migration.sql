-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_employees" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "first_name" TEXT NOT NULL,
    "middle_name" TEXT,
    "last_name" TEXT NOT NULL,
    "jobRoleId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME
);
INSERT INTO "new_employees" ("createdAt", "first_name", "id", "jobRoleId", "last_name", "middle_name", "updatedAt") SELECT "createdAt", "first_name", "id", "jobRoleId", "last_name", "middle_name", "updatedAt" FROM "employees";
DROP TABLE "employees";
ALTER TABLE "new_employees" RENAME TO "employees";
CREATE TABLE "new_job_roles" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "salary" DECIMAL NOT NULL DEFAULT 0.00,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "employeeId" TEXT,
    CONSTRAINT "job_roles_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "employees" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_job_roles" ("createdAt", "description", "id", "name", "salary", "updatedAt") SELECT "createdAt", "description", "id", "name", "salary", "updatedAt" FROM "job_roles";
DROP TABLE "job_roles";
ALTER TABLE "new_job_roles" RENAME TO "job_roles";
CREATE UNIQUE INDEX "job_roles_name_key" ON "job_roles"("name");
CREATE UNIQUE INDEX "job_roles_employeeId_key" ON "job_roles"("employeeId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
