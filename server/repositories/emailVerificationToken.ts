import prisma from "~~/prisma";
import { v4 as uuid } from "uuid";
import type { EmailVerificationToken } from "@prisma/client";

class EmailVerificationTokenRepository {
  private validity = 900_000 as const; // 15 minutes

  async create(userId: number): Promise<EmailVerificationToken> {
    const now = new Date();
    const expiresAt = new Date(now.getTime() + this.validity);

    return prisma.emailVerificationToken.create({
      data: {
        userId,
        token: uuid(),
        expiresAt,
        createdAt: now,
      },
    });
  }

  async verify(userId: number, token: string): Promise<EmailVerificationToken> {
    return prisma.emailVerificationToken.findUniqueOrThrow({
      where: {
        userId_token: {
          userId,
          token,
        },
        expiresAt: {
          gt: new Date(),
        },
        usedAt: null,
      },
    });
  }

  async use(id: number): Promise<EmailVerificationToken> {
    return prisma.emailVerificationToken.update({
      where: {
        id,
        usedAt: null,
      },
      data: {
        usedAt: new Date(),
      },
    });
  }
}

const EmailVerificationTokenModel = new EmailVerificationTokenRepository();
export default EmailVerificationTokenModel;
