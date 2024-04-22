-- AlterTable
ALTER TABLE `roles` ADD COLUMN `userId` CHAR(36) NULL;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `role_id` INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE INDEX `role_id` ON `users`(`role_id`);

-- AddForeignKey
ALTER TABLE `roles` ADD CONSTRAINT `roles_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
