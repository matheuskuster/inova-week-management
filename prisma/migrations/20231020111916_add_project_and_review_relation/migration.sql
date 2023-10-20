/*
  Warnings:

  - Added the required column `project_id` to the `reviews` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "reviews" ADD COLUMN     "project_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
