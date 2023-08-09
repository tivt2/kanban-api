-- DropForeignKey
ALTER TABLE "TaskUpdate" DROP CONSTRAINT "TaskUpdate_task_id_fkey";

-- AddForeignKey
ALTER TABLE "TaskUpdate" ADD CONSTRAINT "TaskUpdate_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;
