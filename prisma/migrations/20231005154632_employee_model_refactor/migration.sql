/*
  Warnings:

  - You are about to drop the column `employeeId` on the `job_roles` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_job_roles" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "salary" DECIMAL NOT NULL DEFAULT 0.00,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME
);
INSERT INTO "new_job_roles" ("createdAt", "description", "id", "name", "salary", "updatedAt") SELECT "createdAt", "description", "id", "name", "salary", "updatedAt" FROM "job_roles";
DROP TABLE "job_roles";
ALTER TABLE "new_job_roles" RENAME TO "job_roles";
CREATE UNIQUE INDEX "job_roles_name_key" ON "job_roles"("name");
CREATE TABLE "new_employees" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "first_name" TEXT NOT NULL,
    "middle_name" TEXT,
    "last_name" TEXT NOT NULL,
    "jobRoleId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    CONSTRAINT "employees_jobRoleId_fkey" FOREIGN KEY ("jobRoleId") REFERENCES "job_roles" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_employees" ("createdAt", "first_name", "id", "jobRoleId", "last_name", "middle_name", "updatedAt") SELECT "createdAt", "first_name", "id", "jobRoleId", "last_name", "middle_name", "updatedAt" FROM "employees";
DROP TABLE "employees";
ALTER TABLE "new_employees" RENAME TO "employees";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
