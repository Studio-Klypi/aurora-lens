/*
  Warnings:

  - A unique constraint covering the columns `[userId,token]` on the table `password_reset_tokens` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "password_reset_tokens" ADD COLUMN     "usedAt" TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX "password_reset_tokens_userId_token_key" ON "password_reset_tokens"("userId", "token");
