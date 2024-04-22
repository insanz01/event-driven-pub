/*
  Warnings:

  - A unique constraint covering the columns `[product_id]` on the table `products` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `product_id` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `products` ADD COLUMN `product_id` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `products_product_id_key` ON `products`(`product_id`);
