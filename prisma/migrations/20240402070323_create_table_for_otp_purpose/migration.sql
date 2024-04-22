-- CreateTable
CREATE TABLE `otps` (
    `token` CHAR(36) NOT NULL,
    `email` VARCHAR(16) NOT NULL,
    `otp` VARCHAR(60) NOT NULL,
    `expiry` DATETIME(3) NULL,

    UNIQUE INDEX `otps_token_key`(`token`),
    INDEX `email`(`email`),
    PRIMARY KEY (`token`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
