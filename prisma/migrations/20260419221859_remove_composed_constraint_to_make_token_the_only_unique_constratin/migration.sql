/*
  Warnings:

  - A unique constraint covering the columns `[token]` on the table `password_reset_tokens` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "password_reset_tokens_userId_token_key";

-- CreateIndex
CREATE UNIQUE INDEX "password_reset_tokens_token_key" ON "password_reset_tokens"("token");
