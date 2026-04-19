import prisma from "~~/prisma";
import { v4 as uuid } from "uuid";
import type { PasswordResetToken } from "@prisma/client";

class PasswordResetRepository {
  private validity = 900_000 as const;

  async create(userId: number): Promise<PasswordResetToken> {
    const now = new Date();
    const expiresAt = new Date(now.getTime() + this.validity);

    return prisma.passwordResetToken.create({
      data: {
        userId,
        token: uuid(),
        createdAt: now,
        expiresAt,
      },
    });
  }

  async verify(token: string): Promise<PasswordResetToken> {
    return prisma.passwordResetToken.findUniqueOrThrow({
      where: {
        token,
        expiresAt: {
          gt: new Date(),
        },
        usedAt: null,
      },
    });
  }

  async use(token: string): Promise<PasswordResetToken> {
    return prisma.passwordResetToken.update({
      where: {
        token,
        usedAt: null,
      },
      data: {
        usedAt: new Date(),
      },
    });
  }
}

const PasswordResetModel = new PasswordResetRepository();
export default PasswordResetModel;
