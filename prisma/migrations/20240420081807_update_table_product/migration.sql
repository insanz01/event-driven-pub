/*
  Warnings:

  - A unique constraint covering the columns `[product_id]` on the table `products` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `products_product_id_key` ON `products`(`product_id`);
