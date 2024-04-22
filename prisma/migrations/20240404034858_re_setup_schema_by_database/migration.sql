/*
  Warnings:

  - You are about to drop the column `userId` on the `roles` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNumber` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `role_id` on the `users` table. All the data in the column will be lost.
  - You are about to alter the column `name` on the `users` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(100)`.
  - Added the required column `phone_number` to the `otps` table without a default value. This is not possible if the table is not empty.
  - Made the column `token` on table `otps` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `roles` DROP FOREIGN KEY `roles_userId_fkey`;

-- DropIndex
DROP INDEX `role_id` ON `users`;

-- AlterTable
ALTER TABLE `otps` ADD COLUMN `phone_number` VARCHAR(50) NOT NULL,
    MODIFY `token` CHAR(36) NOT NULL;

-- AlterTable
ALTER TABLE `roles` DROP COLUMN `userId`;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `phoneNumber`,
    DROP COLUMN `role_id`,
    ADD COLUMN `phone_number` VARCHAR(191) NOT NULL DEFAULT '16',
    MODIFY `name` VARCHAR(100) NOT NULL;

-- CreateTable
CREATE TABLE `applications` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `is_active` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `application_access` (
    `id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `application_id` VARCHAR(191) NOT NULL,
    `role_id` INTEGER NOT NULL,
    `is_active` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `divisions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deleted_at` DATETIME(0) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `divisions_management` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `division_id` INTEGER NOT NULL,
    `title_id` INTEGER NOT NULL,
    `is_active` BOOLEAN NOT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deleted_at` DATETIME(0) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `title_of_divisions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `is_leader` BOOLEAN NOT NULL DEFAULT false,
    `is_active` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deleted_at` DATETIME(0) NULL,

    UNIQUE INDEX `name_unique`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `application_access` ADD CONSTRAINT `application_access_ibfk_1` FOREIGN KEY (`application_id`) REFERENCES `applications`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `application_access` ADD CONSTRAINT `application_access_ibfk_2` FOREIGN KEY (`role_id`) REFERENCES `roles`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `application_access` ADD CONSTRAINT `application_access_ibfk_3` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `user_identity` ADD CONSTRAINT `user_identity_ibfk_3` FOREIGN KEY (`division_id`) REFERENCES `divisions`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `user_identity` ADD CONSTRAINT `user_identity_ibfk_4` FOREIGN KEY (`title_of_division_id`) REFERENCES `title_of_divisions`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `divisions_management` ADD CONSTRAINT `divisions_management_ibfk_1` FOREIGN KEY (`division_id`) REFERENCES `divisions`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `divisions_management` ADD CONSTRAINT `divisions_management_ibfk_2` FOREIGN KEY (`title_id`) REFERENCES `title_of_divisions`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
