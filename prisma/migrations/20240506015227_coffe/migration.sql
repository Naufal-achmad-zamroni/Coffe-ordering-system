-- AlterTable
ALTER TABLE `coffe` ADD COLUMN `image` VARCHAR(191) NOT NULL DEFAULT '',
    MODIFY `size` VARCHAR(191) NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE `order_detail` ADD COLUMN `quantity` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `order_list` MODIFY `order_type` VARCHAR(191) NOT NULL DEFAULT '',
    MODIFY `order_date` VARCHAR(191) NOT NULL DEFAULT '';
