/*
  Warnings:

  - You are about to drop the column `user_id` on the `Surat` table. All the data in the column will be lost.
  - Added the required column `organization_id` to the `Surat` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Surat" DROP CONSTRAINT "Surat_user_id_fkey";

-- AlterTable
ALTER TABLE "Surat" DROP COLUMN "user_id",
ADD COLUMN     "organization_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Surat" ADD CONSTRAINT "Surat_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;
